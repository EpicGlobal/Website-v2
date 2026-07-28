param(
  [string]$Profile = "epic-prod",
  [string]$Region = "us-east-2",
  [string]$ExpectedAccountId = "897689477180",
  [string]$StackName = "epic-website-lead-gateway-production",
  [string]$ExpectedGatewaySecretName = "epic-global/website-production/lead-intake",
  [string]$ExpectedTurnstileSecretName = "epic-global/website-production/turnstile",
  [string]$ExpectedIntakeUrl = "https://crm.epicglobalinc.com/api/v1/lead-intake",
  [string]$ExpectedPrivacyNoticeVersion = "website-privacy-2026-07",
  [string]$AllowedOrigins = "https://epicglobalinc.com,https://www.epicglobalinc.com"
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

function Split-Values {
  param([string]$Value)
  return @($Value -split ',' | ForEach-Object { $_.Trim().ToLowerInvariant() } | Where-Object { $_ } | Select-Object -Unique)
}

function Require-ExactSet {
  param([string[]]$Actual, [string[]]$Expected, [string]$Label)
  $difference = @(Compare-Object -ReferenceObject @($Expected | Sort-Object) -DifferenceObject @($Actual | Sort-Object))
  Require ($difference.Count -eq 0) "$Label differs from the reviewed production set."
}

$identity = ((Invoke-CheckedAws @("sts", "get-caller-identity", "--profile", $Profile, "--query", "Account", "--output", "text")) -join "").Trim()
Require ($identity -eq $ExpectedAccountId) "The authenticated AWS account is not the reviewed production account."
Require ($Region -eq "us-east-2") "The production lead gateway must be validated in us-east-2."

$stack = Invoke-CheckedAws @(
  "cloudformation", "describe-stacks", "--profile", $Profile, "--region", $Region,
  "--stack-name", $StackName, "--query", "Stacks[0]", "--output", "json"
) | ConvertFrom-Json
Require ($stack.StackStatus -eq "CREATE_COMPLETE" -or $stack.StackStatus -eq "UPDATE_COMPLETE") "Lead gateway stack is not stable."
$outputs = @{}
foreach ($item in $stack.Outputs) { $outputs[[string]$item.OutputKey] = [string]$item.OutputValue }
Require (-not [string]::IsNullOrWhiteSpace($outputs.LeadGatewayUrl)) "Lead gateway URL output is missing."
Require ([string]$outputs.ManagedRulesMode -eq "Enforce") "Production managed WAF rules are not configured to enforce."

$resources = Invoke-CheckedAws @(
  "cloudformation", "describe-stack-resources", "--profile", $Profile, "--region", $Region,
  "--stack-name", $StackName, "--query", "StackResources", "--output", "json"
) | ConvertFrom-Json
$resourceByLogicalId = @{}
foreach ($resource in $resources) { $resourceByLogicalId[[string]$resource.LogicalResourceId] = [string]$resource.PhysicalResourceId }

$apiArn = "arn:aws:apigateway:$Region`::/restapis/$($outputs.RestApiId)/stages/production"
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
Require (@($managedRules | Where-Object { $null -eq $_.OverrideAction.None }).Count -eq 0) "Managed WAF rules are not consistently enforcing their actions."
$rateRule = @($webAcl.WebACL.Rules | Where-Object { $_.Name -eq "PerIpRateLimit" })[0]
Require ($null -ne $rateRule.Action.Block) "The production per-IP WAF rule is not blocking excessive traffic."

$stage = Invoke-CheckedAws @(
  "apigateway", "get-stage", "--profile", $Profile, "--region", $Region,
  "--rest-api-id", $outputs.RestApiId, "--stage-name", "production", "--output", "json"
) | ConvertFrom-Json
$settings = $stage.methodSettings.PSObject.Properties.Value
Require (@($settings | Where-Object { $_.dataTraceEnabled -eq $true }).Count -eq 0) "API Gateway data tracing must remain disabled."
Require (@($settings | Where-Object { [string]$_.loggingLevel -ne "OFF" }).Count -eq 0) "API Gateway request logging must remain disabled for lead payloads."

$function = Invoke-CheckedAws @(
  "lambda", "get-function-configuration", "--profile", $Profile, "--region", $Region,
  "--function-name", $outputs.FunctionName, "--output", "json"
) | ConvertFrom-Json
Require ($function.State -eq "Active") "Lead gateway Lambda is not active."
Require ([int]$function.Timeout -le 15) "Lead gateway timeout exceeds the reviewed limit."
$concurrency = Invoke-CheckedAws @(
  "lambda", "get-function-concurrency", "--profile", $Profile, "--region", $Region,
  "--function-name", $outputs.FunctionName, "--output", "json"
) | ConvertFrom-Json
Require ([int]$concurrency.ReservedConcurrentExecutions -eq 10) "Lead gateway reserved concurrency differs from the reviewed limit."
$variables = $function.Environment.Variables
Require ([string]$variables.COPPERLINE_LEAD_INTAKE_URL -eq $ExpectedIntakeUrl) "The Lambda targets an unexpected Copperline endpoint."
Require ([string]$variables.TURNSTILE_ALLOW_TEST_KEYS -eq "false") "Turnstile test keys are enabled in production."
Require ([string]$variables.COPPERLINE_LEAD_PRIVACY_NOTICE_VERSION -eq $ExpectedPrivacyNoticeVersion) "The production privacy notice version differs from the approved value."
Require-ExactSet (Split-Values ([string]$variables.COPPERLINE_LEAD_ALLOWED_ORIGINS)) (Split-Values $AllowedOrigins) "Lambda allowed origins"
Require-ExactSet (Split-Values ([string]$variables.TURNSTILE_ALLOWED_HOSTNAMES)) @("epicglobalinc.com", "www.epicglobalinc.com") "Turnstile hostnames"

$gatewaySecretArn = ((Invoke-CheckedAws @(
  "secretsmanager", "describe-secret", "--profile", $Profile, "--region", $Region,
  "--secret-id", $ExpectedGatewaySecretName, "--query", "ARN", "--output", "text"
)) -join "").Trim()
$turnstileSecretArn = ((Invoke-CheckedAws @(
  "secretsmanager", "describe-secret", "--profile", $Profile, "--region", $Region,
  "--secret-id", $ExpectedTurnstileSecretName, "--query", "ARN", "--output", "text"
)) -join "").Trim()
Require ([string]$variables.GATEWAY_SECRET_ARN -eq $gatewaySecretArn) "The Lambda uses an unexpected gateway credential."
Require ([string]$variables.TURNSTILE_SECRET_ARN -eq $turnstileSecretArn) "The Lambda uses an unexpected Turnstile credential."

$logGroup = Invoke-CheckedAws @(
  "logs", "describe-log-groups", "--profile", $Profile, "--region", $Region,
  "--log-group-name-prefix", "/aws/lambda/$($outputs.FunctionName)", "--query", "logGroups[0]", "--output", "json"
) | ConvertFrom-Json
Require ([int]$logGroup.retentionInDays -eq 30) "Lead gateway log retention differs from the reviewed 30-day setting."

$alarmNames = @($resourceByLogicalId.LambdaErrorAlarm, $resourceByLogicalId.ApiServerErrorAlarm)
Require (@($alarmNames | Where-Object { [string]::IsNullOrWhiteSpace($_) }).Count -eq 0) "Production alarm resources are missing."
$alarms = Invoke-CheckedAws @(
  "cloudwatch", "describe-alarms", "--profile", $Profile, "--region", $Region,
  "--alarm-names", $alarmNames[0], $alarmNames[1], "--query", "MetricAlarms", "--output", "json"
) | ConvertFrom-Json
Require (@($alarms).Count -eq 2) "Both production gateway alarms must exist."
foreach ($alarm in $alarms) {
  Require ($alarm.ActionsEnabled -eq $true) "Alarm '$($alarm.AlarmName)' has actions disabled."
  Require (@($alarm.AlarmActions).Count -gt 0) "Alarm '$($alarm.AlarmName)' has no notification action."
}
$apiAlarm = @($alarms | Where-Object { $_.MetricName -eq "5XXError" })[0]
$apiNameDimension = @($apiAlarm.Dimensions | Where-Object { $_.Name -eq "ApiName" })[0]
Require ([string]$apiNameDimension.Value -eq "epic-website-lead-gateway-production") "The API 5XX alarm watches the wrong ApiName dimension."

$originValues = Split-Values $AllowedOrigins
$preflightStatuses = @{}
foreach ($origin in $originValues) {
  $status = & curl.exe -sS -o NUL -w "%{http_code}" -X OPTIONS -H "Origin: $origin" -H "Access-Control-Request-Method: POST" $outputs.LeadGatewayUrl
  Require ($status -eq "204") "Allowed CORS preflight failed for '$origin'."
  $preflightStatuses[$origin] = [int]$status
}
$rejectedStatus = & curl.exe -sS -o NUL -w "%{http_code}" -X POST -H "Origin: https://attacker.example" -H "Content-Type: application/json" --data "{}" $outputs.LeadGatewayUrl
Require ($rejectedStatus -eq "403") "Untrusted origin was not rejected."

[ordered]@{
  valid = $true
  account = $identity
  stackStatus = $stack.StackStatus
  endpoint = $outputs.LeadGatewayUrl
  lambdaState = $function.State
  wafRules = $ruleNames
  managedRulesMode = [string]$outputs.ManagedRulesMode
  sampledRequestsEnabled = $false
  apiDataTraceEnabled = $false
  apiRequestLoggingEnabled = $false
  logRetentionDays = [int]$logGroup.retentionInDays
  alarmCount = @($alarms).Count
  allowedPreflightStatuses = $preflightStatuses
  untrustedOriginStatus = [int]$rejectedStatus
  secretsPrinted = $false
} | ConvertTo-Json -Depth 6
