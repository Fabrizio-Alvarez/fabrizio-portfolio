# Deploy guide

Fully static build (`nuxt generate` → `.output/public/`), deployed to
**Cloudflare** on the apex domain **`falvarez.dev`**.

Infra decision (inherited from the Mnemo project, already taken):

- One domain for the whole portfolio: apex = this landing, each project hangs off
  its own subdomain (`mnemo.falvarez.dev` is live; future `api.`, `app.`, …).
- Same Cloudflare account as Mnemo — the domain is already an active zone there.

## How the deploy works (Workers + static assets)

The current Cloudflare dashboard creates Git-connected projects as **Workers**
(the unified flow), not classic Pages. The repo declares itself a **pure static
site** via `deploy/wrangler.toml` (assets-only, no entry-point):

```toml
name = "fabrizio-portfolio"
compatibility_date = "2026-08-31"

[assets]
directory = "../.output/public"
not_found_handling = "404-page"
```

### ⚠️ Why the config lives in `deploy/` (not the repo root)

If Nitro finds a `wrangler.toml`/`.jsonc` at the root, it auto-switches the
build preset to `cloudflare-module`, **overrides the `assets` config**, and
generates its own deploy config (`.output/server/wrangler.json` + a
`.wrangler/deploy/config.json` redirect). `npx wrangler deploy` then follows the
redirect and dies with *"The entry-point file at index.mjs was not found"* —
`nuxt generate` produces no server entry. Two guards prevent this:

1. The wrangler config sits in `deploy/`, outside Nitro's detection.
2. `nitro.preset: 'static'` is pinned in `nuxt.config.ts`.

`.node-version` (24) pins the build runtime. Node 24 matters for two reasons:
Vite 7 needs Node ≥ 20.19, and — more importantly — the CF build image ships
npm 10.9 even with Node 24, whose `npm ci` re-resolves optional peer deps
(`oxc-parser >=0.140.0`) against the registry and fails with *"Missing:
@oxc-parser/binding-* from lock file"*. Node 24's own npm (11.x) resolves the
lockfile as-is.

## 1. Project settings (dashboard, one time)

Worker project → **Settings → Builds → Build settings**:

- **Build command:** `npm run generate`
  (⚠️ NOT `npm run build` — that's the SSR build, wrong output).
- **Deploy command:** `npx wrangler deploy -c deploy/wrangler.toml`
  (the explicit `-c` path is required — that's where the config lives).
- **Variables and Secrets:** `NODE_VERSION` = `24` if set at all (must match
  `.node-version`; a stale `22` here overrides the file).

Every push to `main` rebuilds automatically.

## 2. Custom domains — `falvarez.dev`

Worker project → **Settings → Domains & routes → Add → Custom domain**:

1. `falvarez.dev` — Cloudflare creates the DNS record itself.
2. `www.falvarez.dev` — same. The redirect below makes apex canonical.

Then **Rules → Redirect Rules**: `Hostname equals www.falvarez.dev` →
dynamic redirect `concat("https://falvarez.dev", http.request.uri.path)`,
status 301, preserve query string.

### ⚠️ Gotchas (from the Mnemo setup)

- Leave the existing **`mnemo` CNAME record untouched** — that subdomain
  belongs to the Worker of Mnemo.
- Don't create DNS records by hand for the apex/www custom domains; the
  Custom Domain flow does it correctly (Worker route + cert).

## 3. Local preview of the production build

```bash
npm run generate
npx serve .output/public   # or: npm run preview   (Nuxt's static preview server)
```

## 4. If the build ever shows `index.mjs not found` again

It means the deploy didn't find the static-assets config — either the deploy
command lost its `-c deploy/wrangler.toml`, a wrangler config reappeared at the
repo root (Nitro hijack — see above), or the build command isn't
`npm run generate` (`.output/public` must exist after build).
