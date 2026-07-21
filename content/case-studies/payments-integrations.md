---
title: 'Payments & third-party integrations'
area: 'Integrations'
summary: 'MercadoPago QR payments, multi-country electronic invoicing, and RIS/LIS bridges — idempotency and signature verification treated as defaults.'
order: 2
---

> Sanitized excerpt of commercial work on **Salutte2 (Alephoo HDE)**. No proprietary
> code is disclosed.

![Webhook idempotency flow](/diagrams/payments-webhook.svg)

## Context

An EMR product expanding into new payment flows and external systems. Each
integration needed to be reliable under real-world conditions: retries, duplicate
events, signature verification, and partial failures.

## What I built

- **MercadoPago QR + webhook** — a payment flow with blocking UX, webhook ingestion,
  idempotency, and signature verification (+16,000 lines, 94 files).
- **HC → RIS integration** — bridged the EMR to an external radiology system
  (RIS Eden) via a client + factory + controllers + tests (+7.7k/-3k lines).
- **Electronic invoicing with Facturacion.Cl** — enabled platform operations in Chile
  (a new country market).
- A reusable **integration pattern** (client, signature/idempotency, retry) applied
  across webhooks and external APIs, plus social-work/insurance coverage-validation
  integrations (obra-social brokers).

## Decisions worth defending

- **Idempotency + signature verification first.** Webhooks redeliver; a missing
  idempotency key means double-charging or double-processing. I treat "the
  integration will receive duplicate/malformed events" as the default.
- **Client + factory for the RIS bridge** — swappable adapter so the EMR isn't
  hard-coupled to one radiology vendor.

## Outcome

New payment capability and market expansion (Chile), plus a hardened integration
layer reused by subsequent third-party connections — for a product operating across
Argentina, Chile, Colombia, México, and the Dominican Republic.

## Evidence (public PR metadata)

- PR #13461 — MercadoPago QR + webhook (+16k/-5k lines).
- PR #13424 — HC → RIS Eden integration (+7.7k/-3k).
- PR #13105 — Facturacion.Cl electronic invoicing.
