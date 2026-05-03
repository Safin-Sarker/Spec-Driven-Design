# Requirements — Phase 2: Data Models

## Scope

Define TypeScript types and interfaces for every core domain entity. These types become the shared contract used by every subsequent phase — database schema, API responses, and UI components all reference them.

### In scope
- Five domain types as TypeScript interfaces: `Agent`, `Ailment`, `Therapy`, `Appointment`, `StaffMember`
- A single barrel export file (`src/types/index.ts`) so consumers import from one place
- ID-based cross-references between types (e.g. `agentId: string`, not embedded objects)
- An `AppointmentStatus` union type (`'pending' | 'confirmed' | 'completed' | 'cancelled'`)

### Out of scope
- Zod or any other runtime validation (Phase 3+)
- Database schema or migrations (Phase 3)
- API route handlers or data fetching
- UI components

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Pure TS interfaces | Yes | Phase 2 is types only; runtime validation added later when the DB is wired up |
| Cross-references | By ID (`string`) | Keeps types flat and serialization-safe; avoids circular reference issues |
| Location | `src/types/` | Standard Next.js convention; clearly separated from components and lib code |
| Date fields | `string` (ISO 8601) | JSON-safe; avoids `Date` object serialisation pitfalls across server/client boundary |
| Barrel export | `src/types/index.ts` | Single import path — changing internal file layout won't break consumers |

## Proposed schema

```ts
interface Agent {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;       // ISO 8601
  ailmentIds: string[];
  therapyIds: string[];
}

interface Ailment {
  id: string;
  name: string;
  description: string;
}

interface Therapy {
  id: string;
  name: string;
  description: string;
  ailmentIds: string[];      // ailments this therapy addresses
  durationMinutes: number;
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  therapyIds: string[];      // therapies this staff member can deliver
}

type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

interface Appointment {
  id: string;
  agentId: string;
  staffMemberId: string;
  therapyId: string;
  scheduledAt: string;       // ISO 8601
  status: AppointmentStatus;
}
```

## Context

All five types are required for Phase 3 (database migrations) and Phase 4 (seed data). Getting the shape right here prevents breaking changes across those phases. The schema above is intentionally minimal — fields can be extended later without breaking existing consumers because TypeScript structural typing is additive.

Refer to `specs/mission.md` for product context and `specs/tech-stack.md` for stack rationale.
