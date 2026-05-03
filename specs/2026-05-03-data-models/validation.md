# Validation — Phase 2: Data Models

## Success criteria

Phase 2 is complete and ready to merge when all of the following pass:

### 1. All five types are exported from the barrel
```ts
import { Agent, Ailment, Therapy, StaffMember, Appointment, AppointmentStatus } from '@/types';
```
- This import resolves without errors in any file under `src/`

### 2. TypeScript compiles without errors
```
npx tsc --noEmit
```
- Exits with code 0
- No type errors reported

### 3. Test suite still passes
```
npm test
```
- Vitest exits with code 0
- No regressions from Phase 1

### 4. Schema matches requirements
Manually verify each type against `requirements.md`:
- `Agent` has `id`, `name`, `email`, `dateOfBirth`, `ailmentIds`, `therapyIds`
- `Ailment` has `id`, `name`, `description`
- `Therapy` has `id`, `name`, `description`, `ailmentIds`, `durationMinutes`
- `StaffMember` has `id`, `name`, `email`, `therapyIds`
- `Appointment` has `id`, `agentId`, `staffMemberId`, `therapyId`, `scheduledAt`, `status`
- `AppointmentStatus` is `'pending' | 'confirmed' | 'completed' | 'cancelled'`

## Out of scope for validation
- Runtime type checking
- Database round-trips
- Any UI rendering
