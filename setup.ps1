# ToolIt Next.js Setup Script
# This script will set up your Next.js project automatically

Write-Host ""
Write-Host "   ToolIt Next.js Setup Wizard          " -ForegroundColor Cyan
Write-Host "   Modern, Fast, Animated Website       " -ForegroundColor Cyan
Write-Host ""

Write-Host "`nStarting setup process...`n" -ForegroundColor Green

# Step 1: Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "Error: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the nextjs-toolit directory" -ForegroundColor Yellow
    exit 1
}

# Step 2: Install dependencies
Write-Host "[1/4] Installing dependencies..." -ForegroundColor Cyan
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nError: Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "`n✓ Dependencies installed successfully!`n" -ForegroundColor Green

# Step 3: Copy images
Write-Host "[2/4] Copying images to public folder..." -ForegroundColor Cyan

# Create public directory if it doesn't exist
if (-not (Test-Path "public")) {
    New-Item -ItemType Directory -Path "public" | Out-Null
}

$images = @(
    "Pic1.jpg", "bike.jpg", "van.jpg", "girl.jpg", "gear.jpg",
    "blackorange shows.jpg", "cycle.jpg", "cycle1.jpg", "redbag.jpg",
    "blackhelmet.jpg", "brown boot.jpg", "redhelmet.jpg", "rehelmet1.jpg",
    "hat.jpg", "tool.jpg", "bottle.jpg", "blackhelmet1.jpg", "greybag.jpg",
    "trail.jpg", "bridge.jpg", "grass.jpg", "harley.jpg",
    "men.jpg", "boy.jpg", "boy2.jpg", "boy3.jpg",
    "fb.png", "ig.png", "twit.png"
)

$copied = 0
foreach ($image in $images) {
    $sourcePath = "..\$image"
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath -Destination "public" -Force
        $copied++
    }
}

Write-Host "✓ Copied $copied images to public folder`n" -ForegroundColor Green

# Step 4: Create .env.local (optional)
Write-Host "[3/4] Creating environment file..." -ForegroundColor Cyan
$envContent = @"
# Environment variables for ToolIt Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000
"@
Set-Content -Path ".env.local" -Value $envContent
Write-Host "✓ Environment file created`n" -ForegroundColor Green

# Step 5: Final instructions
Write-Host "[4/4] Setup complete!`n" -ForegroundColor Cyan

Write-Host ""
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start development server:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "To build for production:" -ForegroundColor Cyan
Write-Host "  npm run build" -ForegroundColor White
Write-Host "  npm start" -ForegroundColor White
Write-Host ""
Write-Host "Your website will be available at:" -ForegroundColor Cyan
Write-Host "  http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Features included:" -ForegroundColor Cyan
Write-Host "  ✓ Next.js 14 with App Router" -ForegroundColor Green
Write-Host "  ✓ TypeScript for type safety" -ForegroundColor Green
Write-Host "  ✓ Tailwind CSS for styling" -ForegroundColor Green
Write-Host "  ✓ Framer Motion animations" -ForegroundColor Green
Write-Host "  ✓ Optimized images" -ForegroundColor Green
Write-Host "  ✓ SEO ready" -ForegroundColor Green
Write-Host "  ✓ Mobile responsive" -ForegroundColor Green
Write-Host ""
Write-Host "Happy coding!" -ForegroundColor Green
Write-Host ""
