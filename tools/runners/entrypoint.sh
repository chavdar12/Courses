#!/usr/bin/env bash
# One ephemeral runner for the repository in GITHUB_CONFIG_URL: register, run one job, exit.
# Compose restarts the container, so every job starts on a clean runner.
set -euo pipefail
: "${GITHUB_CONFIG_URL:?set GITHUB_CONFIG_URL in .env}" "${GITHUB_TOKEN:?set GITHUB_TOKEN in .env}"
repo=${GITHUB_CONFIG_URL#https://github.com/}
token() {
  curl -fsS -X POST -H "Authorization: Bearer $GITHUB_TOKEN" -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/$repo/actions/runners/$1-token" | jq -r .token
}

sudo chown runner "$RUNNER_TOOL_CACHE" # the named volume starts out root-owned
cd /home/runner
./config.sh --unattended --url "$GITHUB_CONFIG_URL" --token "$(token registration)" \
  --name "compose-$(hostname)" --ephemeral --replace --disableupdate

./run.sh &
pid=$!
# `docker compose down` while idle: stop the runner and unregister it (after a job it removes itself)
trap 'kill -TERM $pid 2>/dev/null; wait $pid; ./config.sh remove --token "$(token remove)" || true; exit 0' TERM INT
wait $pid
