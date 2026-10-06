# Copies partials/header.html and partials/footer.html into every page.
# Each page keeps marker comments so this can be re-run after editing a partial:
#   <!--@header--> ... <!--/@header-->
#   <!--@footer--> ... <!--/@footer-->
# Usage (from the project root):  powershell -ExecutionPolicy Bypass -File tools\sync-partials.ps1

$root = Split-Path -Parent $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding($false)
$parts = @{
  header = [IO.File]::ReadAllText((Join-Path $root 'partials\header.html'), $utf8).TrimEnd()
  footer = [IO.File]::ReadAllText((Join-Path $root 'partials\footer.html'), $utf8).TrimEnd()
}

Get-ChildItem -Path $root -Filter *.html -File | ForEach-Object {
  $html = [IO.File]::ReadAllText($_.FullName, $utf8)
  $out = $html
  foreach ($name in $parts.Keys) {
    $pattern = "(?s)<!--@$name-->.*?<!--/@$name-->"
    $block = "<!--@$name-->`n" + $parts[$name] + "`n<!--/@$name-->"
    $out = [regex]::Replace($out, $pattern, { param($m) $block })
  }
  if ($out -ne $html) {
    [IO.File]::WriteAllText($_.FullName, $out, $utf8)
    Write-Host "updated $($_.Name)"
  }
}
