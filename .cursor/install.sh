#!/usr/bin/env bash
set -euo pipefail

cd /workspace

required=(
  index.html
  roster.html
  service-worker.js
  manifest.json
  i18n.js
)

for f in "${required[@]}"; do
  if [[ ! -f "$f" ]]; then
    echo "Missing required file: $f" >&2
    exit 1
  fi
done

echo "tte-journal static assets verified."
