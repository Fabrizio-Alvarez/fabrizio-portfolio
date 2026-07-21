---
title: 'QA transformation: Pest migration + AI-assisted E2E'
area: 'Testing & quality'
summary: 'Modernized a mature PHP codebase's testing practice — migrated the backend suite to Pest and built an AI-assisted E2E methodology on Playwright.'
order: 1
---

> Sanitized excerpt of commercial work on **Salutte2 (Alephoo HDE)** — an EMR SaaS
> used across 5 countries. No proprietary code is disclosed.

![AI-assisted E2E flow](/diagrams/qa-flow.svg)

## Context

A large, mature PHP codebase (CodeIgniter 3, jQuery) with a thin, inconsistent
test suite. Regressions were caught late, and manual QA was the bottleneck before
every release.

## What I did

- **Migrated the backend test suite to Pest** — ~64,000 lines of tests across 600+
  files — establishing the team's modern testing practice.
- **Designed and built an E2E methodology on Playwright, assisted by an AI agent**
  — a reusable harness (shared helpers, config, pilot-module validation) that
  generates and maintains end-to-end coverage. ~+48,000 lines, 1,414 files.
- **Stood up CI on GitHub Actions** (with `actionlint`) and consolidated error
  monitoring on Sentry.

## Decisions worth defending

- **Pest over PHPUnit** — faster feedback and a fluent API that lowered the friction
  of writing tests, which mattered more for adoption than raw parity.
- **AI-assisted E2E as a methodology, not a one-off** — the agents generate and
  maintain specs; the team owns the harness. The win is sustained coverage, not a
  single generated test.

## Outcome

Modernized the testing practice of the team and cut manual QA effort per release
cycle, accelerating release cadence for a product serving tens of thousands of users.

## Evidence (public PR metadata)

- PR #13594 — migration to Pest (~64k lines).
- PR #13782 — `feat(e2e): AI agent E2E testing methodology` (+48k lines).
- PR #13645 — full E2E + unit migration to Pest.
