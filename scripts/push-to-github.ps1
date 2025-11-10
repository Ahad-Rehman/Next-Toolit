<#
Interactive PowerShell helper to commit and push this project to a GitHub repository.
Usage: open PowerShell in the repo root (D:\Code\nextjs-toolit) and run:

  ./scripts/push-to-github.ps1

This script will:
 - initialize git if not initialized
 - optionally add or set the 'origin' remote
 - stage all changes and create a commit with your message
 - push to the remote 'origin' on the 'main' branch (creates upstream)

Notes:
 - You must have git installed and configured (user.name/user.email).
 - For private repos or SSH pushes, ensure your SSH key is set up, or provide an HTTPS URL and credentials.
 - The script is interactive and will ask for any missing inputs.
#>

Set-StrictMode -Version Latest

function Exec-Git {
    param($args)
    $result = & git @args 2>&1
    return @{ Exit = $LASTEXITCODE; Output = $result }
}

Push-Location (Split-Path -Parent $MyInvocation.MyCommand.Definition)
try {
    if (-not (Test-Path .git)) {
        Write-Host "No git repository found. Initializing git..." -ForegroundColor Cyan
        $r = Exec-Git init
        Write-Host ($r.Output -join "`n")
    }
    else {
        Write-Host "Git repository detected." -ForegroundColor Green
    }

    # Check for origin
    $origin = Exec-Git 'remote' 'get-url' 'origin'
    if ($origin.Exit -ne 0) { $originUrl = '' } else { $originUrl = ($origin.Output -join "`n").Trim() }

    if ([string]::IsNullOrWhiteSpace($originUrl)) {
        $inputUrl = Read-Host "No 'origin' remote found. Enter GitHub repo URL to add as 'origin' (or leave blank to skip)"
        if (-not [string]::IsNullOrWhiteSpace($inputUrl)) {
            $r = Exec-Git remote add origin $inputUrl
            if ($r.Exit -ne 0) { Write-Host "Failed to add remote: $($r.Output -join ' ')" -ForegroundColor Red; exit 1 }
            Write-Host "Added origin: $inputUrl" -ForegroundColor Green
            $originUrl = $inputUrl
        }
        else {
            Write-Host "No origin provided; you must add a remote later to push." -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "Existing origin: $originUrl" -ForegroundColor Green
        $change = Read-Host "Keep this origin? (Y/n)"
        if ($change -and $change -match '^[nN]') {
            $newUrl = Read-Host "Enter new origin URL"
            if (-not [string]::IsNullOrWhiteSpace($newUrl)) {
                Exec-Git remote set-url origin $newUrl | Out-Null
                Write-Host "Updated origin to $newUrl" -ForegroundColor Green
                $originUrl = $newUrl
            }
        }
    }

    # Ensure git user is set
    $name = Exec-Git config user.name
    $email = Exec-Git config user.email
    if ($name.Exit -ne 0 -or $email.Exit -ne 0) {
        Write-Host "Git user.name and/or user.email not set. Please configure them before pushing." -ForegroundColor Yellow
        if ($name.Exit -ne 0) { Write-Host "Run: git config --global user.name \"Your Name\"" }
        if ($email.Exit -ne 0) { Write-Host "Run: git config --global user.email \"you@example.com\"" }
    }

    # Stage and commit
    Exec-Git add -A | Out-Null
    $defaultMsg = "chore: update project `$(Get-Date -Format 'yyyy-MM-dd HH:mm')`"
    $msg = Read-Host "Commit message (leave empty to use default)"
    if ([string]::IsNullOrWhiteSpace($msg)) { $msg = $defaultMsg }
    $commit = Exec-Git commit -m $msg
    if ($commit.Exit -ne 0) {
        if ($commit.Output -join "`n" -match "nothing to commit") {
            Write-Host "No changes to commit." -ForegroundColor Yellow
        } else {
            Write-Host ($commit.Output -join "`n") -ForegroundColor Red
        }
    } else {
        Write-Host "Committed: $msg" -ForegroundColor Green
    }

    if (-not [string]::IsNullOrWhiteSpace($originUrl)) {
        # push to main (create branch if needed)
        $branch = Exec-Git rev-parse --abbrev-ref HEAD
        $branchName = ($branch.Output -join "`n").Trim()
        if ($branch.Exit -ne 0 -or [string]::IsNullOrWhiteSpace($branchName) -or $branchName -eq 'HEAD') { $branchName = 'main' }

        Write-Host "Pushing to origin/$branchName..." -ForegroundColor Cyan
        $push = Exec-Git push -u origin $branchName
        if ($push.Exit -ne 0) {
            Write-Host "Push failed:" -ForegroundColor Red
            Write-Host ($push.Output -join "`n")
            Write-Host "If the remote repo is empty, consider creating the 'main' branch remote first or run this script again." -ForegroundColor Yellow
        } else {
            Write-Host "Pushed to origin/$branchName" -ForegroundColor Green
        }
    } else {
        Write-Host "No origin remote configured; skipping push." -ForegroundColor Yellow
    }
} finally {
    Pop-Location
}
