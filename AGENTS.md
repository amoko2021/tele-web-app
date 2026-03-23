# AGENTS.md - Agent Guidelines for tele-web-app

## Build, Lint & Test Commands

- **Install Dependencies**: `pnpm install`
- **Start Dev Server**: `pnpm run dev` (Vite + HMR)
- **Build Production**: `pnpm run build` (Outputs to `dist/`)
- **Preview Production**: `pnpm run preview` (Preview production build locally)
- **Lint Code**: `pnpm run lint` (Runs ESLint validation)

**Testing Note**:
- The project currently lacks a configured test suite. If tests are added, use **Vitest** (Vite-compatible).
- **Run all tests**: `pnpm test`
- **Run a single test**: `pnpm test -t "Test Name"` or `pnpm test path/to/file.test.js`
- **Run tests in watch mode**: `pnpm test:watch`
- **Run tests with coverage**: `pnpm test --coverage`

## Code Style Guidelines

### Tech Stack
- **Framework**: React 19.2.0 + Vite 7.2.4
- **Language**: JavaScript (ESModules). No TypeScript.
- **Routing**: react-router-dom 7.11.0
- **State**: React Hooks (`useState`, `useContext`) + Custom Hooks
- **Styling**: **CSS Modules** (`*.module.css`) + Global CSS. **NO Tailwind**.
- **Platform**: Telegram Mini App (TMA)

### File Structure
```text
src/
├── components/
│   ├── common/         # Shared UI (Modal, Button, ErrorBoundary)
│   └── layout/         # Layout shells (BottomNavBar)
├── pages/              # Route views
│   └── [PageName]/     # Domain-grouped features
│       ├── components/ # Page-specific sub-components
│       ├── [Page].jsx  # Main view component
│       └── index.js    # Barrel export
├── hooks/              # Shared logic (useApi, useTelegram)
├── services/           # External integration (api, telegram, logger)
├── styles/             # Global variables & themes
└── utils/              # Helpers & constants
```

### Component & Naming Conventions
- **Exports**: Use named exports: `export const MyComponent = () => {}`.
- **Naming**: `PascalCase` for components (`UserProfile.jsx`), `camelCase` for helpers/hooks (`formatDate.js`, `useApi.js`).
- **Barrels**: Always use `index.js` for clean imports from directories.
- **Functional**: All components must be functional components with Hooks.
- **Props**: Destructure props immediately in the function signature.
- **Booleans**: Prefix boolean props/variables with `is`, `has`, or `should` (e.g., `isLoading`, `hasError`).
- **UI Text**: **MANDATORY**. All user-facing text must be imported from `src/config/uiText.js`. Never hardcode strings in components.
  - Usage: `import { UI_TEXT } from '@/config/uiText'` -> `<span>{UI_TEXT.common.loading}</span>`.

### Import Strategy
**Order**:
1. React core (`useState`, `useEffect`)
2. Third-party libs (`react-router-dom`, `axios`)
3. Internal Core (`@/services`, `../utils`)
4. Components (`../components/common/Button`)
5. Styles (`./Component.module.css`)

### Formatting & Types
- **Quotes**: Use single quotes for JavaScript strings, double quotes for JSX attributes.
- **Semicolons**: Use semicolons at the end of statements.
- **Indentation**: 2 spaces for indentation.
- **Types**: Use JSDoc if complex logic requires type hinting (project is JS-only).

### Styling Guidelines
**Critical**: This project uses **CSS Modules**, not Tailwind.
- **Component Styles**: Create `[Component].module.css` next to the JSX.
- **Usage**: `import styles from './Component.module.css'` → `className={styles.container}`.
- **Global**: Use variables from `src/styles/variables.css` (e.g., `var(--primary-color)`).
- **Icons**: Material Symbols Outlined (`<span className="material-symbols-outlined">key</span>`).
- **Themes**: Respect `tg.themeParams` for native feel.

### State & Data Fetching
- **Local State**: `useState` for UI toggle/input.
- **API State**: Use the `useApi` hook or `useEffect` + `axios`.
- **Async Pattern**:
  ```javascript
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.getData();
        setData(result);
      } catch (err) {
        logger.apiError(null, err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  ```

### API Layer Pattern
- **Location**: All API logic in `src/services/api/`.
- **Client**: Use the pre-configured `apiClient` instance (handles auth/interceptors).
- **Auth**: Telegram `initData` is automatically injected into `Authorization` header (`tma <data>`).

### Error Handling & Logging
- **Logger**: Use `src/services/logger.js` instead of `console.log`.
  - `logger.info(msg, context)`: General flow events.
  - `logger.warn(msg, context)`: Non-critical issues.
  - `logger.error(msg, error, context)`: Critical failures.
  - `logger.apiError(request, error)`: API failures.
- **Boundaries**: Wrap feature roots in `ErrorBoundary` if they are critical.
- **User Feedback**: Show user-friendly toasts/alerts, do not fail silently.

### Telegram & Ad Integration
- **Global Object**: Access via `window.Telegram.WebApp`.
- **Validation**: Ensure `initData` exists before making auth-dependent calls.
- **Mocking**: Use `USE_MOCK` flags or mock `window.Telegram.WebApp` for local dev outside Telegram.
- **Ads**: Primary provider is Monetag (`useMonetag`), fallback is Sonar Ads (`useSonarAds`). Both trigger the same `onReward` callback.

### Git Workflow
- **Branches**: Use `feature/name`, `fix/issue`, `chore/task`.
- **Commits**: Follow Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`).
- **PRs**: Keep PRs small and focused on a single responsibility.

### Performance, Security & Quality
- **Memoization**: Use `useMemo` and `useCallback` for expensive calculations or stable references.
- **Secrets**: NEVER commit `.env` files or hardcode API keys. Use `import.meta.env.VITE_VAR_NAME`.
- **Validation**: Validate all inputs, especially those from URL params or external sources.
- **Linting**: No unused variables. `console.log` is allowed for debugging but prefer `logger`.

### Agent Behavior
- **Proactive Fixes**: If you see a logical error, fix it, but ask before large refactors.
- **Discovery**: Always explore related files before making changes to ensure consistency.
- **Context**: Read `src/routes/AppRoutes.jsx` to understand navigation flow before adding pages.