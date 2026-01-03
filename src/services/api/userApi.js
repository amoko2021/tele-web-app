import apiClient from './axios.config'
import { mockUserInfo } from './mockData'

// Flag để bật/tắt mock mode
const USE_MOCK = true

export const userApi = {
  // Lấy thông tin user
  getUserInfo: async () => {
    if (USE_MOCK) {
      // Fake API call với delay
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockUserInfo)
        }, 500)
      })
    }

    try {
      const response = await apiClient.get('/userInfo')
      return response
    } catch (error) {
      console.error('Error fetching user info:', error)
      throw error
    }
  },

  // Cập nhật thông tin user
  updateUserInfo: async (data) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ...mockUserInfo, ...data })
        }, 500)
      })
    }

    try {
      const response = await apiClient.put('/userInfo', data)
      return response
    } catch (error) {
      console.error('Error updating user info:', error)
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
      const response = await apiClient.post(`/bank-account/${userId}`, data)
      return response
    } catch (error) {
      console.error('Error updating bank account:', error)
      throw error
    }
  },
}

export default userApi
