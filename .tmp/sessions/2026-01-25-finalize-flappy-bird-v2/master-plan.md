# Master Plan - Finalize Flappy Bird Integration (V2)

Finalize the integration of the legacy Flappy Bird game, focusing on state synchronization (balance refresh) and ad fallback validation.

## Architecture
- **Host Component**: `src/pages/FlappyBird/FlappyBird.jsx`
- **Communication**: `postMessage` bridge.
- **State Management**: Using `useUserInfo` hook for balance, but need a way to trigger refresh app-wide or locally.
- **Ads**: Dual-provider fallback logic in `public/floppybird/js/main.js`.

## Components
1. **FlappyBird Component**:
   - Update `submitReward` to refresh user data locally.
   - Polished UI for mobile centering.
2. **Iframe Game**:
   - Ensure `showAdsWithFallback` handles all edge cases.

## Tasks
- [ ] Implement balance refresh in `FlappyBird.jsx` after reward submission.
- [ ] Center `loadingOverlay` and `rewardToast` in `FlappyBird.module.css`.
- [ ] Verify/Enhance `showAdsWithFallback` in `public/floppybird/js/main.js` to handle Monetag promise rejection properly.
- [ ] Final validation of the reward flow.
