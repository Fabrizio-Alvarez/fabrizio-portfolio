---
title: 'Performance & reliability under load'
area: 'Performance'
summary: 'Cut a critical database query from 30s to ~2s, hardened a corrupted-cache path, and ran 100+ production hotfixes with disciplined, reversible changes.'
order: 3
---

> Sanitized excerpt of commercial work on **Salutte2 (Alephoo HDE)** — an EMR SaaS
> where some clinics process up to 30,000 appointments/day. No proprietary code is
> disclosed.

![Slow query optimization: 30s to ~2s](/diagrams/perf-query.svg)

## Context

At scale, a few slow queries and a couple of corrupt-cache incidents degraded the
experience in the highest-volume clinics. Reliability is critical in healthcare
software — a degraded appointment flow blocks patients.

## What I did

- **Cut critical database queries from >30s to ~2s (~15×)** by rewriting them and
  adding the right indexes — the single most-quoted metric from this work.
- **Diagnosed and fixed corrupted-cache incidents** and hardened the cache path.
- **100+ production deploys and hotfixes**, including urgent incident response.
- **Consolidated error monitoring on Sentry** so regressions surface immediately
  rather than via user reports.

## Decisions worth defending

- **Measure, then optimize.** The 30s→2s win came from identifying the actual
  offending queries (via slow-query analysis), not speculative indexing.
- **Treat production access as a first-class skill** — disciplined, small, reversible
  hotfixes under pressure, not heroics.

## Outcome

Materially better UX in high-volume clinics and faster incident detection and
resolution across the platform.

## Evidence (public PR metadata)

- PR #13795 — `Production mejoras slow queries`.
- PR #13468 — corrupted-cache fix.
- 100+ PRs tagged `Production`.
