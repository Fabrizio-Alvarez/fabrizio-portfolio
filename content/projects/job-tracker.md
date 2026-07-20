---
title: 'Job-Application Tracker'
summary: 'A tracker for applications, interviews, contacts, and follow-ups that I actually use in my own job search. Node.js + TypeScript + Fastify + Prisma with JWT auth and a state machine for application status.'
stack:
  - 'Node.js'
  - 'TypeScript'
  - 'Fastify'
  - 'Prisma'
  - 'PostgreSQL'
  - 'Vitest'
repo: 'https://github.com/Fabrizio-Alvarez/job-tracker'
demo: ''
year: 2025
role: 'Author'
featured: false
order: 2
---

## Why I built it

I was looking for work and keeping my pipeline in a spreadsheet. Spreadsheets are
terrible at reminders, status transitions, and "when did I last hear back from
this company?". So I built the tool I wanted — which is also the most defensible
kind of side project: one I genuinely use (dogfooding).

## What it does

- Tracks **applications** across companies, with role, source, and salary notes.
- Models status as an explicit **state machine**: `applied → screening → interview → offer | rejected`.
- Logs **follow-ups** and surfaces the ones that are overdue.
- Keeps a **contacts** list (recruiters, hiring managers) linked to applications.
- Shows simple **funnel stats** so I can see where I'm losing candidates.

## Architecture decisions

- **Fastify** over Express — schema-based validation out of the box and a tighter
  typed surface, which matters when the whole point is correctness.
- **Prisma** for data access — typed queries and migrations without hand-rolling SQL.
- **Status as a state machine**, not a free-text field — illegal transitions are
  rejected at the boundary, so the funnel stats are trustworthy.
- **JWT auth** with refresh — single-user today, but structured so multi-tenant
  isn't a rewrite.

## Status

Core flows are working and covered by Vitest tests, with CI green. The UI is
intentionally out of scope for now — the value is the API and the data model.
