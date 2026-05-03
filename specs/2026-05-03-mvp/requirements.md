# Requirements — MVP (Phases 3–10)

## Scope

Deliver a fully working AgentClinic web application. Starting from the existing data models (Phase 2), complete every remaining phase: database, seed data, all four user-facing pages, both dashboards, and visual polish.

### In scope

- **Phase 3 — Database Setup**: SQLite database configured via a migration script; tables match the Phase 2 type definitions exactly
- **Phase 4 — Seed Data**: Script that populates the database with at least one agent, two staff members, three ailments, three therapies, and two appointments
- **Phase 5 — Agent Profile Page**: `/agents/[id]` — displays the agent's name, contact details, ailments linked to their appointments, and therapies they have received
- **Phase 6 — Ailment & Therapy Listings**: `/ailments` and `/therapies` — browsable list pages; therapy detail links back to the ailments it addresses
- **Phase 7 — Appointment Booking**: `/appointments/new` — form allowing selection of a therapy, a staff member qualified to deliver it, and a date/time; creates an `Appointment` row with status `pending`
- **Phase 8 — Staff Dashboard**: `/staff/[id]` — upcoming appointments in chronological order, with agent name and therapy name for each
- **Phase 9 — Agent Dashboard**: `/agents/[id]/dashboard` — agent's own upcoming appointments, therapies in progress, and past appointment history
- **Phase 10 — Styling & Polish**: Consistent visual language across all pages; mobile-first; no fixed-pixel containers; breakpoints at 768 px (tablet) and 1024 px (desktop)

### Out of scope

- Authentication or session management — identity is resolved from the URL (`/agents/[id]`, `/staff/[id]`)
- User registration or password management
- Email notifications or calendar integrations
- Payment or billing flows
- Cancellation or rescheduling UI (status can be updated directly in the database for now)
- Admin tooling beyond the staff dashboard

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Authentication | None | Hard-code or seed known IDs; keeps scope tight and focused on core care workflows |
| Identity resolution | URL parameter (`[id]`) | No session state required; links are shareable and testable without a login flow |
| Database access | SQLite via `better-sqlite3` | Matches tech-stack decision; synchronous API suits Next.js route handlers |
| Migrations | Single SQL file (`db/migrate.ts`) run with `npm run db:migrate` | Keeps setup to one command; no ORM needed at this scale |
| Seed script | `db/seed.ts` run with `npm run db:seed` | Idempotent — safe to re-run; clears and re-inserts on each run |
| Data fetching | Server components + route handlers | SSR for initial page load; API routes only where interactivity requires it (booking form) |
| Styling approach | CSS Modules, mobile-first | Scoped styles, no build-time overhead, aligns with existing project conventions |
| Booking form submission | `<form>` POST to Next.js API route | Server-side validation; no client-state library needed |
| Staff dashboard scope | Upcoming appointments only | Past appointments are out of scope for MVP staff view; agent dashboard covers history from the agent's perspective |

## Context

Phases 1 (bootstrap) and 2 (data models) are already complete and merged to `main`. This MVP spec covers the remaining eight phases delivered together on the `mvp` branch.

No authentication means every page is publicly accessible by ID. This is intentional for the MVP — it removes login complexity so development can focus on the care workflows. Auth can be layered on top post-MVP.

Refer to `specs/mission.md` for product context and `specs/tech-stack.md` for stack rationale.
