# Roadmap

Each phase is a single, shippable deliverable. Phases are intentionally small.

## Phase 1 — Project Bootstrap ✅
Scaffold a Next.js + TypeScript project. Confirm dev server runs and basic routing works.

## Phase 2 — Data Models ✅
Define TypeScript types and interfaces for: `Agent`, `Ailment`, `Therapy`, `Appointment`, `StaffMember`.

## Phase 3 — Database Setup ✅
Configure a database and run initial migrations to create tables matching the data models.

## Phase 4 — Seed Data ✅
Populate the database with sample agents, ailments, therapies, and staff for development use.

## Phase 5 — Agent Profile Page ✅
Build a page that displays a single agent's profile, ailments, and current therapies.

## Phase 6 — Ailment & Therapy Listings ✅
Build browsable list pages for ailments and available therapies.

## Phase 7 — Appointment Booking ✅
Add a form that lets an agent book an appointment with a staff member for a chosen therapy.

## Phase 8 — Staff Dashboard ✅
Build a staff-facing dashboard showing upcoming appointments and patient (agent) summaries.

## Phase 9 — Agent Dashboard ✅
Build an agent-facing dashboard showing their appointments, therapies, and wellness history.

## Phase 10 — Styling & Polish ✅
Apply a consistent, responsive visual design that is attractive and works well across desktop, tablet, and mobile screen sizes.

## Phase 11 — UI Component Library
Extract common UI patterns (card, button, badge, form inputs) into a shared component set with consistent design tokens. Replace ad-hoc CSS Module usage with the component library.

## Phase 12 — Authentication: staff login
Add session-based authentication for staff members. Staff must log in before accessing their dashboard. Protect all `/staff/*` routes.

## Phase 13 — Authentication: agent login
Add authentication for agents. Agents must log in before viewing their profile or dashboard. Protect all `/agents/*` routes.

## Phase 14 — Role-based access control
Enforce that agents cannot access staff pages and vice versa. Add a `role` field to sessions and gate pages accordingly.
