# setup-skills.ps1
# Installs Antigravity skills and updates hardcoded paths.

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
if (-not $scriptDir) { $scriptDir = Get-Location }

$zipName = "antigravity-skills.zip"
$zipPath = Join-Path $scriptDir $zipName
$targetDir = Join-Path $env:USERPROFILE ".gemini\antigravity\skills"

if (-not (Test-Path $zipPath)) {
    Write-Error "Could not find $zipName in the current directory: $scriptDir"
    exit 1
}

Write-Host "Installing skills to: $targetDir"

if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
}

Expand-Archive -Path $zipPath -DestinationPath $targetDir -Force

Write-Host "Updating paths for your system..."
$normalizedTarget = $targetDir.Replace("/", "\")

$filesToUpdate = @(
    (Join-Path $targetDir "registry.md"),
    (Join-Path $targetDir "site-audit\SKILL.md")
)

foreach ($file in $filesToUpdate) {
    if (Test-Path $file) {
        $content = Get-Content -Raw -Path $file
        # Replace the hardcoded path with the new path
        $updatedContent = $content -replace "C:\\Users\\user\\.gemini\\antigravity\\skills", $normalizedTarget
        $updatedContent | Set-Content -Path $file
    }
}

Write-Host "Success! Restart your Antigravity agent to load the new skills."
