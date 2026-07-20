---
title: 'Performance y confiabilidad bajo carga'
area: 'Performance'
summary: 'Reducí una query crítica de base de datos de 30s a ~2s, fortalecí un camino de caché corrupto, y ejecuté 100+ hotfixes a producción con cambios disciplinados y reversibles.'
order: 3
---

> Extracto sanitizado de trabajo comercial en **Salutte2 (Alephoo HDE)** — un SaaS
> de historia clínica electrónica donde algunas clínicas procesan hasta 30.000
> turnos/día. No se divulga código propietario.

## Contexto

A escala, algunas queries lentas y un par de incidentes de caché corrupto
degradaron la experiencia en las clínicas de mayor volumen. La confiabilidad es
crítica en software de salud — un flujo de turnos degradado bloquea a los
pacientes.

## Lo que hice

- **Reducí queries críticas de base de datos de >30s a ~2s (~15×)** reescribiéndolas
  y agregando los índices correctos — la métrica más citada de este trabajo.
- **Diagnosticué y corregí incidentes de caché corrupto** y fortalecí el camino de
  caché.
- **100+ deploys y hotfixes a producción**, incluyendo respuesta a incidentes
  urgentes.
- **Centralicé el monitoreo de errores en Sentry** para que las regresiones se
  detecten inmediatamente en lugar de por reportes de usuarios.

## Decisiones que vale la pena defender

- **Medir y después optimizar.** La mejora de 30s→2s provino de identificar las
  queries ofensoras reales (mediante análisis de slow queries), no de indexación
  especulativa.
- **Tratar el acceso a producción como una skill de primera** — hotfixes
  disciplinados, chicos y reversibles bajo presión, sin heroicos.

## Resultado

UX materialmente mejor en clínicas de alto volumen y detección y resolución de
incidentes más rápida en toda la plataforma.

## Evidencia (metadatos públicos de PRs)

- PR #13795 — `Production mejoras slow queries`.
- PR #13468 — fix de caché corrupto.
- 100+ PRs etiquetados `Production`.
