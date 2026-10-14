#!/bin/bash

SECTION="$1"

if [ -z "$SECTION" ]; then
  echo "Usage: bun run test:e2e -- 1.1"
  exit 1
fi

REPORT_DIR="$SECTION" \
start-server-and-test \
  'vite dev --port 4173' \
  http://localhost:4173 \
  "cypress run --e2e --spec cypress/e2e/$SECTION/**/*.feature"