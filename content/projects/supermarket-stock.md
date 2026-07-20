---
title: 'Supermarket Stock System'
summary: 'Inventory management backend for a supermarket chain, built in Laravel with a framework-agnostic, domain-driven core. The domain is fully tested without Laravel — pure PHP.'
stack:
  - 'Laravel 11'
  - 'PHP 8.3'
  - 'PostgreSQL'
  - 'Pest'
  - 'Docker'
  - 'GitHub Actions'
repo: 'https://github.com/Fabrizio-Alvarez/Ejercicio-Arquitectura'
demo: ''
year: 2025
role: 'Author'
featured: true
order: 1
---

## Overview

A backend service for managing supermarket stock: products, stock levels, movements
(receipts, sales, adjustments), and the rules around them. It's an architecture
study first and a working service second — built to prove a clean, framework-agnostic
PHP core that can survive a framework swap.

## Architecture: DDD in layers

The code is split so the business logic never learns about Laravel:

- **Domain** — pure PHP. Entities, value objects, and domain services. No framework
  imports, no Eloquent, no HTTP. This is the part tested in isolation.
- **Application** — use cases (handlers) that orchestrate the domain and declare
  transactions and side effects as interfaces.
- **Infrastructure** — Eloquent repositories, framework adapters, and third-party
  clients implementing the Application-layer interfaces.
- **Presentation** — a REST API exposing the use cases.

The headline is the **domain tested without the framework**: if Laravel disappeared
tomorrow, the business rules and their tests would compile green.

## What's inside

- Product catalogue and stock-level projections.
- Stock movements as an append-only ledger with domain invariants (no negative stock,
  consistent totals).
- REST endpoints for the common operations, validated at the boundary.
- A Pest test suite covering domain rules and API behaviour.
- Dockerized local environment and a GitHub Actions pipeline running tests on every push.

## Why this project

I spend my day job in PHP, so I wanted a public piece of work that shows how I think
about backend design in that language: clear boundaries, invariants enforced in the
domain, and infrastructure as a detail. DDD on a real (if small) domain is more
honest than yet another CRUD demo.
