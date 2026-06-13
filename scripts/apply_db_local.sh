#!/usr/bin/env bash
set -euo pipefail

# Uso:
#   DATABASE_URL="postgresql://user:pass@localhost:5432/utp_match" ./scripts/apply_db_local.sh

: "${DATABASE_URL:?Debes definir DATABASE_URL}"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$(dirname "$0")/../sql/01_schema_postgres.sql"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$(dirname "$0")/../sql/02_seed_demo.sql"
