# NorthstarBackend

Production-ready NestJS backend scaffold for a SaaS foundation.

## Stack

- NestJS 11 + TypeScript strict mode
- PostgreSQL + Prisma ORM
- JWT auth (access + refresh)
- Pino structured logging
- Helmet, CORS, throttling, validation
- Jest unit + e2e tests
- Docker + docker-compose (app, postgres, redis)

## Structure

```text
src/
  modules/
    auth/
    users/
    health/
  common/
  config/
  database/
  core/
  app.module.ts
  main.ts
```

## Setup

1. Copy env file:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Generate Prisma client:

```bash
npm run prisma:generate
```

4. Run migrations:

```bash
npm run prisma:migrate:dev
```

5. Start in development:

```bash
npm run dev
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start:prod`
- `npm run test`
- `npm run test:e2e`
- `npm run prisma:migrate:dev`
- `npm run prisma:migrate:deploy`

## API conventions

- Prefix: `/api`
- Versioning: URI (`/v1`)
- Response format:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```
