# Self-hosted runners

CI (`.github/workflows/ci.yml`) runs on `k8s-runners`: an [Actions Runner Controller](https://github.com/actions/actions-runner-controller)
scale set on a local Kubernetes cluster (Docker Desktop, or kind if there is no kube context). Pods start per job and scale 0..`MAX_RUNNERS`.

1. Create a fine-grained token: owner `chavdar12`, only the `Courses` repository, **Administration: Read and write**.
2. `cp .env.example .env` and put the token in `.env` (git-ignored).
3. `./setup.sh` installs or upgrades; `./setup.sh down` removes it.

The runners show up under the repository's Settings → Actions → Runners. Pods are ARM64 on Apple Silicon.
