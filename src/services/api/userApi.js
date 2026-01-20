import apiClient from './axios.config'
import {
  mockUserInfo,
  mockReferralFriends,
  mockWithdrawalHistory,
} from './mockData'

// Flag để bật/tắt mock mode
const USE_MOCK = false

// Cache cho danh sách bạn bè referral
let friendsCache = {
  data: null,
  timestamp: null,
  userId: null,
}

// Kiểm tra cache còn hợp lệ không (5 phút)
const isFriendsCacheValid = (userId) => {
  if (
    !friendsCache.data ||
    !friendsCache.timestamp ||
    friendsCache.userId !== userId
  ) {
    return false
  }

  const cacheTime = new Date(friendsCache.timestamp)
  const now = new Date()
  const diffMinutes = (now - cacheTime) / 1000 / 60

  // Cache hết hạn sau 5 phút
  return diffMinutes < 5
}

export const userApi = {
  // Lấy thông tin user
  getUserInfo: async (userId) => {
    if (USE_MOCK) {
      // Fake API call với delay
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockUserInfo)
        }, 500)
      })
    }

    try {
      const response = await apiClient.get(`/userInfo/${userId}`)
      return response
    } catch (error) {
      console.error('Error fetching user info:', error)
      // Fallback về mock data nếu API lỗi
      console.warn('Falling back to mock data')
      return mockUserInfo
    }
  },

  // Cập nhật thông tin user
  updateUserInfo: async (userId, data) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ...mockUserInfo, ...data })
        }, 500)
      })
    }

    try {
      const response = await apiClient.put(`/userInfo/${userId}`, data)
      return response
    } catch (error) {
      console.error('Error updating user info:', error)
      throw error
    }
  },

  // Cập nhật số dư (sau khi rút tiền, nạp tiền)
  updateBalance: async (userId, amount) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            message: 'Balance updated successfully',
            data: {
              user_id: userId,
              balance: amount,
            },
          })
        }, 500)
      })
    }

    try {
      const response = await apiClient.put(`/balance/${userId}`, { amount })
      return response
    } catch (error) {
      console.error('Error updating balance:', error)
      throw error
    }
  },

  updateLanguage: async (userId, language) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            message: 'Language updated successfully',
            data: {
              user_id: userId,
            },
          })
        }, 300)
      })
    }

    try {
      const response = await apiClient.put(`/language/${userId}`, { language })
      return response
    } catch (error) {
      console.error('Error updating language:', error)
      throw error
    }
  },

  // Lấy thông tin tài khoản ngân hàng
  getBankAccount: async (userId) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!userId) {
            resolve(null)
            return
          }
          const key = `bank_account_${userId}`
          const saved = localStorage.getItem(key)
          resolve(saved ? JSON.parse(saved) : null)
        }, 300)
      })
    }

    try {
      const response = await apiClient.get(`/bank-account/${userId}`)
      return response
    } catch (error) {
      console.error('Error fetching bank account:', error)
      throw error
    }
  },

  // Cập nhật thông tin tài khoản ngân hàng
  updateBankAccount: async (userId, data) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!userId) {
            resolve({ success: false, message: 'User ID không hợp lệ' })
            return
          }
          const key = `bank_account_${userId}`
          const bankData = {
            ...data,
            userId,
            updatedAt: new Date().toISOString(),
          }
          localStorage.setItem(key, JSON.stringify(bankData))
          resolve({
            success: true,
            message: 'Cập nhật thông tin ngân hàng thành công!',
            data: bankData,
          })
        }, 500)
      })
    }

    try {
      const response = await apiClient.put(`/bank-account/${userId}`, data)
      return response
    } catch (error) {
      console.error('Error updating bank account:', error)
      throw error
    }
  },

  // Lấy danh sách bạn bè referral
  getReferralFriends: async (userId) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockReferralFriends)
        }, 800)
      })
    }

    // Kiểm tra cache còn hợp lệ không
    if (isFriendsCacheValid(userId)) {
      console.log('Sử dụng dữ liệu friends từ cache')
      return friendsCache.data
    }

    try {
      console.log('Lấy dữ liệu friends mới từ API')
      const response = await apiClient.get(`/invites/${userId}`)

      // Lưu vào cache
      friendsCache = {
        data: response,
        timestamp: new Date().toISOString(),
        userId: userId,
      }

      return response
    } catch (error) {
      console.error('Error fetching referral friends:', error)

      // Nếu lỗi và có cache cũ, trả về cache
      if (friendsCache.data && friendsCache.userId === userId) {
        console.log('Lỗi API - Sử dụng dữ liệu cache')
        return friendsCache.data
      }

      throw error
    }
  },

  // Lấy lịch sử rút tiền
  getWithdrawalHistory: async (userId) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockWithdrawalHistory)
        }, 500)
      })
    }

    try {
      const response = await apiClient.get(`/withdraw-history/${userId}`)
      return response
    } catch (error) {
      console.error('Error fetching withdrawal history:', error)
      throw error
    }
  },

  // Tạo yêu cầu rút tiền
  requestWithdrawal: async (userId, data) => {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Kiểm tra số tiền
          if (!data.amount || data.amount < 50000) {
            reject({
              message: 'Số tiền rút tối thiểu là 50.000 đ',
            })
            return
          }

          // Fake validation
          if (!data.bankAccount) {
            reject({
              message: 'Vui lòng thêm tài khoản ngân hàng trước!',
            })
            return
          }

          // Fake success
          resolve({
            success: true,
            message:
              'Yêu cầu rút tiền đã được gửi! Giao dịch sẽ được xử lý trong 5-15 phút.',
            data: {
              id: Date.now(),
              amount: data.amount,
              bankAccount: data.bankAccount,
              status: 'pending',
              createdAt: new Date().toISOString(),
            },
          })
        }, 800)
      })
    }

    try {
      const response = await apiClient.post('/withdraw-request', {
        userId: userId,
        amount: data.amount,
        bank_account: data.bankAccount,
      })
      return response
    } catch (error) {
      console.error('Error requesting withdrawal:', error)
      throw error
    }
  },

  // Trừ ticket khi dự đoán
  deductTicket: async (userId) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            message: 'Ticket deducted successfully',
          })
        }, 500)
      })
    }

    try {
      const response = await apiClient.post(`/ticket/add/${userId}`, {
        ticket: 0,
      })
      return response
    } catch (error) {
      console.error('Error deducting ticket:', error)
      throw error
    }
  },
}

export default userApi
