# Workspace

## Overview

pnpm workspace monorepo using TypeScript. SafeReport AI — Anonymous Complaint Reporting & Smart Escalation System.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Auth**: JWT + bcryptjs
- **Frontend**: React + Vite + Tailwind CSS + Wouter

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   └── safereport/         # React frontend (SafeReport AI)
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Application: SafeReport AI

Anonymous complaint reporting system with AI classification, smart escalation, and admin dashboard.

### Features
- Splash screen → Home page (2s auto-redirect)
- Anonymous report submission with voice input (Web Speech API)
- AI-powered urgency detection and risk scoring (local + HuggingFace optional)
- Auto-escalation for high-urgency reports
- Complaint tracking by unique ID
- User dashboard for their own reports
- Admin dashboard with stats, complaint management, filtering
- Analytics charts by category/status/urgency/month
- Dark mode toggle
- JWT authentication (admin + user roles)

### Demo Credentials
- Admin: admin@safereport.com / Admin@123
- User: user@safereport.com / User@123

### Database Tables
- `users` — user accounts
- `complaints` — complaint reports with AI fields
- `messages` — internal messaging per complaint
- `escalations` — escalation history records

### Sample Data
7 complaints seeded covering: Sexual Harassment, Ragging, Stalking, Cyberbullying, Mental Health, Discrimination, Physical Violence

### API Routes
- `GET /api/healthz` — health check
- `POST /api/auth/register` — register user
- `POST /api/auth/login` — login
- `GET /api/auth/me` — get current user
- `GET /api/complaints` — list complaints (auth required)
- `POST /api/complaints` — submit complaint (public)
- `GET /api/complaints/track/:id` — track by complaint ID (public)
- `GET /api/complaints/:id` — get single complaint (auth)
- `PATCH /api/complaints/:id` — update complaint (admin)
- `POST /api/complaints/:id/escalate` — escalate (admin)
- `GET /api/complaints/:id/messages` — get messages (auth)
- `POST /api/complaints/:id/messages` — add message (auth)
- `GET /api/admin/dashboard` — dashboard stats (admin)
- `GET /api/analytics/summary` — analytics (auth)
