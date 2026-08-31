---
title: 'Tracker de Aplicaciones Laborales'
summary: 'Un tracker para aplicaciones, entrevistas, contactos y follow-ups que efectivamente uso en mi propia búsqueda laboral. Node.js + TypeScript + Fastify + Prisma con JWT auth y una máquina de estados para el status de la aplicación.'
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
role: 'Autor'
featured: false
order: 3
---

## Por qué lo construí

Estaba buscando trabajo y llevando mi pipeline en una planilla. Las planillas son
pésimas para recordatorios, transiciones de status y "¿cuándo fue la última vez
que me respondió esta empresa?". Por eso construí la herramienta que quería —
que también es el tipo de side project más defendible: uno que efectivamente
uso (dogfooding).

## Qué hace

- Trackea **aplicaciones** por empresa, con rol, fuente y notas de salario.
- Modela el status como una **máquina de estados** explícita: `applied → screening → interview → offer | rejected`.
- Registra **follow-ups** y marca los que están vencidos.
- Mantiene una lista de **contactos** (recruiters, hiring managers) vinculados a las aplicaciones.
- Muestra **estadísticas de funnel** simples para ver dónde se pierden candidatos.

## Decisiones de arquitectura

![State machine de status de la aplicación](/diagrams/job-tracker-state.svg)


- **Fastify** por sobre Express — validación basada en esquemas out of the box
  y una superficie tipada más ajustada, lo cual importa cuando el punto central
  es la corrección.
- **Prisma** para acceso a datos — queries tipadas y migraciones sin escribir SQL
  a mano.
- **Status como máquina de estados**, no un campo de texto libre — las transiciones
  ilegales se rechazan en el límite, así las estadísticas de funnel son confiables.
- **JWT auth** con refresh — single-user por ahora, pero estructurado para que
  el multi-tenant no sea un rewrite.

## Status

Los flujos centrales funcionan y están cubiertos por tests de Vitest, con CI en
verde. La UI está intencionalmente fuera de scope por ahora — el valor está en
la API y el modelo de datos.
