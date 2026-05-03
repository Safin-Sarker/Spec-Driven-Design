# Requirements — Phase 2: Data Models

## Scope

Define TypeScript types and interfaces for every core domain entity. These types become the shared contract used by every subsequent phase — database schema, API responses, and UI components all reference them.

### In scope
- Five domain types as TypeScript interfaces: `Agent`, `Ailment`, `Therapy`, `Appointment`, `StaffMember`
- A single barrel export file (`types/index.ts`) so consumers import from one place
- ID-based cross-references between types (e.g. `agentId: string`, not embedded objects)
- An `AppointmentStatus` union type (`'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'`)

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
| Location | `types/` (project root) | No `src/` directory in this project; `@/*` alias maps to project root |
| Date fields | `string` (ISO 8601) | JSON-safe; avoids `Date` object serialisation pitfalls across server/client boundary |
| Barrel export | `types/index.ts` | Single import path — changing internal file layout won't break consumers |
| `Agent.name` | Split into `firstName`/`lastName` | Profile pages, sorting, and salutations all need them separately |
| `ailmentIds`/`therapyIds` on `Agent` | Removed | Derived from appointments; storing them on the agent creates a redundant, denormalized list that diverges from appointment history |
| `Appointment.durationMinutes` | Added | The booked duration must be stored on the appointment — `Therapy.durationMinutes` is a template default that can change |
| `StaffMember.role` | Added | Dashboard needs to distinguish practitioner types (e.g. physiotherapist vs. receptionist) |
| `AppointmentStatus` | Includes `'no-show'` | Distinct from `'cancelled'` for billing and rebooking purposes |

## Schema

```ts
interface Agent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;       // ISO 8601
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
  durationMinutes: number;   // default duration; may be overridden per appointment
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;              // e.g. 'physiotherapist', 'receptionist'
  therapyIds: string[];      // therapies this staff member can deliver
}

type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';

interface Appointment {
  id: string;
  agentId: string;
  staffMemberId: string;
  therapyId: string;
  scheduledAt: string;       // ISO 8601
  durationMinutes: number;   // captured at booking time
  status: AppointmentStatus;
}
```

## Context

All five types are required for Phase 3 (database migrations) and Phase 4 (seed data). Getting the shape right here prevents breaking changes across those phases.

Refer to `specs/mission.md` for product context and `specs/tech-stack.md` for stack rationale.
