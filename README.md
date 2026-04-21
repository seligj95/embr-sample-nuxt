# Embr × Nuxt 3 sample

A minimal Nuxt 3 app designed to prove — and stress-test — SSR on
[Embr](https://github.com/coreai-microsoft/embr).

It exercises:

- **Request-time SSR** via `useAsyncData` in `pages/index.vue` (timestamp +
  nonce change every request)
- **Client-side hydration** via a small Vue `ref` counter
- A dedicated **`/api/health`** Nitro route for Embr's health check

## Deploy to Embr

```bash
# Install the CLI (one-time)
npm install -g @coreai-microsoft/embr-cli

# Log in with your personal GitHub account (EMU not supported by Embr yet)
embr login

# "Use this template" on GitHub to make your own copy, then:
embr quickstart deploy <your-user>/embr-sample-nuxt
```

## `embr.yaml`

This sample ships with the recommended recipe for Nuxt 3 SSR on Embr:

```yaml
platform: nodejs
autoDeploy: true

run:
  port: 3000
  startCommand: "npm start"

healthCheck:
  enabled: true
  path: "/api/health"
  expectedStatusCode: 200
```

### Why these choices

- `platform: nodejs` — Nuxt 3's Nitro `node-server` preset produces a plain
  Node HTTP server (`node .output/server/index.mjs`). Oryx auto-detects the
  Node platform from `package.json` and runs `npm install` + `npm run build`.
- **No `buildCommand`** — intentionally omitted. Setting `buildCommand`
  bypasses Oryx's Node pipeline and breaks the produced artifact layout
  (see embr issue #670). Let Oryx drive the build.
- `run.startCommand: "npm start"` — resolves to
  `node .output/server/index.mjs`, which is what `nuxt build` emits under the
  `node-server` Nitro preset. The server reads `PORT` from the environment,
  which Embr injects at runtime.
- `run.port: 3000` — matches Nitro's default listen port. Must match the port
  Embr exposes.
- `healthCheck.path: "/api/health"` — a Nitro server route, not a page. A
  frontend route would always 200 (even when SSR is broken) and would hide
  crashes from Embr's probe.

### What Embr does automatically

- Oryx auto-detects Node from `package.json` and runs `npm install` +
  `npm run build` for you — that's why there is no `buildCommand`.
- Nuxt's build output lands in `.output/` with `.output/server/index.mjs` as
  the entrypoint and `.output/public/` as the static assets directory.

## What to check after deploy

1. `curl https://<deployment>/` twice — the timestamp + nonce on the homepage
   should change each request (proves SSR).
2. `curl https://<deployment>/api/health` — `{"status":"ok",…}` with HTTP 200.
3. Open the homepage in a browser and click the counter — it should
   increment (proves client hydration).

## Local dev

```bash
npm install
npm run dev        # http://localhost:3000

# Or exercise the production server the way Embr does:
npm run build
npm start
```

## Nuxt-specific notes

- `nitro.preset: "node-server"` in `nuxt.config.ts` pins the build to a
  long-running Node server. Without it, Nitro may pick a different preset if
  one is hinted by environment variables (e.g. `NITRO_PRESET`).
- `postinstall: "nuxt prepare"` in `package.json` generates the `.nuxt/`
  type scaffolding so TypeScript resolves cleanly after `npm install` on a
  fresh clone — including inside Oryx during Embr builds.
