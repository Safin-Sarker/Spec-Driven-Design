# Plan — Phase 2: Data Models

## Task Group 1 — Create the types directory
1. Create `types/` directory at the project root

## Task Group 2 — Define domain interfaces
1. Create `types/agent.ts` — export `Agent` interface
2. Create `types/ailment.ts` — export `Ailment` interface
3. Create `types/therapy.ts` — export `Therapy` interface
4. Create `types/staff-member.ts` — export `StaffMember` interface
5. Create `types/appointment.ts` — export `AppointmentStatus` type and `Appointment` interface

## Task Group 3 — Barrel export
1. Create `types/index.ts` — re-export all types from a single entry point

## Task Group 4 — Configure path alias
1. Add `"paths": { "@/*": ["./*"] }` to `tsconfig.json` so `@/types` resolves correctly

## Task Group 5 — Verify
1. Run `npx tsc --noEmit` and confirm zero type errors
2. Run `npm test` and confirm the test suite still passes
