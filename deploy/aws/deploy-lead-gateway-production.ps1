param(
  [string]$Profile = "epic-prod",
  [string]$Region = "us-east-2",
  [string]$ExpectedAccountId = "897689477180",
  [string]$StackName = "epic-website-lead-gateway-production",
  [string]$ArtifactBucket = "",
  [string]$GatewaySecretName = "epic-global/website-production/lead-intake",
  [string]$TurnstileSecretName = "epic-global/website-production/turnstile",
  [string]$CopperlineLeadIntakeUrl = "https://crm.epicglobalinc.com/api/v1/lead-intake",
  [string]$AllowedOrigins = "https://epicglobalinc.com,https://www.epicglobalinc.com",
  [string]$AllowedForms = "contact,book-a-call,marketplace-assessment",
  [string]$TurnstileAllowedHostnames = "epicglobalinc.com,www.epicglobalinc.com",
  [Parameter(Mandatory = $true)]
  [string]$TurnstileSiteKey,
  [Parameter(Mandatory = $true)]
  [string]$AlarmTopicArn,
  [ValidatePattern('^[a-z0-9][a-z0-9._-]{2,79}$')]
  [string]$ExpectedTenantId = "epicglobalinc",
  [ValidatePattern('^[a-z0-9][a-z0-9._-]{2,79}$')]
  [string]$ExpectedSourceId = "epic-website",
  [ValidatePattern('^[a-z0-9][a-z0-9._-]{2,119}$')]
  [string]$PrivacyNoticeVersion = "website-privacy-2026-07",
  [ValidatePattern('^[a-z][a-z0-9_-]{2,79}$')]
  [string]$LeadLawfulBasis = "legitimate_interests",
  [int]$WafRateLimit = 300,
  [switch]$Apply,
  [string]$Confirm = ""
)

$ErrorActionPreference = "Stop"
$confirmation = "DEPLOY_EPIC_LEAD_GATEWAY_PRODUCTION"
$expectedOrigins = @("https://epicglobalinc.com", "https://www.epicglobalinc.com")
$expectedHostnames = @("epicglobalinc.com", "www.epicglobalinc.com")
$expectedForms = @("contact", "book-a-call", "marketplace-assessment")
$turnstileTestKeys = @(
  "1x00000000000000000000AA",
  "2x00000000000000000000AB",
  "3x00000000000000000000FF",
  "1x0000000000000000000000000000000AA",
  "2x0000000000000000000000000000000AA",
  "3x0000000000000000000000000000000AA"
)

function Invoke-CheckedAws {
  param([string[]]$Arguments)
  $saved = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  $output = & aws @Arguments --no-cli-pager 2>&1
  $exitCode = $LASTEXITCODE
  $ErrorActionPreference = $saved
  if ($exitCode -ne 0) {
    throw "AWS command failed: aws $($Arguments -join ' ')`n$($output -join [Environment]::NewLine)"
  }
  return $output
}

function Split-Values {
  param([string]$Value)
  return @($Value -split ',' | ForEach-Object { $_.Trim().ToLowerInvariant() } | Where-Object { $_ } | Select-Object -Unique)
}

function Require-ExactSet {
  param([string[]]$Actual, [string[]]$Expected, [string]$Label)
  $difference = @(Compare-Object -ReferenceObject @($Expected | Sort-Object) -DifferenceObject @($Actual | Sort-Object))
  if ($difference.Count -gt 0) { throw "$Label must contain exactly: $($Expected -join ', ')." }
}

function Get-SecretMetadata {
  param([string]$SecretId)
  $json = (Invoke-CheckedAws @(
    "secretsmanager", "describe-secret", "--profile", $Profile, "--region", $Region,
    "--secret-id", $SecretId, "--output", "json"
  )) -join [Environment]::NewLine
  return $json | ConvertFrom-Json
}

function Get-SecretObject {
  param([string]$SecretId)
  $saved = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  $value = & aws secretsmanager get-secret-value --profile $Profile --region $Region `
    --secret-id $SecretId --query SecretString --output text --no-cli-pager 2>&1
  $exitCode = $LASTEXITCODE
  $ErrorActionPreference = $saved
  if ($exitCode -ne 0) { throw "Production secret '$SecretId' could not be read for a PII-safe completeness check." }
  try { return (($value -join [Environment]::NewLine) | ConvertFrom-Json) }
  catch { throw "Production secret '$SecretId' must contain a JSON object." }
}

function Get-SourceStatus {
  param([string]$SourceId, [string]$Secret)
  $timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds().ToString()
  $eventId = "preflight-$([guid]::NewGuid().ToString('N'))"
  $path = "/api/v1/lead-intake/source"
  $payload = "$timestamp`n$eventId`n$eventId`nGET`n$path`n"
  $hmac = [System.Security.Cryptography.HMACSHA256]::new([System.Text.Encoding]::UTF8.GetBytes($Secret))
  try {
    $digest = $hmac.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($payload))
  } finally {
    $hmac.Dispose()
  }
  $signature = "v1=" + (($digest | ForEach-Object { $_.ToString("x2") }) -join "")
  try {
    return Invoke-RestMethod -Method Get -Uri ($CopperlineLeadIntakeUrl -replace '/api/v1/lead-intake$', $path) -Headers @{
      "Idempotency-Key" = $eventId
      "X-Copperline-Source" = $SourceId
      "X-Copperline-Timestamp" = $timestamp
      "X-Copperline-Event-Id" = $eventId
      "X-Copperline-Signature" = $signature
    }
  } catch {
    throw "The signed, read-only Copperline production source preflight failed. Deploy the reviewed lead-intake runtime and source policy before the public gateway."
  }
}

if ($Region -ne "us-east-2") { throw "The production lead gateway must stay with Copperline production in us-east-2." }
if ($Apply -and $Confirm -ne $confirmation) { throw "Apply mode requires -Confirm $confirmation" }
if ($WafRateLimit -lt 10) { throw "WafRateLimit must be at least 10." }
if ($CopperlineLeadIntakeUrl -ne "https://crm.epicglobalinc.com/api/v1/lead-intake") {
  throw "Production must use the canonical HTTPS Copperline intake URL."
}
if ($turnstileTestKeys -contains $TurnstileSiteKey.Trim()) {
  throw "Cloudflare Turnstile test site keys are forbidden for production."
}

$originValues = Split-Values $AllowedOrigins | ForEach-Object { ([uri]$_).GetLeftPart([System.UriPartial]::Authority).ToLowerInvariant() }
$hostnameValues = Split-Values $TurnstileAllowedHostnames
$formValues = Split-Values $AllowedForms
Require-ExactSet $originValues $expectedOrigins "AllowedOrigins"
Require-ExactSet $hostnameValues $expectedHostnames "TurnstileAllowedHostnames"
Require-ExactSet $formValues $expectedForms "AllowedForms"

$identity = ((Invoke-CheckedAws @("sts", "get-caller-identity", "--profile", $Profile, "--query", "Account", "--output", "text")) -join "").Trim()
if ($identity -ne $ExpectedAccountId) { throw "Refusing production deployment in AWS account '$identity'; expected '$ExpectedAccountId'." }
if ($AlarmTopicArn -notmatch "^arn:aws:sns:$([regex]::Escape($Region)):$([regex]::Escape($ExpectedAccountId)):[A-Za-z0-9_-]+$") {
  throw "AlarmTopicArn must identify an SNS topic in the expected production account and region."
}
$topic = (Invoke-CheckedAws @(
  "sns", "get-topic-attributes", "--profile", $Profile, "--region", $Region,
  "--topic-arn", $AlarmTopicArn, "--query", "Attributes", "--output", "json"
)) -join [Environment]::NewLine | ConvertFrom-Json
if ([int]$topic.SubscriptionsConfirmed -lt 1) { throw "The production alarm topic has no confirmed subscribers." }

$gatewayMetadata = Get-SecretMetadata $GatewaySecretName
$turnstileMetadata = Get-SecretMetadata $TurnstileSecretName
$gatewaySecret = Get-SecretObject $GatewaySecretName
$turnstileSecret = Get-SecretObject $TurnstileSecretName
$sourceId = [string]$gatewaySecret.COPPERLINE_LEAD_INTAKE_SOURCE_ID
$hmacSecret = [string]$gatewaySecret.COPPERLINE_LEAD_INTAKE_HMAC_SECRET
$turnstileSecretKey = [string]$turnstileSecret.TURNSTILE_SECRET_KEY
if ($sourceId -ne $ExpectedSourceId) { throw "The gateway credential is not bound to source '$ExpectedSourceId'." }
if ([System.Text.Encoding]::UTF8.GetByteCount($hmacSecret) -lt 32) { throw "The gateway HMAC credential is incomplete." }
if ([string]::IsNullOrWhiteSpace($turnstileSecretKey) -or $turnstileTestKeys -contains $turnstileSecretKey.Trim()) {
  throw "A real Cloudflare Turnstile production secret is required."
}

$sourceStatus = Get-SourceStatus -SourceId $sourceId -Secret $hmacSecret
if ([string]$sourceStatus.sourceId -ne $ExpectedSourceId) { throw "Copperline reported the wrong lead source." }
if ([string]$sourceStatus.tenantId -ne $ExpectedTenantId) { throw "Copperline reported the wrong production tenant." }
if ([string]$sourceStatus.mode -ne "live") { throw "The production website source must be in live mode before gateway deployment." }
if ($sourceStatus.processingEnabled -ne $true) { throw "Copperline lead processing is not enabled." }
if ($sourceStatus.requireProof -ne $true -or @($sourceStatus.proofProviders) -notcontains "cloudflare-turnstile") {
  throw "The production source must require Cloudflare Turnstile proof."
}
if ($sourceStatus.createDeal -ne $false) { throw "The production website source must not create deals automatically." }
if ([string]::IsNullOrWhiteSpace([string]$sourceStatus.routingTeam)) { throw "The production source does not have a routing team." }
Require-ExactSet @($sourceStatus.allowedForms) $expectedForms "Copperline allowed forms"
Require-ExactSet @($sourceStatus.allowedOrigins) $expectedOrigins "Copperline allowed origins"

if ([string]::IsNullOrWhiteSpace($ArtifactBucket)) {
  $ArtifactBucket = "epic-website-lead-gateway-artifacts-$identity-$Region"
}
$artifactResult = & (Join-Path $PSScriptRoot "build-lead-gateway.ps1") | ConvertFrom-Json
$artifactPath = [string]$artifactResult.outputPath
$artifactHash = [string]$artifactResult.sha256
$template = Join-Path $PSScriptRoot "lead-gateway.yml"
Invoke-CheckedAws @(
  "cloudformation", "validate-template", "--profile", $Profile, "--region", $Region,
  "--template-body", "file://$template", "--query", "Description", "--output", "text"
) | Out-Null

$savedPreference = $ErrorActionPreference
$ErrorActionPreference = "Continue"
& aws s3api head-bucket --profile $Profile --bucket $ArtifactBucket --no-cli-pager *> $null
$bucketExists = $LASTEXITCODE -eq 0
$ErrorActionPreference = $savedPreference

if (-not $Apply) {
  [ordered]@{
    applied = $false
    account = $identity
    region = $Region
    stackName = $StackName
    artifactBucket = $ArtifactBucket
    artifactBucketExists = $bucketExists
    artifactSha256 = $artifactHash
    gatewaySecretArn = [string]$gatewayMetadata.ARN
    turnstileSecretArn = [string]$turnstileMetadata.ARN
    sourcePreflight = [ordered]@{
      sourceId = [string]$sourceStatus.sourceId
      tenantId = [string]$sourceStatus.tenantId
      mode = [string]$sourceStatus.mode
      processingEnabled = [bool]$sourceStatus.processingEnabled
      createDeal = [bool]$sourceStatus.createDeal
      routingMode = [string]$sourceStatus.routingMode
      routingTeam = [string]$sourceStatus.routingTeam
    }
    managedRulesMode = "Enforce"
    alarmSubscribersConfirmed = [int]$topic.SubscriptionsConfirmed
    secretsPrinted = $false
    nextStep = "Review this dry run, complete isolated live staging and backup gates, then rerun with -Apply -Confirm $confirmation."
  } | ConvertTo-Json -Depth 6
  exit 0
}

if (-not $bucketExists) {
  Invoke-CheckedAws @(
    "s3api", "create-bucket", "--profile", $Profile, "--region", $Region, "--bucket", $ArtifactBucket,
    "--create-bucket-configuration", "LocationConstraint=$Region", "--output", "json"
  ) | Out-Null
}
Invoke-CheckedAws @(
  "s3api", "put-public-access-block", "--profile", $Profile, "--region", $Region, "--bucket", $ArtifactBucket,
  "--public-access-block-configuration", "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
) | Out-Null
Invoke-CheckedAws @(
  "s3api", "put-bucket-encryption", "--profile", $Profile, "--region", $Region, "--bucket", $ArtifactBucket,
  "--server-side-encryption-configuration", "Rules=[{ApplyServerSideEncryptionByDefault={SSEAlgorithm=AES256},BucketKeyEnabled=true}]"
) | Out-Null
Invoke-CheckedAws @(
  "s3api", "put-bucket-versioning", "--profile", $Profile, "--region", $Region, "--bucket", $ArtifactBucket,
  "--versioning-configuration", "Status=Enabled"
) | Out-Null

$artifactKey = "lead-gateway/$artifactHash.zip"
Invoke-CheckedAws @(
  "s3api", "put-object", "--profile", $Profile, "--region", $Region, "--bucket", $ArtifactBucket,
  "--key", $artifactKey, "--body", $artifactPath, "--server-side-encryption", "AES256", "--output", "json"
) | Out-Null
$codeVersion = ((Invoke-CheckedAws @(
  "s3api", "head-object", "--profile", $Profile, "--region", $Region, "--bucket", $ArtifactBucket,
  "--key", $artifactKey, "--query", "VersionId", "--output", "text"
)) -join "").Trim()

$nonce = "$(Get-Date -Format yyyyMMddHHmmss)-$($artifactHash.Substring(0,12))"
Invoke-CheckedAws @(
  "cloudformation", "deploy", "--profile", $Profile, "--region", $Region,
  "--stack-name", $StackName, "--template-file", $template,
  "--capabilities", "CAPABILITY_IAM", "--no-fail-on-empty-changeset",
  "--parameter-overrides",
  "AppName=epic-website-lead-gateway",
  "EnvironmentName=production",
  "CodeBucket=$ArtifactBucket",
  "CodeKey=$artifactKey",
  "CodeObjectVersion=$codeVersion",
  "GatewaySecretArn=$([string]$gatewayMetadata.ARN)",
  "TurnstileSecretArn=$([string]$turnstileMetadata.ARN)",
  "CopperlineLeadIntakeUrl=$CopperlineLeadIntakeUrl",
  "AllowedOrigins=$AllowedOrigins",
  "AllowedForms=$AllowedForms",
  "PrivacyNoticeVersion=$PrivacyNoticeVersion",
  "LeadLawfulBasis=$LeadLawfulBasis",
  "TurnstileAllowedHostnames=$TurnstileAllowedHostnames",
  "TurnstileExpectedAction=lead_capture",
  "TurnstileAllowTestKeys=false",
  "ManagedRulesMode=Enforce",
  "WafRateLimit=$WafRateLimit",
  "AlarmTopicArn=$AlarmTopicArn",
  "DeploymentNonce=$nonce"
) | Out-Null

$outputs = Invoke-CheckedAws @(
  "cloudformation", "describe-stacks", "--profile", $Profile, "--region", $Region,
  "--stack-name", $StackName, "--query", "Stacks[0].Outputs", "--output", "json"
) | ConvertFrom-Json
$outputMap = @{}
foreach ($item in $outputs) { $outputMap[[string]$item.OutputKey] = [string]$item.OutputValue }
[ordered]@{
  applied = $true
  account = $identity
  stackName = $StackName
  endpoint = $outputMap.LeadGatewayUrl
  functionName = $outputMap.FunctionName
  webAclArn = $outputMap.WebAclArn
  managedRulesMode = $outputMap.ManagedRulesMode
  artifactSha256 = $artifactHash
  artifactVersion = $codeVersion
  websiteSettings = [ordered]@{
    NEXT_PUBLIC_LEAD_GATEWAY_URL = $outputMap.LeadGatewayUrl
    NEXT_PUBLIC_TURNSTILE_SITE_KEY = $TurnstileSiteKey
    NEXT_PUBLIC_LEAD_CAPTURE_PROVIDER = "hubspot"
  }
  secretsPrinted = $false
  nextStep = "Run validate-lead-gateway-production.ps1. Keep the website provider on HubSpot until the approved cutover window."
} | ConvertTo-Json -Depth 6

$gatewaySecret = $null
$turnstileSecret = $null
$hmacSecret = $null
$turnstileSecretKey = $null
