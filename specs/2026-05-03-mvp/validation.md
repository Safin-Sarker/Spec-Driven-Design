# Validation — MVP (Phases 3–10)

Each phase passes when every criterion below is met. The MVP as a whole passes when all phases pass.

## Phase 3 — Database Setup

- `npm run db:migrate` runs without error on a clean checkout
- `agentclinic.db` is created and contains tables: `agents`, `ailments`, `therapies`, `staff_members`, `appointments`
- Column names and types in each table match the Phase 2 type definitions in `types/index.ts`
- Running `npm run db:migrate` a second time does not error (idempotent via `CREATE TABLE IF NOT EXISTS`)

## Phase 4 — Seed Data

- `npm run db:seed` runs without error
- After seeding, each table contains at least the expected minimum row counts: 1 agent, 2 staff, 3 ailments, 3 therapies, 2 appointments
- Running `npm run db:seed` twice produces the same row counts (idempotent — clears and re-inserts)
- Appointments reference valid `agentId`, `staffMemberId`, and `therapyId` values from the seeded rows

## Phase 5 — Agent Profile Page

- Navigating to `/agents/[seeded-id]` renders the agent's name, email, phone, and date of birth
- Ailments and therapies derived from the agent's appointments are listed
- Navigating to `/agents/[nonexistent-id]` returns a 404 response
- Page renders correctly at 375 px, 768 px, and 1280 px viewports with no overflow or clipped content

## Phase 6 — Ailment & Therapy Listings

- `/ailments` lists all seeded ailments with name and description
- `/therapies` lists all seeded therapies with name, duration, and the ailments each addresses
- Both pages are reachable via the navigation header
- Both pages render correctly at 375 px, 768 px, and 1280 px viewports

## Phase 7 — Appointment Booking

- Navigating to `/appointments/new` displays the booking form
- The staff member dropdown updates to show only members qualified for the selected therapy
- Submitting a valid form inserts a new `Appointment` row with status `pending` and redirects to the agent dashboard
- Submitting an incomplete form shows inline validation errors and does not insert a row
- The new appointment appears on the agent dashboard after successful submission

## Phase 8 — Staff Dashboard

- Navigating to `/staff/[seeded-id]` displays the staff member's name and role
- Upcoming appointments are listed in chronological order with agent name, therapy name, date/time, and status
- Past or cancelled appointments are not shown
- Navigating to `/staff/[nonexistent-id]` returns a 404 response
- Page renders correctly at 375 px, 768 px, and 1280 px viewports

## Phase 9 — Agent Dashboard

- Navigating to `/agents/[seeded-id]/dashboard` displays three sections: Upcoming, In Progress, and History
- Each section is populated correctly from the seeded and any newly booked appointments
- Empty sections display a friendly empty-state message rather than a blank area
- Navigating to `/agents/[nonexistent-id]/dashboard` returns a 404 response
- Page renders correctly at 375 px, 768 px, and 1280 px viewports

## Phase 10 — Styling & Polish

- No page has a fixed-pixel container at the page level; all use `max-width` with fluid padding
- All pages use a consistent heading scale, body font, and colour palette
- Navigation header is present and styled on every page
- All forms, buttons, cards, and tables share a consistent visual style
- No horizontal scrollbar appears at 375 px viewport width on any page
- A non-technical stakeholder can navigate from the home page to a complete booking without instruction

## Full MVP pass criteria

- `npm run db:migrate && npm run db:seed` succeeds on a clean clone
- `npm run dev` starts without errors
- `npm test` passes with no failures
- All pages above load with real data from the SQLite database (no hard-coded HTML content)
- No TypeScript compiler errors (`tsc --noEmit` exits 0)
