# AGENTS.md - Agent Guidelines for tele-web-app

## Build Commands

- `pnpm run dev` - Start development server (Vite dev server with HMR)
- `pnpm run build` - Build production bundle
- `pnpm run lint` - Run ESLint to check code quality
- `pnpm run preview` - Preview production build locally

**Note**: No test framework is currently configured. If tests are added, add test command to package.json.

## Code Style Guidelines

### Tech Stack
- **Framework**: React 19.2.0 with Vite 7.2.4
- **Routing**: react-router-dom 7.11.0
- **Styling**: Tailwind CSS (utility-first classes)
- **Icons**: Material Symbols Outlined (`<span className="material-symbols-outlined">`)
- **HTTP Client**: Axios with interceptors
- **Platform**: Telegram Mini App (using @adsgram/react for ads)

### File Structure
```
src/
├── components/
│   ├── common/         # Reusable components (Modal, Button, Loading, etc.)
│   └── layout/         # Layout components (BottomNavBar, etc.)
├── pages/              # Route pages (Home, Account, Settings, WithdrawalHistory)
│   └── [PageName]/
│       ├── components/ # Page-specific sub-components
│       └── index.js
├── hooks/              # Custom React hooks (useApi, useTelegram, useAdsgram)
├── services/
│   ├── api/            # API calls (lotteryApi, userApi, axios.config.js)
│   └── telegram/       # Telegram-related services
├── routes/             # Route configuration
├── utils/              # Helper functions and constants
└── styles/             # Global styles
```

### Component Conventions
- Use **named exports** for components: `export const ComponentName = () => {}`
- Component files named in PascalCase: `ComponentName.jsx`
- Each component directory should have `ComponentName.jsx` (implementation) and `index.js` (export barrel)
- Props destructured in function signature: `const Component = ({ prop1, prop2 }) => {}`
- Components should be functional, never class-based

### Import Style
- React hooks imported first: `import { useState, useEffect } from 'react'`
- External libraries next: `import { useNavigate } from 'react-router-dom'`
- Absolute imports from project root: `import { Modal } from './components/common/Modal'`
- Group imports by category (React hooks, external, internal)
- Keep import order: React → external libraries → internal modules

### State Management
- Use `useState` for local component state
- Use custom hooks for shared logic and data fetching (`useApi`, `useTelegram`, `useAdsgram`)
- API data fetched through hooks in `/hooks/` directory
- Async state pattern: `const [data, setData] = useState(null)` with loading/error states

### Error Handling
- Async functions wrapped in try-catch blocks
- Error state maintained: `const [error, setError] = useState(null)`
- Log errors with `console.error('Context:', error)`
- Display user-friendly error messages in UI

### Naming Conventions
- **Components**: PascalCase (`LotteryHeader`, `PredictionCard`)
- **Functions/Variables**: camelCase (`fetchXSMB`, `handleSubmitPrediction`)
- **Constants**: UPPER_SNAKE_CASE for true constants (`USE_MOCK`, `BASE_URL`)
- **Custom hooks**: `use` prefix (`useTelegram`, `useApi`, `useAdsgram`)
- **API modules**: camelCase (`lotteryApi`, `userApi`)

### API Layer
- All API calls go through `src/services/api/`
- Axios instance configured in `axios.config.js` with interceptors
- Authentication handled via Telegram `initData` in request header
- API response data returned directly (not full response object)
- Error handling with try-catch and console.error

### React Hooks
- Use `useCallback` for event handlers passed as props to prevent re-renders
- Use `useEffect` for side effects with proper dependency arrays
- Use `useRef` for values that persist across renders without triggering re-renders
- Cleanup effects (intervals, subscriptions) in return function
- Pattern: `const isMounted = useRef(true)` for async cleanup

### Styling
- Tailwind utility classes only (no separate CSS files per component)
- Common colors: `slate-*` for neutrals, `primary` for brand color
- Responsive design with mobile-first approach (Telegram Mini App)
- Classes: `className` attribute, not `class`
- Icons: `<span className="material-symbols-outlined">icon_name</span>`

### Code Patterns
- **Loading states**: Show loading component or text while fetching data
- **Null checks**: Optional chaining for nested data (`xsmbData?.results?.ĐB`)
- **Modal pattern**: `<Modal isOpen={isOpen} onClose={onClose} title="Title">{children}</Modal>`
- **Page layout**: Flexbox with `flex flex-col h-full`, `main` with `flex-1 overflow-y-auto pb-20`
- **Telegram integration**: Validate `initData` on mount, pass in Authorization header

### Component Organization
- Split large components into smaller, focused sub-components
- Each component should have a single responsibility
- Place page-specific components in `[PageName]/components/` directory
- Create index.js barrel files for cleaner imports
- Example: Settings page split into HeaderSection, ReferralLinkCard, InviteButton, etc.

### Linting Rules
- ESLint configured with React and React Hooks plugins
- No unused variables (`no-unused-vars` rule)
- React Refresh enabled for HMR
- Ignore patterns: `dist/` directory

### Performance Best Practices
- Use `useMemo` for expensive computations that shouldn't re-run on every render
- Use `React.memo()` for components that re-render unnecessarily
- Avoid inline object/array creation in JSX (create them in component body or use useMemo)
- Clean up intervals and subscriptions in useEffect return functions
- Use lazy loading for routes with `React.lazy()` if the app grows

### Testing & Debugging
- Use `console.log` sparingly; prefer browser DevTools React DevTools
- Check Network tab for API calls and response times
- Verify Telegram WebApp data in console: `console.log(window.Telegram.WebApp.initDataUnsafe)`
- Mock mode can be toggled with `USE_MOCK` flags in API service files
- For mobile testing, use Telegram WebApp's mobile view or actual Telegram app

### Development Server Configuration
- Vite server configured in `vite.config.js`
- Host set to `0.0.0.0` for remote access
- Allowed hosts: `vsc.skick.xyz`, `.vsc.skick.xyz`, `localhost`
- Port 5173 with `strictPort: false` (auto-finds alternate port if busy)

### Deployment Considerations
- Production API URL: `https://betestminiapp-production-9a0b.up.railway.app`
- Build output goes to `dist/` directory
- Preview production builds locally with `pnpm run preview` before deploying
- Ensure environment variables (if any) are properly set for production
- Vite server configured with allowed hosts for remote access

### Additional Notes
- Language: Vietnamese comments and UI text (lottery app for Vietnam)
- Timezone: Always use Asia/Ho_Chi_Minh for lottery times
- Mock data: Can toggle mock mode with `USE_MOCK` flags in API files
- Telegram WebApp available globally as `window.Telegram.WebApp`
- App is designed for mobile-first (Telegram Mini App constraints)
- Package manager: pnpm (not npm)
