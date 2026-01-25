# Master Plan - Enable Flappy Bird Game

Enable the Flappy Bird game by adding a navigation button on the Home page and ensuring the game correctly rewards users with coins.

## Architecture
- **Navigation**: `react-router-dom` is already configured for `/flappy-bird`.
- **UI**: Add a `TaskButton` to `src/pages/Home/Home.jsx`.
- **Game Logic**: `src/pages/FlappyBird/FlappyBird.jsx` contains the game logic.
- **Reward System**: Use `userApi.updateBalance` to award coins based on score.

## Components
1. **Home Page Button**: Add the Flappy Bird play button to the Home page.
2. **Game Reward Integration**: Verify and fix the `submitReward` function in `FlappyBird.jsx` to correctly update the user's balance.

## Dependency Order
1. Home Page Button (UI entry point)
2. Game Reward Integration (Core logic)

## Tasks
- [ ] Add Flappy Bird button to `Home.jsx`
- [ ] Update `FlappyBird.jsx` to correctly call `userApi.updateBalance` with the earned coins
- [ ] Verify the implementation
