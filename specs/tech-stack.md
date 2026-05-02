# Tech Stack

## Language

TypeScript — used end-to-end on the server side for type safety and a consistent developer experience.

## Recommended Framework

**Next.js** — the most popular server-side TypeScript framework. Chosen because:

- Built-in server-side rendering and API routes in one project
- Excellent TypeScript support out of the box
- Strong ecosystem and hiring pool (satisfies Mary's "popular stack" requirement)
- React-based UI layer works well in modern browsers (satisfies Steve's requirement)
- File-based routing makes dashboards straightforward to build

## Database

**SQLite** — lightweight, file-based relational database. No separate server process required, making it ideal for development and simple deployments.

## Testing

**Vitest** — used for spec validation and unit tests. Chosen because:

- Native TypeScript support with no extra configuration
- Compatible with the Vite/Next.js ecosystem
- Fast watch mode suitable for test-driven spec validation
- Run with `npm test`

## Responsive Design

All UI must be mobile-first and work correctly across desktop, tablet, and mobile viewports. Approach:

- Mobile-first CSS: base styles target small screens; media queries add layout for larger breakpoints
- Standard breakpoints: `768px` (tablet), `1024px` (desktop)
- No fixed pixel widths on page-level containers — use `max-width` with fluid padding instead

## Rendering Strategy

Server-side rendering (SSR) and static generation where appropriate, with client components for interactive dashboard elements.
