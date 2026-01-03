# Hướng dẫn sử dụng API

## Cấu trúc API Services

Dự án đã được cấu hình với hệ thống API có thể chuyển đổi giữa mock data và real API.

### Mock Mode (Development)

Hiện tại đang bật `USE_MOCK = true` trong các file API để sử dụng fake data cho development.

### Các API có sẵn

#### 1. Lottery API (XSMB)

```javascript
import { lotteryApi } from './services/api'

// Lấy kết quả XSMB
const result = await lotteryApi.getXSMB()

// Lấy kết quả XSMB ngẫu nhiên (demo)
const randomResult = await lotteryApi.getRandomXSMB()
```

#### 2. User API

```javascript
import { userApi } from './services/api'

// Lấy thông tin user
const userInfo = await userApi.getUserInfo()

// Cập nhật thông tin user
const updated = await userApi.updateUserInfo({ firstName: 'New Name' })
```

### Sử dụng với React Hooks

```javascript
import { useXSMB, useUserInfo } from './hooks/useApi'

function MyComponent() {
  const { data: xsmbData, loading: xsmbLoading } = useXSMB()
  const { data: userInfo, loading: userLoading } = useUserInfo()

  if (xsmbLoading || userLoading) return <Loading />

  return (
    <div>
      <h1>Kết quả XSMB: {xsmbData?.time}</h1>
      <h2>
        Xin chào: {userInfo?.firstName} {userInfo?.lastName}
      </h2>
    </div>
  )
}
```

### Chuyển sang Real API

Khi sẵn sàng sử dụng API thật, chỉ cần đổi `USE_MOCK = false` trong:

- `src/services/api/lotteryApi.js`
- `src/services/api/userApi.js`
