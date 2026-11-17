# Self-hosted runners

CI (`.github/workflows/ci.yml`) runs on `self-hosted`: plain Docker containers from GitHub's official runner image.
Each registers one ephemeral runner, takes one job, exits and is restarted fresh. Toolchains downloaded by
`setup-*` actions are kept in a shared volume.

1. Create a fine-grained token: owner `chavdar12`, only the `Courses` repository, **Administration: Read and write**.
2. `cp .env.example .env` and put the token in `.env` (git-ignored).
3. Start them:

```bash
docker compose up -d            # 3 runners; set RUNNERS=<n> in .env to change
docker compose logs -f          # registration and jobs
docker compose down             # idle runners unregister themselves
```

They show up under the repository's Settings → Actions → Runners. On Apple Silicon they are ARM64.
