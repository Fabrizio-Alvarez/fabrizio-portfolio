---
title: 'Pagos e integraciones de terceros'
area: 'Integrations'
summary: 'Pagos MercadoPago QR, facturación electrónica multi-país y bridges RIS/LIS — idempotencia y verificación de firma como defaults.'
order: 2
---

> Extracto sanitizado de trabajo comercial en **Salutte2 (Alephoo HDE)**. No se
> divulga código propietario.

![Flujo de idempotencia de webhook](/diagrams/payments-webhook.svg)

## Contexto

Un producto de historia clínica electrónica en expansión hacia nuevos flujos de
pago y sistemas externos. Cada integración debía ser confiable bajo condiciones
reales: reintentos, eventos duplicados, verificación de firma y fallos parciales.

## Lo que construí

- **MercadoPago QR + webhook** — un flujo de pago con UX de bloqueo, ingesta de
  webhooks, idempotencia y verificación de firma (+16.000 líneas, 94 archivos).
- **Integración HC → RIS** — puente entre la historia clínica electrónica y un
  sistema radiológico externo (RIS Eden) mediante client + factory + controllers
  + tests (+7.7k/-3k líneas).
- **Facturación electrónica con Facturacion.Cl** — habilitó la operación de la
  plataforma en Chile (un nuevo mercado).
- Un **patrón de integración** reutilizable (client, signature/idempotency,
  retry) aplicado a webhooks y APIs externas, más integraciones de validación de
  cobertura de obras sociales (brokers de obras sociales).

## Decisiones que vale la pena defender

- **Idempotencia + verificación de firma primero.** Los webhooks se re-envían;
  una idempotency key faltante significa doble cobro o doble procesamiento.
  Tomo "la integración recibirá eventos duplicados o malformados" como el
  default.
- **Client + factory para el bridge RIS** — adapter intercambiable para que la
  historia clínica electrónica no quede hard-coupled a un único vendor
  radiológico.

## Resultado

Nueva capacidad de pago y expansión a nuevos mercados (Chile), más una capa de
integración más robusta reutilizada por conexiones de terceros posteriores —
para un producto que opera en Argentina, Chile, Colombia, México y República
Dominicana.

## Evidencia (metadatos públicos de PRs)

- PR #13461 — MercadoPago QR + webhook (+16k/-5k líneas).
- PR #13424 — Integración HC → RIS Eden (+7.7k/-3k).
- PR #13105 — Facturación electrónica con Facturacion.Cl.
