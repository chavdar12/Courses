#!/usr/bin/env bash
# Self-hosted GitHub Actions runners on a local Kubernetes cluster, autoscaled by
# Actions Runner Controller (ARC, runner scale sets). Pods are created per job, scaled 0..MAX.
#
# Usage:
#   GITHUB_CONFIG_URL=https://github.com/<owner>/<repo>   (or https://github.com/<org>) \
#   GITHUB_TOKEN=<PAT: repo scope for a repo, admin:org for an org> \
#   ./setup.sh            # install / upgrade  (or put both vars in .env, see .env.example)
#   ./setup.sh down       # uninstall (and delete the kind cluster if this script made it)
#
# In workflows:  runs-on: <RUNNER_NAME>   (default: k8s-runners)
set -euo pipefail

# Load settings from .env next to this script (see .env.example); vars already set in the shell win.
ENV_FILE="$(dirname "$0")/.env"
if [[ -f $ENV_FILE ]]; then
  while IFS='=' read -r k v; do
    [[ $k =~ ^[A-Z_]+$ && -z ${!k:-} ]] && export "$k=$v"
  done < "$ENV_FILE"
fi

CLUSTER=${CLUSTER:-gh-runners}
RUNNER_NAME=${RUNNER_NAME:-k8s-runners}
MIN_RUNNERS=${MIN_RUNNERS:-0}
MAX_RUNNERS=${MAX_RUNNERS:-5}
CHARTS=oci://ghcr.io/actions/actions-runner-controller-charts

if [[ ${1:-} == down ]]; then
  helm uninstall "$RUNNER_NAME" -n arc-runners --wait || true
  helm uninstall arc -n arc-systems --wait || true
  kind get clusters 2>/dev/null | grep -qx "$CLUSTER" && kind delete cluster --name "$CLUSTER"
  exit 0
fi

: "${GITHUB_CONFIG_URL:?set GITHUB_CONFIG_URL}" "${GITHUB_TOKEN:?set GITHUB_TOKEN}"

# Use the current kube context if there is one, otherwise spin up a local kind cluster.
if ! kubectl config current-context >/dev/null 2>&1; then
  command -v kind >/dev/null || { echo "No kube context and kind not installed: brew install kind" >&2; exit 1; }
  kind get clusters | grep -qx "$CLUSTER" || kind create cluster --name "$CLUSTER"
fi
echo "Using context: $(kubectl config current-context)"

# 1. Controller (watches GitHub job queue, creates runner pods).
helm upgrade --install arc "$CHARTS/gha-runner-scale-set-controller" \
  -n arc-systems --create-namespace --wait

# 2. Runner scale set. Token goes into a k8s secret, not into helm values/history.
kubectl create namespace arc-runners --dry-run=client -o yaml | kubectl apply -f -
kubectl -n arc-runners create secret generic gh-token \
  --from-literal=github_token="$GITHUB_TOKEN" --dry-run=client -o yaml | kubectl apply -f -

helm upgrade --install "$RUNNER_NAME" "$CHARTS/gha-runner-scale-set" \
  -n arc-runners --wait \
  --set githubConfigUrl="$GITHUB_CONFIG_URL" \
  --set githubConfigSecret=gh-token \
  --set minRunners="$MIN_RUNNERS" \
  --set maxRunners="$MAX_RUNNERS" \
  --set containerMode.type=dind  # lets jobs run `docker build` / container actions

kubectl -n arc-systems get pods
echo "Done. Use 'runs-on: $RUNNER_NAME' in your workflows."
