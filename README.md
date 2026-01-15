# Telegram XSMB Mini App

Telegram Mini App for Northern Vietnam Lottery (XSMB) featuring live results, predictions, and a referral system.

## 🚀 Features

- 📊 **Live XSMB Results** - View daily Northern Lottery results
- 🔮 **Predictions** - Submit predictions for Special Prize and Loto
- 👥 **Referral System** - Invite friends and earn rewards
- 💰 **Points & Rewards** - Accumulate points for successful referrals
- 📱 **Telegram Integration** - Optimized for Telegram Mini App (TMA) experience
- 🎨 **Modern UI/UX** - Responsive design with native feel

## 🛠️ Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Package Manager**: pnpm
- **Styling**: CSS Modules (`*.module.css`) + Global CSS Variables
- **Routing**: React Router DOM 7.11.0
- **HTTP Client**: Axios
- **Icons**: Material Symbols Outlined, Lucide React
- **Ads**: @adsgram/react

## 📦 Installation

```bash
# Clone repository
git clone <repository-url>
cd tele-web-app

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

## 🏃 Scripts

```bash
pnpm run dev        # Start dev server
pnpm run build      # Build production bundle
pnpm run preview    # Preview production build
pnpm run lint       # Run ESLint validation
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/         # Shared components (Modal, Button, etc.)
│   └── layout/         # Layout components (BottomNavBar)
├── pages/              # Application pages
│   ├── Home/           # Homepage - Lottery Results
│   ├── Account/        # User profile & withdrawal
│   ├── Settings/       # Settings & Referrals
│   └── WithdrawalHistory/ # Transaction history
├── hooks/              # Custom React hooks
│   ├── useApi.js       # API interaction hook
│   ├── useTelegram.js  # Telegram WebApp hook
│   └── useAdsgram.js   # Ads integration hook
├── services/
│   ├── api/            # API services & config
│   └── telegram/       # Telegram integration services
├── routes/             # Route configuration
└── utils/              # Helper functions
```

## 🔧 Configuration

### Vite Server
`vite.config.js` is configured to support:
- Host: `0.0.0.0` (external access allowed)
- Allowed hosts: `vsc.skick.xyz`, `.vsc.skick.xyz`, `localhost`
- Port: 5173 (auto-fallback if busy)

### Environment Variables
API URL is configured in `src/services/api/axios.config.js`:
```
BASE_URL: https://betestminiapp-production-9a0b.up.railway.app
```

## 📱 Telegram Integration

The app leverages the Telegram WebApp SDK for:
- **Authentication**: Validating users via `initData`
- **Security**: Backend validation of Telegram signatures
- **UX**: Haptic feedback, native theme params, and main button integration

## 🔐 Authentication

- Authentication is handled via Telegram `initData`.
- Token is sent in the Authorization header: `Authorization: tma {initData}`.
- Requests are validated at the backend endpoint.

## 👨‍💻 Development Guidelines

For detailed coding standards, conventions, and agent workflows, please refer to **[AGENTS.md](./AGENTS.md)**.

## 📄 License

Private
