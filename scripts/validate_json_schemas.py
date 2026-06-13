from pathlib import Path
import json

root = Path(__file__).resolve().parents[1]
for path in sorted((root / "json_schemas").glob("*.json")):
    with path.open(encoding="utf-8") as f:
        json.load(f)
    print(f"OK {path.name}")
