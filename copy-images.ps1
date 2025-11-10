# Copy all images from parent directory to public folder

Write-Host "Copying images to public folder..." -ForegroundColor Green

# Create public directory if it doesn't exist
$publicDir = "public"
if (-not (Test-Path $publicDir)) {
    New-Item -ItemType Directory -Path $publicDir | Out-Null
}

# List of image files to copy
$images = @(
    "Pic1.jpg",
    "bike.jpg",
    "van.jpg",
    "girl.jpg",
    "gear.jpg",
    "blackorange shows.jpg",
    "cycle.jpg",
    "cycle1.jpg",
    "redbag.jpg",
    "blackhelmet.jpg",
    "brown boot.jpg",
    "redhelmet.jpg",
    "rehelmet1.jpg",
    "hat.jpg",
    "tool.jpg",
    "bottle.jpg",
    "blackhelmet1.jpg",
    "greybag.jpg",
    "trail.jpg",
    "bridge.jpg",
    "grass.jpg",
    "harley.jpg",
    "men.jpg",
    "boy.jpg",
    "boy2.jpg",
    "boy3.jpg",
    "fb.png",
    "ig.png",
    "twit.png"
)

$copied = 0
$notFound = @()

foreach ($image in $images) {
    $sourcePath = "..\$image"
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath -Destination $publicDir -Force
        Write-Host "✓ Copied: $image" -ForegroundColor Green
        $copied++
    }
    else {
        Write-Host "✗ Not found: $image" -ForegroundColor Yellow
        $notFound += $image
    }
}

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "Copied: $copied images" -ForegroundColor Green

if ($notFound.Count -gt 0) {
    Write-Host "Not found: $($notFound.Count) images" -ForegroundColor Yellow
    Write-Host "`nMissing files:" -ForegroundColor Yellow
    $notFound | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
}

Write-Host "`nDone! You can now run: npm install" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
