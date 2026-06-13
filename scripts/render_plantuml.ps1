param(
  [string]$PlantUmlJar = $env:PLANTUML_JAR
)

$RootDir = Resolve-Path "$PSScriptRoot\.."
$OutDir = Join-Path $RootDir "out\diagrams"
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$plantumlCmd = Get-Command plantuml -ErrorAction SilentlyContinue
if ($plantumlCmd) {
  plantuml -tsvg -o $OutDir "$RootDir\plantuml\*.puml"
} elseif ($PlantUmlJar -and (Test-Path $PlantUmlJar)) {
  java -jar $PlantUmlJar -tsvg -o $OutDir "$RootDir\plantuml\*.puml"
} else {
  Write-Error "No se encontró plantuml ni PLANTUML_JAR. Instala PlantUML o define PLANTUML_JAR."
  exit 1
}

Write-Host "Diagramas SVG generados en: $OutDir"
