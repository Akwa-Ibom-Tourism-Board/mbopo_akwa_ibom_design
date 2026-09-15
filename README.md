# Mbopo Akwa Ibom

The official cultural pageant and tourism-ambassador platform for Akwa Ibom State — "Beauty with Purpose."

## Stack

- React + TypeScript, built with Vite
- `react-router-dom` for client-side routing
- `styled-components` for theming (light/dark mode)
- `@tanstack/react-query` for async state
- `react-hook-form` + `zod` for form validation
- Radix UI primitives, wrapped in `src/shared/ui/`

The codebase follows a feature-based architecture: each feature under `src/features/` owns its own `pages/`, `components/`, `api/`, and `types/`. Every feature exposes its public surface through an `index.ts` barrel; cross-feature imports go through that barrel rather than reaching into internals.

Backend integration (NIN lookup, OTP email, auth, dashboard, application submission) is currently mocked — see each feature's `api/mock.ts` and `src/lib/http.ts` for how a real backend would be wired in later.

## Development

```sh
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
- `npm run format` — run Prettier
