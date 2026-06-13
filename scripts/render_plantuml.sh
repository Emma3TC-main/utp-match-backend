#!/usr/bin/env bash
set -euo pipefail

# Uso:
#   ./scripts/render_plantuml.sh
# Requiere: java + plantuml.jar en PATH o variable PLANTUML_JAR.

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT_DIR/out/diagrams"
mkdir -p "$OUT_DIR"

if command -v plantuml >/dev/null 2>&1; then
  plantuml -tsvg -o "$OUT_DIR" "$ROOT_DIR/plantuml/*.puml"
elif [[ -n "${PLANTUML_JAR:-}" && -f "$PLANTUML_JAR" ]]; then
  java -jar "$PLANTUML_JAR" -tsvg -o "$OUT_DIR" "$ROOT_DIR/plantuml/*.puml"
else
  echo "No se encontró plantuml ni PLANTUML_JAR. Instala plantuml o define PLANTUML_JAR=/ruta/plantuml.jar" >&2
  exit 1
fi

echo "Diagramas SVG generados en: $OUT_DIR"
