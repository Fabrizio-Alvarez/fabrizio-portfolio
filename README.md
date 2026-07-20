# fabrizio-portfolio

Personal portfolio site for **Fabrizio Nicolás Álvarez** — Backend Software Engineer ·
Product Engineer. Built to showcase projects and sanitized case studies from 5 years
of commercial work on a multi-country healthcare SaaS.

Stack: **Nuxt 3 (SSG) · Vue 3 · @nuxt/content · Tailwind CSS**.

## Why this stack

- **Nuxt SSG** → fully static output, strong SEO, free hosting anywhere.
- **@nuxt/content** → projects and case studies are Markdown files. Adding a project
  is just dropping a `.md` in `content/projects/`.
- **Tailwind** → fast, consistent, and the palette inherits the CV's branding
  (`ink #1a1a1a`, `accent #2c3e50`, `mute #666`, `line #cfd3d8`).

Content sources (kept in `fabrizio-career/`): `cv-redone-es.md` for bio/skills,
`case-studies/*.md` for the commercial write-ups.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build (static)

```bash
npm run generate
# Output is in .output/public/ — deploy that folder.
```

## Project layout

```
fabrizio-portfolio/
├── app.vue                    # Root: <NuxtLayout><NuxtPage/></NuxtLayout>
├── nuxt.config.ts             # SSG + content + SEO head
├── tailwind.config.js         # Brand palette + typography plugin
├── assets/css/main.css        # Tailwind directives + base layer
├── composables/
│   └── useSite.ts             # Single source of truth for copy/data (nav, hero, metrics, skills, channels)
├── layouts/default.vue        # Header + <slot/> + Footer
├── components/                # AppHeader, AppFooter, SectionHeading, MetricStrip, ProjectCard, CaseStudyCard
├── pages/                     # index, projects/[index|slug], case-studies/[index|slug], about, contact
├── content/
│   ├── projects/              # *.md = one project each
│   └── case-studies/          # *.md = one case study each
└── public/                    # favicon, robots.txt
```

## Adding a project

Create `content/projects/my-project.md`:

```md
---
title: 'My Project'
summary: 'One-line summary used on cards and meta description.'
stack: ['Laravel 11', 'PHP 8.3']
repo: 'https://github.com/Fabrizio-Alvarez/...'
demo: ''                 # optional live URL
year: 2025
role: 'Author'
featured: true           # show on the home page
order: 1                 # lower = first
---

## Markdown body…
```

It auto-appears on `/projects` and gets its own `/projects/my-project` page.

## Deploy — see [DEPLOY.md](./DEPLOY.md)

Recommended host: **Vercel** (zero-config for Nuxt, preview deploys per PR).
