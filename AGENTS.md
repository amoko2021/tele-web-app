# AGENTS.md - Agent Guidelines for tele-web-app

## Build & Validation Commands

- `pnpm install`     - Install dependencies
- `pnpm run dev`     - Start development server (Vite + HMR)
- `pnpm run build`   - Build production bundle to `dist/`
- `pnpm run lint`    - Run ESLint validation
- `pnpm run preview` - Preview production build locally

**Testing Note**: 
- No test framework (Vitest/Jest) is currently configured.
- **Do not** attempt to run tests.
- If implementing tests, use Vitest compatible with Vite.
- For manual validation, ensure the app loads in Telegram WebApp context or mock it.

## Code Style Guidelines

### Tech Stack
- **Framework**: React 19.2.0 + Vite 7.2.4
- **Language**: JavaScript (ESModules)
- **Routing**: react-router-dom 7.11.0
- **State**: React Hooks (`useState`, `useContext`) + Custom Hooks
- **Styling**: **CSS Modules** (`*.module.css`) + Global CSS. **NO Tailwind**.
- **HTTP**: Axios with interceptors
- **Platform**: Telegram Mini App (TMA) specific features

### File Structure
```
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
├── services/           # External integration
│   ├── api/            # API endpoints & config
│   ├── telegram/       # TMA integration
│   └── logger.js       # Centralized logging service
├── styles/             # Global variables & themes
└── utils/              # Helpers & constants
```

### Component Conventions
- **Exports**: Use named exports: `export const MyComponent = () => {}`
- **Naming**: PascalCase for components (`UserProfile.jsx`), camelCase for helpers (`formatDate.js`).
- **Barrels**: Always use `index.js` for clean imports from directories.
- **Functional**: All components must be functional components with Hooks.
- **Props**: Destructure props immediately in function signature.
- **Booleans**: Prefix boolean props with `is`, `has`, or `should` (e.g., `isLoading`, `hasError`).

### Import Strategy
**Order**:
1. React core (`useState`, `useEffect`)
2. Third-party libs (`react-router-dom`, `axios`)
3. Internal Core (`@/services`, `../utils`)
4. Components (`../components/common/Button`)
5. Styles (`./Component.module.css`)

**Example**:
```javascript
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logger } from '../../services/logger'
import { Button } from '../../components/common/Button'
import styles from './styles.module.css'
```

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
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.getData()
        setData(result)
      } catch (err) {
        logger.apiError(null, err) // Pass request context if available
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
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

### Telegram Integration
- **Global Object**: Access via `window.Telegram.WebApp`.
- **Validation**: Ensure `initData` exists before making auth-dependent calls.
- **Theme**: Respect Telegram theme params (`tg.themeParams`) where possible.
- **Mocking**: Use `USE_MOCK` flags or mock `window.Telegram.WebApp` for local dev outside Telegram.

### Ad Integration
- **Primary Provider**: Monetag (via `useMonetag`).
- **Fallback Provider**: Sonar Ads (via `useSonarAds`).
- **Strategy**: `useMonetag` automatically falls back to `useSonarAds` if the Monetag SDK is missing or if an ad fails to load/show.
- **Reward Logic**: Both providers trigger the same `onReward` callback and balance update logic.

### Git Workflow
- **Branches**: Use `feature/name`, `fix/issue`, `chore/task`.
- **Commits**: Follow Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`).
- **PRs**: Keep PRs small and focused on a single responsibility.

### Performance & Security
- **Memoization**: Use `useMemo` and `useCallback` for expensive calculations or stable references.
- **Secrets**: NEVER commit `.env` files or hardcode API keys.
- **Validation**: Validate all inputs, especially those from URL params or external sources.
- **Dependencies**: Audit `package.json` regularly; use `pnpm` for lockfile consistency.

### Linting & Quality
- **Strictness**: No unused variables. `console.log` is allowed for debugging but prefer `logger`.
- **Types**: Use JSDoc if complex logic requires type hinting (project is JS-only).
- **HMR**: Fast Refresh is enabled; avoid side-effects outside `useEffect`.

### Development Rules
1. **Mock Data**: Respect `USE_MOCK` flags in services for offline dev.
2. **Environment**: Use `import.meta.env.VITE_VAR_NAME` for config.
3. **Dependencies**: Use `pnpm add` (not npm/yarn).
4. **Clean Code**: Remove commented-out code before committing.

### Deployment
- **Target**: `dist/` folder via `pnpm build`.
- **Preview**: Always run `pnpm run preview` to verify production build before deploy.
- **Env**: Production uses `VITE_API_URL` from environment variables.

### Agent Behavior
- **Proactive Fixes**: If you see a logical error, fix it, but ask before large refactors.
- **Safety**: Never commit secrets or `.env` files.
- **Context**: Read `src/routes/AppRoutes.jsx` to understand navigation flow before adding pages.
- **Discovery**: Always explore related files before making changes to ensure consistency.
