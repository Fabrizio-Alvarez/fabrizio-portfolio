---
title: 'Sistema de Stock de Supermercado'
summary: 'Backend de gestión de inventario para una cadena de supermercados, construido en Laravel con un núcleo framework-agnostic y domain-driven. El dominio se testea por completo sin Laravel — PHP puro.'
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
role: 'Autor'
featured: true
order: 2
---

## Descripción general

Un servicio backend para gestionar el stock de un supermercado: productos, niveles
de stock, movimientos (recepciones, ventas, ajustes) y las reglas asociadas. Es
primero un estudio de arquitectura y segundo un servicio funcional — construido
para demostrar un núcleo PHP limpio, framework-agnostic, capaz de sobrevivir a un
cambio de framework.

## Arquitectura: DDD en capas

El código está estructurado de forma que la lógica de negocio nunca dependa de
Laravel:

![DDD en capas](/diagrams/supermarket-stock-ddd.svg)


- **Dominio** — PHP puro. Entidades, value objects y servicios de dominio. Sin
  imports del framework, sin Eloquent, sin HTTP. Esta es la parte que se testea
  de forma aislada.
- **Aplicación** — casos de uso (handlers) que orquestan el dominio y declaran
  transacciones y side effects como interfaces.
- **Infraestructura** — repositorios Eloquent, adaptadores del framework y
  clientes de terceros que implementan las interfaces de la capa de Aplicación.
- **Presentación** — una REST API que expone los casos de uso.

Lo más importante es el **dominio testeado sin el framework**: si Laravel
desapareciera mañana, las reglas de negocio y sus tests pasarían en verde.

## Qué incluye

- Catálogo de productos y proyecciones de niveles de stock.
- Movimientos de stock como un ledger append-only con invariantes de dominio (sin
  stock negativo, totales consistentes).
- Endpoints REST para las operaciones comunes, validados en el límite.
- Un suite de tests en Pest que cubre las reglas del dominio y el comportamiento
  de la API.
- Entorno local dockerizado y un pipeline de GitHub Actions que ejecuta los tests
  en cada push.

## Por qué este proyecto

Trabajo día a día en PHP, así que quise tener un proyecto público que muestre cómo
pienso el diseño de backend en ese lenguaje: límites claros, invariantes enforced
en el dominio, e infraestructura como detalle. DDD sobre un dominio real (aunque
chico) es más honesto que otra demo CRUD más.
