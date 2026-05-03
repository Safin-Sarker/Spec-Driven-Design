# Plan — Phase 2: Data Models

## Task Group 1 — Create the types directory
1. Create `src/types/` directory

## Task Group 2 — Define domain interfaces
1. Create `src/types/agent.ts` — export `Agent` interface
2. Create `src/types/ailment.ts` — export `Ailment` interface
3. Create `src/types/therapy.ts` — export `Therapy` interface
4. Create `src/types/staff-member.ts` — export `StaffMember` interface
5. Create `src/types/appointment.ts` — export `AppointmentStatus` type and `Appointment` interface

## Task Group 3 — Barrel export
1. Create `src/types/index.ts` — re-export all types from a single entry point

## Task Group 4 — Verify
1. Run `npx tsc --noEmit` and confirm zero type errors
2. Run `npm test` and confirm the test suite still passes
