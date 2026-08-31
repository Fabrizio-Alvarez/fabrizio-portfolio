# Deploy guide

Fully static build (`nuxt generate` → `.output/public/`), deployed to
**Cloudflare** on the apex domain **`falvarez.dev`**.

Infra decision (inherited from the Mnemo project, already taken):

- One domain for the whole portfolio: apex = this landing, each project hangs off
  its own subdomain (`mnemo.falvarez.dev` is live; future `api.`, `app.`, …).
- Same Cloudflare account as Mnemo — the domain is already an active zone there.

## How the deploy works (Workers + static assets)

The current Cloudflare dashboard creates Git-connected projects as **Workers**
(the unified flow), not classic Pages. A Worker deploy expects an entry-point —
that's why a bare repo fails with *"The entry-point file at index.mjs was not
found"*.

The repo declares itself a **pure static site** in `wrangler.jsonc`:

```jsonc
{
  "name": "fabrizio-portfolio",
  "compatibility_date": "2026-08-31",
  "assets": { "directory": "./.output/public" }   // no "main" → assets-only
}
```

`.node-version` (24) pins the build runtime. Node 24 matters for two reasons:
Vite 7 needs Node ≥ 20.19, and — more importantly — Node 24 bundles **npm 11**.
npm 10's `npm ci` re-resolves optional peer deps (`oxc-parser >=0.140.0`) against
the registry and then fails with *"Missing: @oxc-parser/binding-* from lock
file"*. npm 11 respects the lockfile as-is.

## 1. Project settings (dashboard, one time)

Worker project → **Settings**:

- **Builds → Build settings** → Build command: `npm run generate`
  (⚠️ NOT `npm run build` — that's the SSR build, wrong output).
- **Variables and Secrets**: `NODE_VERSION` = `24` (must match `.node-version`;
  a stale `22` here overrides the file and brings back npm 10).

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

It means the deploy didn't find the static-assets config: check `wrangler.jsonc`
exists at the repo root with `assets.directory`, and that the build command is
`npm run generate` (output `.output/public` must exist after build).
