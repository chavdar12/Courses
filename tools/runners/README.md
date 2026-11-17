# Self-hosted runners

CI (`.github/workflows/ci.yml`) runs on runners labelled `k8s-runners`. Two ways to provide them; both read the
same `.env`, and you can run either one (or both).

## Setup

1. Create a fine-grained token: owner `chavdar12`, only the `Courses` repository, **Administration: Read and write**.
2. `cp .env.example .env` and put the token in `.env` (git-ignored).

## Docker Compose (simplest)

Plain containers from GitHub's official runner image. Each registers one ephemeral runner, takes one job, exits
and is restarted fresh. Toolchains downloaded by `setup-*` actions are kept in a shared volume.

```bash
docker compose up -d            # 3 runners; set RUNNERS=<n> in .env to change
docker compose logs -f          # registration and jobs
docker compose down             # idle runners unregister themselves
```

## Kubernetes (ARC)

An [Actions Runner Controller](https://github.com/actions/actions-runner-controller) scale set on your current
kube context (Docker Desktop, or kind if there is none). Pods start per job and scale 0..`MAX_RUNNERS`, each with
Docker-in-Docker.

```bash
./setup.sh                      # install or upgrade
./setup.sh down                 # remove
```

The runners show up under the repository's Settings → Actions → Runners. On Apple Silicon they are ARM64.
