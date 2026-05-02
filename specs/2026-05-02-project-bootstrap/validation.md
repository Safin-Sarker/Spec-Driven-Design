# Validation — Phase 1: Project Bootstrap

## Success criteria

Phase 1 is complete and ready to merge when all of the following pass:

### 1. Dev server starts cleanly
```
npm run dev
```
- Exits with no errors or warnings in the terminal
- Reports listening on `http://localhost:3000`

### 2. Home page renders in the browser
- Navigating to `http://localhost:3000` returns a 200 response
- The page renders visible content (placeholder text is fine)
- Browser console shows no errors

### 3. TypeScript compiles without errors
```
npx tsc --noEmit
```
- Exits with code 0
- No type errors reported

### 4. Test suite runs without errors
```
npm test
```
- Vitest starts and exits with code 0
- No test failures (no tests yet is acceptable for this phase)

## Out of scope for validation
- `next build` passing (that's a nice-to-have; dev server is the gate for this phase)
- Visual design or content quality
- Any feature behaviour — this phase has none
