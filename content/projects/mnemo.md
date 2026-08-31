---
title: 'Mnemo'
summary: 'Spaced-repetition flashcards for my own studying — content lives in git-versioned Markdown, scheduling state (Anki SM-2) in Postgres. Live on its own subdomain, fully serverless on the free tier.'
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
role: 'Author'
featured: true
order: 1
---

## Overview

A personal study app with flashcards, Anki-style. The content — 8 decks, 256 cards —
lives in Markdown files versioned with git; the spaced-repetition state (Anki's SM-2
algorithm) lives in Postgres. It's in real daily use, which keeps every design
decision honest.

**Live:** <https://mnemo.falvarez.dev>

## Architecture: hexagonal monorepo

- **`@mnemo/domain`** — the Markdown parser and the SM-2 scheduler as pure
  TypeScript: 67 tests, no database, no framework. The package travels intact to
  any runtime.
- **Content ≠ state** as the central decision: the `.md` files are the source of
  truth; the database is derived and idempotent — the seed can be re-run at any
  time without losing scheduling state.
- **Full-serverless on the free tier**: Cloudflare Workers (via OpenNext) + Neon
  Postgres, custom domain, CI/CD on every push (GitHub Actions).

## Beyond flashcards: quiz mode

A didactic quiz mode where each question carries plausible, hand-written
distractors and a conceptual "why" explanation — wrong answers teach instead of
just failing. Modes are extensions of the same domain, not separate apps: this is
extensibility made flesh.

## Why this project

It's the project I use the most and the one that shows the full arc: domain
modeling (SM-2, content parsing), a real monorepo with strict boundaries, and
production ops on my own domain — deployed, monitored, and paid for at US$0/month.
