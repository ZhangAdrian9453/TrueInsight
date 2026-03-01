$Host.UI.RawUI.WindowTitle = "ZhenMing LiuYao"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "  ========================================" -ForegroundColor Cyan
Write-Host "    ZhenMing LiuYao - Starting..." -ForegroundColor Cyan
Write-Host "    Frontend: http://localhost:6600" -ForegroundColor Green
Write-Host "    Backend:  http://localhost:6601" -ForegroundColor Green
Write-Host "  ========================================" -ForegroundColor Cyan
Write-Host ""

# Install server dependencies if needed
if (-not (Test-Path "$root\server\node_modules")) {
    Write-Host "  [0/2] Installing server dependencies..." -ForegroundColor Yellow
    & npm install --prefix "$root\server" | Out-Null
}

# Start backend
Write-Host "  [1/2] Starting backend..." -ForegroundColor Yellow
$backend = Start-Process -FilePath "node" -ArgumentList "index.js" -WorkingDirectory "$root\server" -WindowStyle Hidden -PassThru

Start-Sleep -Seconds 2

# Start frontend
Write-Host "  [2/2] Starting frontend..." -ForegroundColor Yellow
$frontend = Start-Process -FilePath "npx" -ArgumentList "vite --host" -WorkingDirectory $root -WindowStyle Hidden -PassThru

Start-Sleep -Seconds 3

# Open browser
Start-Process "http://localhost:6600"

Write-Host ""
Write-Host "  Started! Browser opening http://localhost:6600" -ForegroundColor Green
Write-Host "  Press Enter to stop all services..." -ForegroundColor Gray
Write-Host ""

Read-Host

# Cleanup
Write-Host "  Stopping services..." -ForegroundColor Yellow
try { Stop-Process -Id $backend.Id -Force -ErrorAction SilentlyContinue } catch {}
try { Stop-Process -Id $frontend.Id -Force -ErrorAction SilentlyContinue } catch {}

# Also kill any node processes on our ports
Get-NetTCPConnection -LocalPort 6600,6601 -ErrorAction SilentlyContinue | ForEach-Object {
    Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
}

Write-Host "  All services stopped." -ForegroundColor Green
