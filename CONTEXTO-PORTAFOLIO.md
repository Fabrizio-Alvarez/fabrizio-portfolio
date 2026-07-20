# 📋 CONTEXTO — Portfolio (Nuxt 3 SSG)

**Última actualización:** 2026-07-20
**Para:** retomar la edición del portfolio en cualquier sesión abierta en este repo.

---

## Qué es esto

Sitio portfolio de **Fabrizio Nicolás Álvarez** (Backend Software Engineer · Product Engineer).
Capa web de presentación montada sobre los artefactos de `fabrizio-career/` (CV + case studies).

**Objetivo** (del `PLAN-portafolio.md`): romper la percepción "PHP legacy" y apuntar a roles
backend / product-engineer **remotos USD 2-3k**, bilingüe es/en.

**Stack:** Nuxt 3 (SSG) · Vue 3 · @nuxt/content v2 · @nuxtjs/i18n · Tailwind CSS. Output 100% estático → hostea en cualquier lado (recomendado: Vercel). **Bilingüe es/en** (en default sin prefijo · `/es/*` para español).

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
| `content/projects/*.md` | `supermarket-stock.md` (featured), `job-tracker.md`. |
| `content/case-studies/*.md` | `qa-transformation`, `payments-integrations`, `performance-reliability`. |
| `public/` | `favicon.svg` (monograma F), `robots.txt`. |
| `README.md` | Overview + layout + cómo sumar proyectos. |
| `DEPLOY.md` | Deploy Vercel + push GitHub + notas fase 2. |

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

## Estado actual (verificado 2026-07-20)

- ✅ SSG build limpio: **74 rutas** prerenderizadas (67 site + sitemap_index + 2 sitemaps locale + style.xsl), 0 errores.
- ✅ Smoke test sobre el build: titles, html lang, hreflang + canonical, contenido localizado verificados en ambas locales.
- ✅ **Bilingüe es/en completo** — `@nuxtjs/i18n` `prefix_except_default` (`/` en, `/es/*` es). Lang switcher en header. SEO hreflang completo (x-default, en, en-US, es, es-AR).
- ✅ **SEO bundle completo**: OG image branded 1200×630 (`public/og.png`, source `og.svg`, regenerable con `npm run gen:og` vía `scripts/gen-og.mjs`); `@nuxtjs/sitemap` con sitemaps por locale + hreflang alternates; `robots.txt` con URL absoluta.
- ✅ Hidratación correcta: `_payload.json` por ruta + `/api/_content/query/*.json`.
- ✅ Git history: `82ad1f7` (init) · `70c2642` (bilingüe) · `932cc9a` (SEO bundle).
- ✅ Contenido **real** del CV (no placeholders). Traducciones ES con terminología argentina oficial.

## Decisiones de stack y contenido

### Lo que SÍ
- **Nuxt 3 + Content v2** (no Nuxt 4 + Content 3): pinneo lo roca-sólida para un primer deploy sin pelear APIs recién salidas. Demostrar skill Vue/Nuxt no depende de 3 vs 4 (ambos corren Vue 3 + Composition API). Upgrade = deuda técnica menor, fase posterior.
- **English-first**: matchea el CV source-of-truth + objetivo internacional remoto.
- **SSG** (no SSR): estático, SEO fuerte, hosteo gratis en cualquier lado.
- **Branding heredado del CV**: `ink #1a1a1a`, `accent #2c3e50`, `mute #666`, `line #cfd3d8`.
- **Markdown-driven** (`@nuxt/content`): sumar proyecto = dropear un `.md`.
- **Métricas hard** en el home (5 yrs · 30k/día · 5 países · 30s→2s) para romper el "PHP legacy".
- **Bilingüe es/en** vía `@nuxtjs/i18n` (`prefix_except_default`): `/` = en (sin prefijo, audiencia principal), `/es/*` = español. Content split por directorio (`content/{projects,case-studies}/*.md` para en, `content/es/...` para es). SEO hreflang completo (x-default/en/en-US/es/es-AR) vía `useLocaleHead`.
- **OG image branded** (`public/og.png` 1200×630, monograma F + headline + métricas) generado desde SVG inline con sharp (`scripts/gen-og.mjs`). Mismo lenguaje visual que el favicon.
- **Sitemap automático** vía `@nuxtjs/sitemap` con `site.url` configurado: `sitemap_index.xml` + un sitemap por locale, cada URL con `xhtml:link` hreflang alternates para Google.

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

- ⏳ **Push a GitHub + deploy Vercel** (pasos exactos en `DEPLOY.md`).
- ⏳ **Imágenes de proyectos** (screenshots / diagramas) vía `@nuxt/image`.
- ⏳ Cuando esté deployado: linkear el portfolio desde el README del perfil GitHub + el CV.

---

## ⚠️ Nota operativa

El repo vive dentro de **OneDrive**. El sync sobre `.git/` a veces genera conflictos.
Si `git fsck` o un merge tira raro, mover el repo a una carpeta no sincronizada (ej. `C:\dev\fabrizio-portfolio`).
