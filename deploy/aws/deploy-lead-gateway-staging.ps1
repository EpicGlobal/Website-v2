param(
  [string]$Profile = "epic-dev",
  [string]$Region = "us-west-2",
  [string]$StackName = "epic-website-lead-gateway-staging",
  [ValidatePattern('^[a-z][a-z0-9-]{2,49}$')]
  [string]$AppName = "epic-website-lead-gateway",
  [string]$EnvironmentName = "staging",
  [string]$ArtifactBucket = "",
  [string]$GatewaySecretName = "epic-global/website-staging/lead-intake",
  [string]$TurnstileSecretName = "epic-global/website-staging/turnstile",
  [string]$CopperlineLeadIntakeUrl = "",
  [string]$AllowedOrigins = "https://epicglobalinc.com,https://www.epicglobalinc.com,http://127.0.0.1:3000,http://localhost:3000",
  [string]$TurnstileAllowedHostnames = "epicglobalinc.com,www.epicglobalinc.com,127.0.0.1,localhost",
  [ValidatePattern('^[a-z][a-z0-9_-]{2,79}$')]
  [string]$LeadLawfulBasis = "legitimate_interests",
  [ValidateSet("Count", "Enforce")]
  [string]$ManagedRulesMode = "Count",
  [int]$WafRateLimit = 300,
  [switch]$UseCloudflareTestKeys,
  [switch]$Apply,
  [string]$Confirm = ""
)

$ErrorActionPreference = "Stop"
$confirmation = "DEPLOY_EPIC_LEAD_GATEWAY_STAGING"
if ($EnvironmentName -ne "staging") { throw "This script only deploys the staging environment." }
if ($Apply -and $Confirm -ne $confirmation) { throw "Apply mode requires -Confirm $confirmation" }
if ($WafRateLimit -lt 10) { throw "WafRateLimit must be at least 10." }

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

function Test-Secret {
  param([string]$SecretId)
  $saved = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  $output = & aws secretsmanager describe-secret --profile $Profile --region $Region --secret-id $SecretId --output json --no-cli-pager 2>$null
  $exists = $LASTEXITCODE -eq 0
  $ErrorActionPreference = $saved
  return [ordered]@{ exists = $exists; output = if ($exists) { ($output -join [Environment]::NewLine) } else { "" } }
}

function Ensure-TurnstileTestSecret {
  $test = Test-Secret -SecretId $TurnstileSecretName
  if ($test.exists) { return ($test.output | ConvertFrom-Json).ARN }
  if (-not $UseCloudflareTestKeys) {
    throw "Turnstile staging secret '$TurnstileSecretName' is missing. Create it securely or rerun with -UseCloudflareTestKeys for controlled staging only."
  }
  if (-not $Apply) { return "pending-test-secret" }
  $temporary = New-TemporaryFile
  try {
    [System.IO.File]::WriteAllText(
      $temporary.FullName,
      '{"TURNSTILE_SECRET_KEY":"1x0000000000000000000000000000000AA"}',
      [System.Text.UTF8Encoding]::new($false)
    )
    $created = (Invoke-CheckedAws @(
      "secretsmanager", "create-secret", "--profile", $Profile, "--region", $Region,
      "--name", $TurnstileSecretName,
      "--description", "Cloudflare Turnstile credential for controlled Epic website lead gateway staging tests",
      "--secret-string", "file://$($temporary.FullName)", "--query", "ARN", "--output", "text"
    )) -join ""
    return $created.Trim()
  } finally {
    Remove-Item -LiteralPath $temporary.FullName -Force -ErrorAction SilentlyContinue
  }
}

$identity = ((Invoke-CheckedAws @("sts", "get-caller-identity", "--profile", $Profile, "--query", "Account", "--output", "text")) -join "").Trim()
if (-not $identity) { throw "AWS account identity was unavailable." }
if ([string]::IsNullOrWhiteSpace($ArtifactBucket)) {
  $ArtifactBucket = "epic-website-lead-gateway-artifacts-$identity-$Region"
}
if ([string]::IsNullOrWhiteSpace($CopperlineLeadIntakeUrl)) {
  $publicUrl = ((Invoke-CheckedAws @(
    "cloudformation", "describe-stacks", "--profile", $Profile, "--region", $Region,
    "--stack-name", "copperline-communications-staging",
    "--query", "Stacks[0].Outputs[?OutputKey=='PublicUrl'].OutputValue | [0]", "--output", "text"
  )) -join "").Trim().TrimEnd('/')
  if (-not $publicUrl.StartsWith("https://")) { throw "Copperline staging PublicUrl was unavailable." }
  $CopperlineLeadIntakeUrl = "$publicUrl/api/v1/lead-intake"
}
if ($CopperlineLeadIntakeUrl -notmatch '^https://.+/api/v1/lead-intake$') {
  throw "CopperlineLeadIntakeUrl must be an HTTPS /api/v1/lead-intake URL."
}

$gatewaySecret = Test-Secret -SecretId $GatewaySecretName
if (-not $gatewaySecret.exists) {
  throw "Gateway secret '$GatewaySecretName' is missing. Configure the capture-only epic-website-staging source first."
}
$gatewaySecretArn = ($gatewaySecret.output | ConvertFrom-Json).ARN
$turnstileSecretArn = Ensure-TurnstileTestSecret

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
    appName = $AppName
    artifactBucket = $ArtifactBucket
    artifactBucketExists = $bucketExists
    artifactSha256 = $artifactHash
    gatewaySecretExists = $gatewaySecret.exists
    turnstileSecretExists = (Test-Secret -SecretId $TurnstileSecretName).exists
    usesCloudflareTestKeys = [bool]$UseCloudflareTestKeys
    managedRulesMode = $ManagedRulesMode
    copperlineIntakeUrl = $CopperlineLeadIntakeUrl
    nextStep = "Review this dry run, configure the capture-only source, then rerun with -Apply -Confirm $confirmation."
  } | ConvertTo-Json -Depth 5
  exit 0
}

if (-not $bucketExists) {
  if ($Region -eq "us-east-1") {
    Invoke-CheckedAws @("s3api", "create-bucket", "--profile", $Profile, "--region", $Region, "--bucket", $ArtifactBucket, "--output", "json") | Out-Null
  } else {
    Invoke-CheckedAws @(
      "s3api", "create-bucket", "--profile", $Profile, "--region", $Region, "--bucket", $ArtifactBucket,
      "--create-bucket-configuration", "LocationConstraint=$Region", "--output", "json"
    ) | Out-Null
  }
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

$testKeyValue = if ($UseCloudflareTestKeys) { "true" } else { "false" }
$nonce = "$(Get-Date -Format yyyyMMddHHmmss)-$($artifactHash.Substring(0,12))"
Invoke-CheckedAws @(
  "cloudformation", "deploy", "--profile", $Profile, "--region", $Region,
  "--stack-name", $StackName, "--template-file", $template,
  "--capabilities", "CAPABILITY_IAM", "--no-fail-on-empty-changeset",
  "--parameter-overrides",
  "AppName=$AppName",
  "EnvironmentName=$EnvironmentName",
  "CodeBucket=$ArtifactBucket",
  "CodeKey=$artifactKey",
  "CodeObjectVersion=$codeVersion",
  "GatewaySecretArn=$gatewaySecretArn",
  "TurnstileSecretArn=$turnstileSecretArn",
  "CopperlineLeadIntakeUrl=$CopperlineLeadIntakeUrl",
  "AllowedOrigins=$AllowedOrigins",
  "TurnstileAllowedHostnames=$TurnstileAllowedHostnames",
  "LeadLawfulBasis=$LeadLawfulBasis",
  "TurnstileAllowTestKeys=$testKeyValue",
  "ManagedRulesMode=$ManagedRulesMode",
  "WafRateLimit=$WafRateLimit",
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
  stackName = $StackName
  appName = $AppName
  endpoint = $outputMap.LeadGatewayUrl
  functionName = $outputMap.FunctionName
  webAclArn = $outputMap.WebAclArn
  managedRulesMode = $outputMap.ManagedRulesMode
  artifactSha256 = $artifactHash
  artifactVersion = $codeVersion
  secretsPrinted = $false
  nextStep = "Run validate-lead-gateway-staging.ps1, then keep the website provider on HubSpot while capture-only tests run."
} | ConvertTo-Json -Depth 5
