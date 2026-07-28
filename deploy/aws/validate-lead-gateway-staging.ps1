param(
  [string]$Profile = "epic-dev",
  [string]$Region = "us-west-2",
  [string]$StackName = "epic-website-lead-gateway-staging",
  [string]$AllowedOrigin = "http://127.0.0.1:3000"
)

$ErrorActionPreference = "Stop"
function Invoke-CheckedAws {
  param([string[]]$Arguments)
  $saved = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  $output = & aws @Arguments --no-cli-pager 2>&1
  $exitCode = $LASTEXITCODE
  $ErrorActionPreference = $saved
  if ($exitCode -ne 0) { throw "AWS validation command failed: aws $($Arguments -join ' ')`n$($output -join [Environment]::NewLine)" }
  return $output
}
function Require {
  param([bool]$Condition, [string]$Message)
  if (-not $Condition) { throw $Message }
}

$stack = Invoke-CheckedAws @(
  "cloudformation", "describe-stacks", "--profile", $Profile, "--region", $Region,
  "--stack-name", $StackName, "--query", "Stacks[0]", "--output", "json"
) | ConvertFrom-Json
Require ($stack.StackStatus -eq "CREATE_COMPLETE" -or $stack.StackStatus -eq "UPDATE_COMPLETE") "Lead gateway stack is not stable."
$outputs = @{}
foreach ($item in $stack.Outputs) { $outputs[[string]$item.OutputKey] = [string]$item.OutputValue }
Require (-not [string]::IsNullOrWhiteSpace($outputs.LeadGatewayUrl)) "Lead gateway URL output is missing."

$apiArn = "arn:aws:apigateway:$Region`::/restapis/$($outputs.RestApiId)/stages/staging"
$webAcl = Invoke-CheckedAws @(
  "wafv2", "get-web-acl-for-resource", "--profile", $Profile, "--region", $Region,
  "--resource-arn", $apiArn, "--output", "json"
) | ConvertFrom-Json
Require ($webAcl.WebACL.VisibilityConfig.SampledRequestsEnabled -eq $false) "WAF sampled requests must be disabled."
$ruleNames = @($webAcl.WebACL.Rules | ForEach-Object { [string]$_.Name })
foreach ($expected in @("AmazonIpReputation", "KnownBadInputs", "CommonThreats", "PerIpRateLimit")) {
  Require ($ruleNames -contains $expected) "WAF rule '$expected' is missing."
}
foreach ($rule in $webAcl.WebACL.Rules) {
  Require ($rule.VisibilityConfig.SampledRequestsEnabled -eq $false) "WAF rule '$($rule.Name)' has request sampling enabled."
}
$managedRules = @($webAcl.WebACL.Rules | Where-Object { $_.Name -in @("AmazonIpReputation", "KnownBadInputs", "CommonThreats") })
if ([string]$outputs.ManagedRulesMode -eq "Count") {
  Require (@($managedRules | Where-Object { $null -eq $_.OverrideAction.Count }).Count -eq 0) "Managed WAF rules are not consistently in Count mode."
} else {
  Require (@($managedRules | Where-Object { $null -eq $_.OverrideAction.None }).Count -eq 0) "Managed WAF rules are not consistently enforcing their actions."
}

$stage = Invoke-CheckedAws @(
  "apigateway", "get-stage", "--profile", $Profile, "--region", $Region,
  "--rest-api-id", $outputs.RestApiId, "--stage-name", "staging", "--output", "json"
) | ConvertFrom-Json
$settings = $stage.methodSettings.PSObject.Properties.Value
Require (@($settings | Where-Object { $_.dataTraceEnabled -eq $true }).Count -eq 0) "API Gateway data tracing must remain disabled."

$function = Invoke-CheckedAws @(
  "lambda", "get-function-configuration", "--profile", $Profile, "--region", $Region,
  "--function-name", $outputs.FunctionName, "--output", "json"
) | ConvertFrom-Json
Require ($function.State -eq "Active") "Lead gateway Lambda is not active."
Require ([int]$function.Timeout -le 15) "Lead gateway timeout exceeds the reviewed limit."
Require (-not [string]::IsNullOrWhiteSpace([string]$function.Environment.Variables.GATEWAY_SECRET_ARN)) "Gateway secret reference is missing."
Require (-not [string]::IsNullOrWhiteSpace([string]$function.Environment.Variables.TURNSTILE_SECRET_ARN)) "Turnstile secret reference is missing."

$preflightStatus = & curl.exe -sS -o NUL -w "%{http_code}" -X OPTIONS -H "Origin: $AllowedOrigin" -H "Access-Control-Request-Method: POST" $outputs.LeadGatewayUrl
Require ($preflightStatus -eq "204") "Allowed CORS preflight did not return 204."
$rejectedStatus = & curl.exe -sS -o NUL -w "%{http_code}" -X POST -H "Origin: https://attacker.example" -H "Content-Type: application/json" --data "{}" $outputs.LeadGatewayUrl
Require ($rejectedStatus -eq "403") "Untrusted origin was not rejected."

[ordered]@{
  valid = $true
  stackStatus = $stack.StackStatus
  endpoint = $outputs.LeadGatewayUrl
  lambdaState = $function.State
  wafRules = $ruleNames
  sampledRequestsEnabled = $false
  apiDataTraceEnabled = $false
  allowedPreflightStatus = [int]$preflightStatus
  untrustedOriginStatus = [int]$rejectedStatus
  secretsPrinted = $false
} | ConvertTo-Json -Depth 5
