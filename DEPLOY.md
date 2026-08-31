# Deploy guide

Fully static build (`nuxt generate` → `.output/public/`), deployed to
**Cloudflare Pages** on the apex domain **`falvarez.dev`**.

Infra decision (inherited from the Mnemo project, already taken):

- One domain for the whole portfolio: apex = this landing, each project hangs off
  its own subdomain (`mnemo.falvarez.dev` is live; future `api.`, `app.`, …).
- Same Cloudflare account as Mnemo — the domain is already an active zone there.
- Pages (static) and Workers (apps) are both free and coexist without conflict.

## 1. Cloudflare Pages (connect to Git)

The repo is already on GitHub (`Fabrizio-Alvarez/fabrizio-portfolio`).

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → select this repo.
2. Build settings:
   - **Framework preset:** None (or Nuxt/Astro if offered — values below win)
   - **Build command:** `npm run generate`
   - **Build output directory:** `.output/public`
   - **Install command:** `npm install`
3. **Save and Deploy.** First build runs in ~1–2 min.

Every push to `main` rebuilds automatically. Pull requests get preview URLs.

## 2. Custom domain — `falvarez.dev`

Pages project → **Custom domains** → **Set up a custom domain** → `falvarez.dev`.

- Cloudflare creates the DNS record by itself — do **not** touch the DNS manually.
- Add `www.falvarez.dev` too and set it to **redirect to the apex**
  (Rules → Redirect Rules, or a Page Rule: `www.falvarez.dev/*` →
  `https://falvarez.dev/$1`, 301).

### ⚠️ Gotchas (from the Mnemo setup)

- The apex currently points to nothing — assigning the custom domain in Pages
  creates the record. Leave the existing **`mnemo` CNAME record untouched**:
  that subdomain belongs to the Worker, not to Pages.
- The `mnemo` Worker and this Pages project are different products on the same
  domain — no conflict, no migration needed.

## 3. Local preview of the production build

```bash
npm run generate
npx serve .output/public   # or: npm run preview   (Nuxt's static preview server)
```

## 4. Other hosts (not used)

The output is plain HTML/CSS/JS — Vercel, Netlify, or GitHub Pages would also
work (`npm run generate`, publish `.output/public/`). Cloudflare Pages is the
chosen home: same account as the domain, zero egress fees, no vendor URL in
production.
