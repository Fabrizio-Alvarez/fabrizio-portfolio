---
title: 'Transformación de QA: migración a Pest + E2E asistido por IA'
area: 'Testing & quality'
summary: 'Modernicé la práctica de testing de un codebase PHP maduro — migré el suite backend a Pest y construí una metodología E2E en Playwright asistida por IA.'
order: 1
---

> Extracto sanitizado de trabajo comercial en **Salutte2 (Alephoo HDE)** — un SaaS
> de historia clínica electrónica usado en 5 países. No se divulga código propietario.

![Flujo E2E asistido por IA](/diagrams/qa-flow.svg)

## Contexto

Un codebase PHP grande y maduro (CodeIgniter 3, jQuery) con una suite de tests acotada
e inconsistente. Las regresiones se detectaban tarde, y el QA manual era el bottleneck
antes de cada release.

## Lo que hice

- **Migré el suite de tests backend a Pest** — ~64.000 líneas de tests en 600+ archivos —
  estableciendo la práctica moderna de testing del equipo.
- **Diseñé e implementé una metodología E2E en Playwright asistida por un AI agent** —
  un harness reutilizable (helpers compartidos, configuración, validación por módulo
  piloto) que genera y mantiene cobertura end-to-end. ~+48.000 líneas, 1.414 archivos.
- **Levanté CI en GitHub Actions** (con `actionlint`) y consolidé el monitoreo de errores
  en Sentry.

## Decisiones que vale la pena defender

- **Pest sobre PHPUnit** — feedback más rápido y una API fluida que redujo la fricción de
  escribir tests, lo cual pesó más para la adopción que la paridad cruda.
- **E2E asistido por IA como metodología, no como algo puntual** — los agentes generan y
  mantienen los specs; el equipo es dueño del harness. La ganancia es cobertura sostenida,
  no un único test generado.

## Resultado

Modernicé la práctica de testing del equipo y reduje el esfuerzo de QA manual por ciclo de
release, acelerando la cadencia de releases para un producto que sirve a decenas de miles
de usuarios.

## Evidencia (metadatos públicos de PRs)

- PR #13594 — migración a Pest (~64k líneas).
- PR #13782 — `feat(e2e): AI agent E2E testing methodology` (+48k líneas).
- PR #13645 — migración completa de E2E + unit a Pest.
