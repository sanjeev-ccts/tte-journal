#!/usr/bin/env bash
set -euo pipefail

PORT="${TTE_DEV_PORT:-8080}"
LOG="/tmp/tte-journal-http.log"

if curl -sf "http://127.0.0.1:${PORT}/index.html" -o /dev/null 2>/dev/null; then
  echo "Dev server already listening on port ${PORT}."
  exit 0
fi

python3 -m http.server "$PORT" --bind 0.0.0.0 >>"$LOG" 2>&1 &
server_pid=$!

for _ in $(seq 1 40); do
  if curl -sf "http://127.0.0.1:${PORT}/index.html" -o /dev/null; then
    echo "Dev server ready at http://127.0.0.1:${PORT}/ (pid ${server_pid})."
    exit 0
  fi
  if ! kill -0 "$server_pid" 2>/dev/null; then
    echo "Dev server exited before becoming ready. Log:" >&2
    tail -n 20 "$LOG" >&2 || true
    exit 1
  fi
  sleep 0.25
done

echo "Timed out waiting for dev server on port ${PORT}." >&2
exit 1
