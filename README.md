# Telegram XSMB Mini App

Ứng dụng Mini App trên Telegram cho Xổ số Miền Bắc với tính năng dự đoán kết quả và hệ thống giới thiệu bạn bè.

## 🚀 Tính năng

- 📊 **Kết quả XSMB trực tiếp** - Xem kết quả xổ số miền Bắc mỗi ngày
- 🔮 **Dự đoán kết quả** - Đăng ký dự đoán giải đặc biệt và lô tô
- 👥 **Hệ thống giới thiệu** - Mời bạn bè nhận thưởng
- 💰 **Tích điểm** - Nhận điểm thưởng khi giới thiệu bạn bè thành công
- 📱 **Telegram Integration** - Tối ưu hóa cho Telegram Mini App
- 🎨 **UI/UX hiện đại** - Giao diện đẹp, thân thiện trên mobile

## 🛠️ Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM 7.11.0
- **HTTP Client**: Axios
- **Icons**: Material Symbols Outlined, Lucide React
- **Ads**: @adsgram/react

## 📦 Cài đặt

```bash
# Clone repository
git clone <repository-url>
cd tele-web-app

# Cài đặt dependencies
pnpm install

# Chạy development server
pnpm run dev
```

## 🏃 Scripts

```bash
pnpm run dev        # Khởi động dev server
pnpm run build      # Build production bundle
pnpm run preview    # Preview production build
pnpm run lint       # Chạy ESLint check
```

## 📁 Cấu trúc dự án

```
src/
├── components/
│   ├── common/         # Components dùng chung
│   └── layout/         # Components layout (BottomNavBar, etc.)
├── pages/              # Trang ứng dụng
│   ├── Home/          # Trang chủ - Kết quả XSMB
│   ├── Account/       # Tài khoản, rút tiền
│   ├── Settings/      # Cài đặt, giới thiệu bạn bè
│   └── WithdrawalHistory/ # Lịch sử rút tiền
├── hooks/              # Custom React hooks
│   ├── useApi.js      # Hook cho API calls
│   ├── useTelegram.js # Hook cho Telegram WebApp
│   └── useAdsgram.js  # Hook cho quảng cáo
├── services/
│   ├── api/           # API services
│   │   ├── lotteryApi.js
│   │   ├── userApi.js
│   │   └── axios.config.js
│   └── telegram/      # Telegram services
├── routes/             # Route configuration
└── utils/              # Helper functions
```

## 🔧 Cấu hình

### Vite Server

`vite.config.js` đã được cấu hình để hỗ trợ:
- Host: `0.0.0.0` (cho phép truy cập từ mạng ngoài)
- Allowed hosts: `vsc.skick.xyz`, `.vsc.skick.xyz`, `localhost`
- Port: 5173 (hoặc tự động tìm port khác nếu bận)

### Environment Variables

API URL đã được cấu hình sẵn trong `src/services/api/axios.config.js`:
```
BASE_URL: https://betestminiapp-production-9a0b.up.railway.app
```

## 📱 Telegram Integration

Ứng dụng sử dụng Telegram WebApp SDK:
- Authentication qua `initData`
- Xác thực người dùng qua backend
- Haptic Feedback cho các tương tác
- Mở link, chia sẻ qua Telegram

## 🎯 Mock Data Mode

Để test UI với mock data, enable trong file API:
```javascript
// src/services/api/lotteryApi.js
const USE_MOCK = true
```

## 🔐 Authentication

- Xác thực qua Telegram `initData`
- Token được gửi trong header: `Authorization: tma {initData}`
- Validated tại backend endpoint

## 📄 License

Private

## 👨‍💻 Development

Xem [AGENTS.md](./AGENTS.md) để biết guidelines về code style và conventions cho phát triển.
