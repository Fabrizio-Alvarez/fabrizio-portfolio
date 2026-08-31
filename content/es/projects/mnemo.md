---
title: 'Mnemo'
summary: 'Flashcards con repetición espaciada para mi propio estudio — el contenido vive en Markdown versionado con git, el estado SRS (SM-2 de Anki) en Postgres. Live en su propio subdominio, full-serverless en el free tier.'
stack:
  - 'TypeScript'
  - 'Next.js 15'
  - 'Cloudflare Workers'
  - 'Prisma'
  - 'PostgreSQL (Neon)'
  - 'Vitest'
  - 'pnpm monorepo'
repo: 'https://github.com/Fabrizio-Alvarez/mnemo'
demo: 'https://mnemo.falvarez.dev'
year: 2026
role: 'Autor'
featured: true
order: 1
---

## Descripción general

Una app personal de estudio con tarjetas, estilo Anki. El contenido — 8 mazos,
256 tarjetas — vive en archivos Markdown versionados con git; el estado de
repetición espaciada (algoritmo SM-2 de Anki) vive en Postgres. Está en uso real
diario, y eso mantiene honesta cada decisión de diseño.

**Live:** <https://mnemo.falvarez.dev>

## Arquitectura: monorepo hexagonal

- **`@mnemo/domain`** — el parser de Markdown y el scheduler SM-2 como TypeScript
  puro: 67 tests, sin base de datos, sin framework. El paquete viaja intacto a
  cualquier runtime.
- **Contenido ≠ estado** como decisión central: los `.md` son la fuente de verdad;
  la base de datos es derivada e idempotente — el seed se puede re-correr en
  cualquier momento sin perder el estado de scheduling.
- **Full-serverless en el free tier**: Cloudflare Workers (vía OpenNext) + Neon
  Postgres, dominio propio, CI/CD en cada push (GitHub Actions).

## Más allá de las flashcards: modo quiz

Un modo quiz didáctico donde cada pregunta trae distractores plausibles escritos a
mano y una explicación conceptual del "por qué" — las respuestas incorrectas
enseñan en lugar de solo fallar. Los modos son extensiones del mismo dominio, no
apps separadas: extensibilidad hecha carne.

## Por qué este proyecto

Es el proyecto que más uso y el que muestra el arco completo: modelado de dominio
(SM-2, parsing de contenido), un monorepo real con límites estrictos, y operación
en producción en mi propio dominio — deployado, monitoreado, y a US$0/mes.
