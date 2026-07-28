param(
  [Parameter(Mandatory = $true)]
  [string]$CredentialFile,
  [string]$Profile = "epic-prod",
  [string]$Region = "us-east-2",
  [string]$SecretName = "epic-global/website-production/turnstile",
  [Parameter(Mandatory = $true)]
  [string]$Confirm
)

$ErrorActionPreference = "Stop"
$requiredConfirmation = "IMPORT_PRODUCTION_TURNSTILE_SECRET"
$expectedAccountId = "897689477180"
if ($Confirm -ne $requiredConfirmation) {
  throw "Import requires -Confirm $requiredConfirmation."
}
if ($Profile -ne "epic-prod" -or $Region -ne "us-east-2") {
  throw "This importer refuses to target a non-production profile or region."
}
if ($SecretName -ne "epic-global/website-production/turnstile") {
  throw "This importer requires the dedicated production Turnstile secret name."
}
if (-not (Test-Path -LiteralPath $CredentialFile -PathType Leaf)) {
  throw "The temporary Turnstile credential file was not found."
}

$stored = $null
try {
  $accountId = (
    aws sts get-caller-identity `
      --profile $Profile `
      --query Account `
      --output text `
      --no-cli-pager
  ).Trim()
  if ($LASTEXITCODE -ne 0 -or $accountId -ne $expectedAccountId) {
    throw "Production AWS account verification failed."
  }

  $candidate = Get-Content -Raw -LiteralPath $CredentialFile | ConvertFrom-Json
  $siteKey = [string]$candidate.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  $secretKey = [string]$candidate.TURNSTILE_SECRET_KEY
  if ($siteKey -notmatch '^0x[0-9A-Za-z_-]{20,}$' -or $secretKey.Length -lt 32) {
    throw "The temporary file does not contain valid Turnstile credentials."
  }

  $savedPreference = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  aws secretsmanager describe-secret `
    --profile $Profile `
    --region $Region `
    --secret-id $SecretName `
    --no-cli-pager *> $null
  $exists = $LASTEXITCODE -eq 0
  $ErrorActionPreference = $savedPreference

  if ($exists) {
    $secretArn = (
      aws secretsmanager put-secret-value `
        --profile $Profile `
        --region $Region `
        --secret-id $SecretName `
        --secret-string "file://$CredentialFile" `
        --query ARN `
        --output text `
        --no-cli-pager
    ).Trim()
  } else {
    $secretArn = (
      aws secretsmanager create-secret `
        --profile $Profile `
        --region $Region `
        --name $SecretName `
        --description "Production Cloudflare Turnstile credentials for Epic website lead capture" `
        --secret-string "file://$CredentialFile" `
        --query ARN `
        --output text `
        --no-cli-pager
    ).Trim()
  }
  if ($LASTEXITCODE -ne 0 -or -not $secretArn.StartsWith("arn:aws:secretsmanager:${Region}:${expectedAccountId}:")) {
    throw "The production Turnstile secret could not be stored."
  }

  $stored = (
    aws secretsmanager get-secret-value `
      --profile $Profile `
      --region $Region `
      --secret-id $SecretName `
      --query SecretString `
      --output text `
      --no-cli-pager |
      ConvertFrom-Json
  )
  if (
    [string]$stored.NEXT_PUBLIC_TURNSTILE_SITE_KEY -ne $siteKey -or
    [string]$stored.TURNSTILE_SECRET_KEY -ne $secretKey
  ) {
    throw "The stored Turnstile credential verification failed."
  }

  [ordered]@{
    secretArn = $secretArn
    created = -not $exists
    siteKeyPresent = $siteKey.Length -ge 20
    secretKeyPresent = $secretKey.Length -ge 32
    secretPrinted = $false
  } | ConvertTo-Json -Depth 4
} finally {
  $candidate = $null
  $siteKey = $null
  $secretKey = $null
  $stored = $null
  Remove-Item -LiteralPath $CredentialFile -Force -ErrorAction SilentlyContinue
}
