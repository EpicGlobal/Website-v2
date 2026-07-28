param(
  [string]$OutputPath = ""
)

$ErrorActionPreference = "Stop"
$repoRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "..\.."))
$source = Join-Path $repoRoot "supabase\functions\lead-capture\gateway.ts"
$adapter = Join-Path $PSScriptRoot "lead-gateway\handler.mjs"
$packageJson = Join-Path $PSScriptRoot "lead-gateway\package.json"
$packageLock = Join-Path $PSScriptRoot "lead-gateway\package-lock.json"
$adapterTest = Join-Path $PSScriptRoot "lead-gateway\adapter-smoke-test.mjs"
$tsc = Join-Path $repoRoot "node_modules\.bin\tsc.cmd"
if (-not (Test-Path -LiteralPath $source) -or -not (Test-Path -LiteralPath $adapter) -or -not (Test-Path -LiteralPath $tsc)) {
  throw "Lead gateway sources or local TypeScript compiler are missing. Run npm install first."
}
if ([string]::IsNullOrWhiteSpace($OutputPath)) {
  $OutputPath = Join-Path $repoRoot "artifacts\lead-gateway.zip"
}
$resolvedOutput = [System.IO.Path]::GetFullPath($OutputPath)
$outputDirectory = Split-Path -Parent $resolvedOutput
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null

$temporaryRoot = [System.IO.Path]::GetFullPath((Join-Path ([System.IO.Path]::GetTempPath()) ("epic-lead-gateway-" + [guid]::NewGuid().ToString("N"))))
$systemTemp = [System.IO.Path]::GetFullPath([System.IO.Path]::GetTempPath())
if (-not $temporaryRoot.StartsWith($systemTemp, [System.StringComparison]::OrdinalIgnoreCase) -or (Split-Path $temporaryRoot -Leaf) -notlike "epic-lead-gateway-*") {
  throw "Refusing to use an unexpected temporary path."
}
$packageRoot = Join-Path $temporaryRoot "package"
try {
  New-Item -ItemType Directory -Path $packageRoot -Force | Out-Null
  & $tsc --target ES2022 --module ES2022 --moduleResolution Bundler --lib ES2022,DOM --skipLibCheck --declaration false --sourceMap false --outDir $packageRoot --noEmit false $source
  if ($LASTEXITCODE -ne 0) { throw "TypeScript compilation failed." }
  Copy-Item -LiteralPath $adapter -Destination (Join-Path $packageRoot "handler.mjs")
  Copy-Item -LiteralPath $packageJson -Destination (Join-Path $packageRoot "package.json")
  Copy-Item -LiteralPath $packageLock -Destination (Join-Path $packageRoot "package-lock.json")
  Copy-Item -LiteralPath $adapterTest -Destination (Join-Path $packageRoot "adapter-smoke-test.mjs")
  Push-Location $packageRoot
  try {
    & npm ci --omit=dev --ignore-scripts --no-audit --no-fund | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "Lead gateway dependency installation failed." }
    & node adapter-smoke-test.mjs | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "Lead gateway Lambda adapter validation failed." }
  } finally {
    Pop-Location
  }
  Remove-Item -LiteralPath (Join-Path $packageRoot "adapter-smoke-test.mjs") -Force
  if (Test-Path -LiteralPath $resolvedOutput) { Remove-Item -LiteralPath $resolvedOutput -Force }
  Compress-Archive -Path (Join-Path $packageRoot "*") -DestinationPath $resolvedOutput -CompressionLevel Optimal
  $hash = (Get-FileHash -LiteralPath $resolvedOutput -Algorithm SHA256).Hash.ToLowerInvariant()
  [ordered]@{
    outputPath = $resolvedOutput
    sha256 = $hash
    bytes = (Get-Item -LiteralPath $resolvedOutput).Length
    containsSecrets = $false
  } | ConvertTo-Json
} finally {
  if (Test-Path -LiteralPath $temporaryRoot) {
    $verified = [System.IO.Path]::GetFullPath($temporaryRoot)
    if ($verified.StartsWith($systemTemp, [System.StringComparison]::OrdinalIgnoreCase) -and (Split-Path $verified -Leaf) -like "epic-lead-gateway-*") {
      Remove-Item -LiteralPath $verified -Recurse -Force
    }
  }
}
