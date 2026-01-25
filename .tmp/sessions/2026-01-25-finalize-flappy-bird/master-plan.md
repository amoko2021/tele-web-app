# Master Plan - Finalize Flappy Bird Integration

Finalize the integration of the legacy Flappy Bird game into the React application, ensuring a polished UI/UX and correct reward logic.

## Architecture
- **Host Component**: `src/pages/FlappyBird/FlappyBird.jsx` embeds the legacy game via `<iframe>`.
- **Communication**: `postMessage` bridge between the iframe and the host component.
- **Styling**: CSS Modules for layout and toast notifications.
- **Reward Logic**: 10 coins per point, max 1000 coins, persisted via `userApi.updateBalance`.

## Components
1. **FlappyBird Component**: Cleanup the corrupted `FlappyBird.jsx` file and implement the iframe host logic properly.
2. **Styling**: Update `FlappyBird.module.css` for full-screen iframe and polished reward toasts.
3. **Integration**: Ensure navigation from Home page works and the back button is functional.

## Tasks
- [ ] Fix corrupted `src/pages/FlappyBird/FlappyBird.jsx`
- [ ] Update `src/pages/FlappyBird/FlappyBird.module.css` for iframe layout
- [ ] Add reward toast animations and polished loading state
- [ ] Verify `postMessage` listener and balance update logic
- [ ] Final UI/UX check in Telegram Mini App context
