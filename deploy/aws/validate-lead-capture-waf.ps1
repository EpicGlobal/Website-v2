param(
  [string]$Profile = "epic-dev",
  [string]$StackName = "epic-global-website-staging-lead-capture-waf",
  [string]$WafRegion = "us-east-1"
)

$ErrorActionPreference = "Stop"

function Invoke-AwsJson {
  param([string[]]$Arguments)
  $output = & aws @Arguments --output json --no-cli-pager 2>&1
  if ($LASTEXITCODE -ne 0) {
    throw "AWS command failed: aws $($Arguments -join ' ')`n$($output -join [Environment]::NewLine)"
  }
  return ($output -join [Environment]::NewLine) | ConvertFrom-Json
}

function StackValue {
  param($Items, [string]$KeyProperty, [string]$Key, [string]$ValueProperty)
  $item = @($Items | Where-Object { [string]$_.$KeyProperty -eq $Key }) | Select-Object -First 1
  if ($null -eq $item) { return "" }
  return [string]$item.$ValueProperty
}

Invoke-AwsJson @("sts", "get-caller-identity", "--profile", $Profile) | Out-Null

$stackResponse = Invoke-AwsJson @(
  "cloudformation", "describe-stacks",
  "--profile", $Profile,
  "--region", $WafRegion,
  "--stack-name", $StackName
)
$stack = @($stackResponse.Stacks) | Select-Object -First 1
if ($null -eq $stack) { throw "CloudFormation stack '$StackName' was not found." }

$webAclArn = StackValue $stack.Outputs "OutputKey" "WebAclArn" "OutputValue"
$webAclId = StackValue $stack.Outputs "OutputKey" "WebAclId" "OutputValue"
$webAclName = StackValue $stack.Outputs "OutputKey" "WebAclName" "OutputValue"
$amplifyAppArn = StackValue $stack.Parameters "ParameterKey" "AmplifyAppArn" "ParameterValue"
if (-not $webAclArn -or -not $webAclId -or -not $webAclName -or -not $amplifyAppArn) {
  throw "The WAF stack is missing required Web ACL outputs or the AmplifyAppArn parameter."
}

if ($amplifyAppArn -notmatch '^arn:[^:]+:amplify:([^:]+):[^:]+:apps/([^/]+)$') {
  throw "AmplifyAppArn has an unexpected format."
}
$amplifyRegion = $matches[1]
$amplifyAppId = $matches[2]

$aclResponse = Invoke-AwsJson @(
  "wafv2", "get-web-acl",
  "--profile", $Profile,
  "--region", $WafRegion,
  "--scope", "CLOUDFRONT",
  "--name", $webAclName,
  "--id", $webAclId
)
$acl = $aclResponse.WebACL
if ([string]$acl.ARN -ne $webAclArn) { throw "The deployed Web ACL ARN does not match the stack output." }

$requiredRules = @(
  "LeadCaptureRateLimit",
  "AwsIpReputation",
  "AwsCommonThreats",
  "AwsKnownBadInputs",
  "AwsBotControlTargeted",
  "LeadCaptureBrowserChallenge"
)
$ruleByName = @{}
foreach ($rule in @($acl.Rules)) { $ruleByName[[string]$rule.Name] = $rule }
foreach ($requiredRule in $requiredRules) {
  if (-not $ruleByName.ContainsKey($requiredRule)) { throw "Required WAF rule '$requiredRule' is missing." }
  if ([bool]$ruleByName[$requiredRule].VisibilityConfig.SampledRequestsEnabled) {
    throw "WAF sampled requests must remain disabled for '$requiredRule' to avoid collecting lead data."
  }
}
if ([bool]$acl.VisibilityConfig.SampledRequestsEnabled) {
  throw "WAF sampled requests must remain disabled at the Web ACL level."
}
if (-not ($ruleByName["LeadCaptureRateLimit"].Action.PSObject.Properties.Name -contains "Block")) {
  throw "LeadCaptureRateLimit is not configured to block excessive requests."
}
if (-not ($ruleByName["LeadCaptureBrowserChallenge"].Action.PSObject.Properties.Name -contains "Challenge")) {
  throw "LeadCaptureBrowserChallenge is not configured with the Challenge action."
}
$managedRules = @(
  $ruleByName["AwsIpReputation"].Statement.ManagedRuleGroupStatement.Name,
  $ruleByName["AwsCommonThreats"].Statement.ManagedRuleGroupStatement.Name,
  $ruleByName["AwsKnownBadInputs"].Statement.ManagedRuleGroupStatement.Name,
  $ruleByName["AwsBotControlTargeted"].Statement.ManagedRuleGroupStatement.Name
)
foreach ($managedRule in @(
  "AWSManagedRulesAmazonIpReputationList",
  "AWSManagedRulesCommonRuleSet",
  "AWSManagedRulesKnownBadInputsRuleSet",
  "AWSManagedRulesBotControlRuleSet"
)) {
  if ($managedRules -notcontains $managedRule) { throw "AWS managed WAF rule group '$managedRule' is missing." }
}
foreach ($domain in @("epicglobalinc.com", "www.epicglobalinc.com")) {
  if (@($acl.TokenDomains) -notcontains $domain) { throw "WAF token domain '$domain' is missing." }
}
$botConfiguration = @($ruleByName["AwsBotControlTargeted"].Statement.ManagedRuleGroupStatement.ManagedRuleGroupConfigs) | Select-Object -First 1
if ([string]$botConfiguration.AWSManagedRulesBotControlRuleSet.InspectionLevel -ne "TARGETED") {
  throw "Bot Control must use TARGETED inspection so AWS provides the intelligent-threat integration URL."
}
$botControlMode = if ($ruleByName["AwsBotControlTargeted"].OverrideAction.PSObject.Properties.Name -contains "Count") {
  "Count"
} elseif ($ruleByName["AwsBotControlTargeted"].OverrideAction.PSObject.Properties.Name -contains "None") {
  "Enforce"
} else {
  throw "Bot Control override action must be Count or None."
}

$integrationUrl = [string]$aclResponse.ApplicationIntegrationURL
if ([string]::IsNullOrWhiteSpace($integrationUrl)) {
  throw "AWS did not return an ApplicationIntegrationURL; the browser challenge integration is not ready."
}

$amplifyResponse = Invoke-AwsJson @(
  "amplify", "get-app",
  "--profile", $Profile,
  "--region", $amplifyRegion,
  "--app-id", $amplifyAppId
)
$wafConfiguration = $amplifyResponse.app.wafConfiguration
if ([string]$wafConfiguration.wafStatus -ne "ASSOCIATION_SUCCESS") {
  throw "Amplify WAF association is not ready: $([string]$wafConfiguration.wafStatus) $([string]$wafConfiguration.statusReason)"
}
if ([string]$wafConfiguration.webAclArn -ne $webAclArn) {
  throw "Amplify is associated with a different Web ACL."
}

[ordered]@{
  ready = $true
  stackName = $StackName
  amplifyAppId = $amplifyAppId
  amplifyRegion = $amplifyRegion
  wafStatus = [string]$wafConfiguration.wafStatus
  webAclArn = $webAclArn
  rules = $requiredRules
  sampledRequestsEnabled = $false
  botControlMode = $botControlMode
  applicationIntegrationUrl = $integrationUrl
} | ConvertTo-Json -Depth 5
