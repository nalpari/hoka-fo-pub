param(
    [ValidateSet('check', 'install')]
    [string]$Command = 'check'
)

$ErrorActionPreference = 'Stop'
$scriptName = if ($Command -eq 'install') { 'install-okf-hooks.mjs' } else { 'okf-sync.mjs' }
$scriptPath = Join-Path $PSScriptRoot $scriptName

Push-Location (Split-Path $PSScriptRoot -Parent)
try {
    if ($Command -eq 'install') {
        & node $scriptPath
    } else {
        & node $scriptPath check
    }
    $result = $LASTEXITCODE
} finally {
    Pop-Location
}

exit $result
