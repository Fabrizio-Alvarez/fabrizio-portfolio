# Deploy guide

The site is a fully static build (`nuxt generate` → `.output/public/`). Any static
host works. **Vercel** is recommended.

## 1. Vercel (recommended — zero config)

1. Push the repo to GitHub (see below).
2. Go to <https://vercel.com/new> and import the repo.
3. Vercel auto-detects Nuxt. Use these defaults:
   - **Framework preset:** Nuxt
   - **Build command:** `npm run generate`
   - **Output directory:** `.output/public`
   - **Install command:** `npm install`
4. Click **Deploy**. First deploy runs in ~1–2 min.

Every push to `main` redeploys automatically. Pull requests get **preview URLs**.

### Custom domain

Project → Settings → Domains → add `yourdomain.dev`. Vercel provisions the cert
and gives you the DNS records to set at your registrar.

## 2. Push to GitHub (first time)

```bash
cd "C:/Users/aleph/OneDrive/Documents/Proyectos/fabrizio-portfolio"
git remote add origin https://github.com/Fabrizio-Alvarez/portfolio.git
git branch -M main
git push -u origin main
```

Create the empty repo first at <https://github.com/new> (name suggestion: `portfolio`).
Don't initialize it with a README — the local commit is already there.

## 3. Other hosts (optional)

- **Netlify** — build `npm run generate`, publish dir `.output/public`.
- **GitHub Pages** — run `npm run generate`, push the contents of `.output/public/`
  to a `gh-pages` branch (or use a Actions workflow). Output is plain HTML/CSS/JS.

## 4. Local preview of the production build

```bash
npm run generate
npx serve .output/public   # or: npm run preview   (Nuxt's static preview server)
```

---

## Phase-2 notes (not blocking)

- **Bilingual es/en** — the site is English-first today (matches the CV source of
  truth and the international-remote target). To go bilingual, install
  `@nuxtjs/i18n` and either translate `useSite.ts` by locale or duplicate the
  `content/**` markdown with a locale suffix (`*.es.md`). Architecture is already
  centralized to make this a clean swap.
- **Sitemap** — once deployed to a real domain, add a `sitemap.xml` (the
  `@nuxtjs/sitemap` module integrates with `nitro.prerender`) and update
  `public/robots.txt` to point at the live URL.
- **OG image** — generate a branded `og-image.png` (1200×630) and reference it in
  `nuxt.config.ts` `app.head.meta` for rich social previews.
