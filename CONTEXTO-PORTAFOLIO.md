# 📋 CONTEXTO — Portfolio (Nuxt 3 SSG)

**Última actualización:** 2026-08-31
**Para:** retomar la edición del portfolio en cualquier sesión abierta en este repo.

---

## Qué es esto

Sitio portfolio de **Fabrizio Nicolás Álvarez** (Backend Software Engineer · Product Engineer).
Capa web de presentación montada sobre los artefactos de `fabrizio-career/` (CV + case studies).

**Objetivo** (del `PLAN-portafolio.md`): romper la percepción "PHP legacy" y apuntar a roles
backend / product-engineer **remotos USD 2-3k**, bilingüe es/en.

**Stack:** Nuxt 3 (SSG) · Vue 3 · @nuxt/content v2 · @nuxtjs/i18n · Tailwind CSS. Output 100% estático → **Cloudflare Pages en el apex `falvarez.dev`** (misma cuenta CF que el Worker de Mnemo; decisiones de infra en el contexto heredado de mnemo). **Bilingüe es/en** (en default sin prefijo · `/es/*` para español).

---

## Archivos activos

| Archivo | Qué es |
|---|---|
| `nuxt.config.ts` | Config: SSG (`nitro.prerender` + `crawlLinks`), módulos (content, tailwind), SEO head, fuentes Inter/JetBrains Mono. |
| `tailwind.config.js` | Branding del CV (`ink/accent/mute/line`) + plugin `@tailwindcss/typography` para la prosa de los `.md`. |
| `assets/css/main.css` | `@tailwind` directives + base layer (body, `::selection`, helper `.container-content`). |
| `composables/useSite.ts` | **Source of truth de copy/data**: site meta, nav, hero, métricas, skills, channels. Locale-reactivo vía `useI18n()`. |
| `composables/useContentPath.ts` | Helper que prefija `/es` a los paths de content según locale actual (para `queryContent`). |
| `i18n/locales/{en,es}.json` | Mensajes de Vue i18n por locale: UI strings, hero, metrics, skills groups, channels, SEO. |
| `content/es/{projects,case-studies}/*.md` | Espejo español de los 5 content files (terminología argentina del CV). |
| `layouts/default.vue` | Header + `<slot/>` + Footer. |
| `components/` | `AppHeader`, `AppFooter`, `SectionHeading`, `MetricStrip`, `ProjectCard`, `CaseStudyCard`. |
| `pages/index.vue` | Home: hero + métricas + featured projects + case studies + CTA. |
| `pages/projects/{index,[slug]}.vue` | Lista + detalle de proyectos. |
| `pages/case-studies/{index,[slug]}.vue` | Lista + detalle de case studies. |
| `pages/{about,contact}.vue` | About (summary + skills) y Contact (canales). |
| `content/projects/*.md` | `mnemo.md` (featured, live), `supermarket-stock.md` (featured), `job-tracker.md`. |
| `content/case-studies/*.md` | `qa-transformation`, `payments-integrations`, `performance-reliability`. |
| `public/` | `favicon.svg` (monograma F), `robots.txt`. |
| `README.md` | Overview + layout + cómo sumar proyectos. |
| `DEPLOY.md` | Deploy Cloudflare Pages (`falvarez.dev`) + custom domain + gotchas del DNS (no tocar el CNAME de `mnemo`). |

---

## Cómo correrlo

```bash
npm install            # si clonaste fresco
npm run dev            # http://localhost:3000
npm run generate       # build estático → .output/public/
npx serve .output/public   # preview del build de producción
```

Env útil: `NUXT_TELEMETRY_DISABLED=1` (evita el prompt de telemetría en el primer run).

---

## Estado actual (verificado 2026-08-31)

- ✅ SSG build limpio: **82 rutas** prerenderizadas, 0 errores.
- ✅ Smoke test sobre el build: rutas nuevas de Mnemo (EN/ES), título + links live/repo, orden Mnemo→Supermarket→Job-Tracker en `/projects`, sitemap con `falvarez.dev` + hreflang, cero rastro de vercel — todo verificado.
- ✅ **Proyecto Mnemo agregado** (EN + ES): featured `order: 1`, `demo: https://mnemo.falvarez.dev`. Supermarket pasa a `order: 2`, Job-Tracker a `3`.
- ✅ **URLs de producción apuntan a `falvarez.dev`**: `site.url` + `i18n.baseUrl` en `nuxt.config.ts`, `robots.txt`, sitemap y canonical/hreflang derivados.
- ✅ **Bilingüe es/en completo** — `@nuxtjs/i18n` `prefix_except_default` (`/` en, `/es/*` es). Lang switcher en header. SEO hreflang completo (x-default, en, en-US, es, es-AR).
- ✅ **SEO bundle completo**: OG image branded 1200×630 (`public/og.png`, source `og.svg`, regenerable con `npm run gen:og` vía `scripts/gen-og.mjs`); `@nuxtjs/sitemap` con sitemaps por locale + hreflang alternates; `robots.txt` con URL absoluta.
- ✅ Contenido **real** del CV (no placeholders). Traducciones ES con terminología argentina oficial.
- ✅ **DEPLOYADO Y LIVE en `https://falvarez.dev`** — Worker de assets estáticos en Cloudflare (flujo unificado, NO Pages). Verificado en producción: home 200, `/projects/mnemo` EN/ES 200 con `lang` correcto, `www` → 301 al apex, 404s reales, robots + sitemap con `falvarez.dev`, y **`mnemo.falvarez.dev` intacto** (200).
- ✅ **Deploy 100% desde el repo** (cero clicks en dashboard): `deploy/wrangler.toml` declara assets + custom domains (`routes` con `custom_domain = true`) y `deploy/worker.js` hace el 301 `www`→apex (`run_worker_first` + binding `ASSETS`). El dashboard solo provee: build command `npm run generate`, deploy command `npx wrangler deploy -c deploy/wrangler.toml`.

## Decisiones de stack y contenido

### Lo que SÍ
- **Nuxt 3 + Content v2** (no Nuxt 4 + Content 3): pinneo lo roca-sólida para un primer deploy sin pelear APIs recién salidas. Demostrar skill Vue/Nuxt no depende de 3 vs 4 (ambos corren Vue 3 + Composition API). Upgrade = deuda técnica menor, fase posterior.
- **"Technical Ink" (2026-08-31) — restyle completo vía Stitch MCP**: el branding del CV se reemplazó por un design system dark editorial generado con Gemini 3.1 Pro a través del MCP oficial de Google Stitch (`stitch.googleapis.com/mcp`, config en `~/.omp/agent/mcp.json`, proyecto `fabrizio-portfolio` en Stitch). Tokens: fondo `#111317`/`#0c0e12`, texto `#e2e2e7`/`#958da1`, hairlines `#2a2a33`, violeta `#7c3aed` (fills) + `#d2bbff` (texto acento legible en dark). Tipos: **Archivo Narrow** display · Inter body · JetBrains Mono labels. Editorial: sin sombras, sin gradientes, sin bordes redondeados — hairlines 1px, esquinas rectas, mayúsculas display, labels mono numerados (`01 — SELECTED WORK`). Referencias del diseño en `.stitch/` (gitignored).
- **SSG** (no SSR): estático, SEO fuerte, hosteo gratis en cualquier lado.
- **Markdown-driven** (`@nuxt/content`): sumar proyecto = dropear un `.md`.
- **Métricas hard** en el home (5 yrs · 30k/día · 5 países · 30s→2s) para romper el "PHP legacy".
- **Bilingüe es/en** vía `@nuxtjs/i18n` (`prefix_except_default`): `/` = en (sin prefijo, audiencia principal), `/es/*` = español. Content split por directorio (`content/{projects,case-studies}/*.md` para en, `content/es/...` para es). SEO hreflang completo (x-default/en/en-US/es/es-AR) vía `useLocaleHead`.
- **OG image branded** (`public/og.png` 1200×630, monograma F + headline + métricas) generado desde SVG inline con sharp (`scripts/gen-og.mjs`). Mismo lenguaje visual que el favicon.
- **Sitemap automático** vía `@nuxtjs/sitemap` con `site.url` configurado: `sitemap_index.xml` + un sitemap por locale, cada URL con `xhtml:link` hreflang alternates para Google.
- **Infra heredada de Mnemo (YA TOMADA)**: un dominio para todo el portafolio — apex `falvarez.dev` = este landing en **Cloudflare Pages** (misma cuenta CF que el Worker de Mnemo), cada proyecto vivo en su subdominio (`mnemo.falvarez.dev` ya live). No Vercel ni URLs de vendor.

### Lo que NO (por ahora)
- ❌ Dark mode, animaciones, mobile menu → YAGNI para v1 (el header wrapea bien en mobile con 4 items).

---

## Fuentes de contenido (NO en este repo)

Todo el copy/data proviene de `fabrizio-career/` (carpeta hermana):
- `fabrizio-career/cv-redone-es.md` → bio, summary, skills, contacto.
- `fabrizio-career/case-studies/*.md` → los 3 case studies (acá se re-publican con frontmatter).
- `fabrizio-career/PLAN-portafolio.md` → objetivos, proyectos, secuenciación.

**Si actualizás el CV, propagá los cambios acá** (especialmente `composables/useSite.ts` y `content/`).

---

## Cómo sumar un proyecto

Creá `content/projects/mi-proyecto.md`:

```md
---
title: 'Mi Proyecto'
summary: 'Una línea — va en las cards y en la meta description.'
stack: ['Laravel 11', 'PHP 8.3']
repo: 'https://github.com/Fabrizio-Alvarez/...'
demo: ''                 # opcional, URL pública
year: 2025
role: 'Author'
featured: true           # true = aparece en el home
order: 1                 # menor = primero
---

## Markdown body…
```

Aparece solo en `/projects` y genera su `/projects/mi-proyecto`. Para que exista en español, crear **también** `content/es/projects/mi-proyecto.md` (espejo traducido — mismo frontmatter, mismo `order`). Si no existe, `/es/projects` simplemente no lo lista. Mismo patrón para case studies (`area` en lugar de `stack`).

---

## Pendientes (fase 2)

- ✅ **Deploy a producción** — live en `https://falvarez.dev` (ver 2026-08-31 en Estado). La saga completa de gotchas del deploy, en `DEPLOY.md`: Nitro auto-detecta wrangler en la raíz y secuestra el preset (por eso el config vive en `deploy/`), Node 24 por npm 11 (`npm ci` de npm 10 rompe con peers opcionales), y TOML sobre JSONC.
- ✅ **Diagramas técnicos** — 5 SVGs inline en `public/diagrams/`, referenciados desde EN y ES:
  - `supermarket-stock-ddd.svg` — capas DDD (Presentation → Application → Domain ← Infrastructure).
  - `job-tracker-state.svg` — state machine de application status.
  - `qa-flow.svg` — AI agent → Playwright → CI feedback loop (métricas inline).
  - `payments-webhook.svg` — signature verify → idempotency → handler.
  - `perf-query.svg` — before/after query plan (30s → ~2s, ~15×).
  - Labels técnicos en inglés, compartidos entre locales. Commit `dd19862`.
- ⏳ Cuando esté deployado: linkear el portfolio desde el README del perfil GitHub + el CV.

---

## ⚠️ Nota operativa

El repo vive dentro de **OneDrive**. El sync sobre `.git/` a veces genera conflictos.
Si `git fsck` o un merge tira raro, mover el repo a una carpeta no sincronizada (ej. `C:\dev\fabrizio-portfolio`).
