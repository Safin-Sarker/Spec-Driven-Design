# Plan — MVP (Phases 3–10)

## Phase 3 — Database Setup

- [ ] Install `better-sqlite3` and its TypeScript types
- [ ] Create `db/schema.sql` with `CREATE TABLE` statements for `agents`, `ailments`, `therapies`, `staff_members`, `appointments`
- [ ] Write `db/migrate.ts` that reads and executes `schema.sql` against `agentclinic.db`
- [ ] Add `"db:migrate": "ts-node db/migrate.ts"` to `package.json` scripts
- [ ] Add `db/client.ts` that exports a singleton SQLite connection
- [ ] Verify `npm run db:migrate` creates the database file and all tables

## Phase 4 — Seed Data

- [ ] Write `db/seed.ts` that truncates all tables then inserts:
  - 1 agent
  - 2 staff members (e.g. physiotherapist + counsellor)
  - 3 ailments (e.g. Decision Fatigue, Empathy Overload, Context Overflow)
  - 3 therapies mapped to those ailments
  - 2 appointments (one `pending`, one `confirmed`)
- [ ] Add `"db:seed": "ts-node db/seed.ts"` to `package.json` scripts
- [ ] Verify `npm run db:seed` is idempotent (safe to run twice)

## Phase 5 — Agent Profile Page

- [ ] Create `app/agents/[id]/page.tsx` as a server component
- [ ] Fetch agent row by `id`; return 404 if not found
- [ ] Query appointments for that agent and join to therapies and ailments
- [ ] Render: name, email, phone, date of birth, list of ailments, list of therapies received
- [ ] Add a link to the agent's dashboard (`/agents/[id]/dashboard`)

## Phase 6 — Ailment & Therapy Listings

- [ ] Create `app/ailments/page.tsx` — list all ailments with name and description
- [ ] Create `app/therapies/page.tsx` — list all therapies with name, duration, and ailment badges
- [ ] Each therapy card links to a detail view or inline shows which ailments it addresses
- [ ] Add navigation links from the home page to `/ailments` and `/therapies`

## Phase 7 — Appointment Booking

- [ ] Create `app/appointments/new/page.tsx` — booking form (client component)
- [ ] Form fields: therapy selector, staff member selector (filtered to those qualified for chosen therapy), date, time
- [ ] Create `app/api/appointments/route.ts` — POST handler that validates input and inserts a new `Appointment` row with status `pending`
- [ ] On success redirect to the agent dashboard; on error show inline validation messages
- [ ] Add a "Book appointment" link from the agent profile and dashboard pages

## Phase 8 — Staff Dashboard

- [ ] Create `app/staff/[id]/page.tsx` as a server component
- [ ] Fetch staff member row by `id`; return 404 if not found
- [ ] Query upcoming appointments (`scheduledAt > now`, statuses `pending` | `confirmed`) ordered by `scheduledAt` ASC
- [ ] Render: staff name and role, appointment list with agent name, therapy name, date/time, status
- [ ] Show empty state if no upcoming appointments

## Phase 9 — Agent Dashboard

- [ ] Create `app/agents/[id]/dashboard/page.tsx` as a server component
- [ ] Fetch agent row; return 404 if not found
- [ ] Query and render three sections:
  - **Upcoming**: appointments with `scheduledAt > now` and status `pending` | `confirmed`
  - **In progress**: appointments with status `confirmed` and `scheduledAt <= now`
  - **History**: appointments with status `completed` | `cancelled` | `no-show`
- [ ] Show empty state for each section when empty
- [ ] Link back to the agent profile page

## Phase 10 — Styling & Polish

- [ ] Audit every page against the mobile-first checklist (no fixed-pixel containers, fluid padding, breakpoints at 768 px / 1024 px)
- [ ] Apply consistent typography: one heading scale, one body font
- [ ] Apply a coherent colour palette across all pages (calm, wellness-appropriate)
- [ ] Style navigation header with links to `/ailments`, `/therapies`, and the seeded agent's dashboard
- [ ] Style all forms, buttons, cards, and tables consistently
- [ ] Test at 375 px (mobile), 768 px (tablet), and 1280 px (desktop) viewports
- [ ] Fix any layout regressions found during viewport testing
