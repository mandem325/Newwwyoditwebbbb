#!/bin/bash
while true; do
  STATUS=$(grep "built in" .output/server/index.mjs 2>/dev/null || echo "Building")
  if [[ "$STATUS" != "Building" ]]; then
    break
  fi
  sleep 1
done
