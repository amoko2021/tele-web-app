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
  getBankAccount: async () => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const saved = localStorage.getItem('bank_account')
          resolve(saved ? JSON.parse(saved) : null)
        }, 300)
      })
    }

    try {
      const response = await apiClient.get('/bank-account')
      return response
    } catch (error) {
      console.error('Error fetching bank account:', error)
      throw error
    }
  },

  // Cập nhật thông tin tài khoản ngân hàng
  updateBankAccount: async (data) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          localStorage.setItem('bank_account', JSON.stringify(data))
          resolve({
            success: true,
            message: 'Cập nhật thông tin ngân hàng thành công!',
            data,
          })
        }, 500)
      })
    }

    try {
      const response = await apiClient.post('/bank-account', data)
      return response
    } catch (error) {
      console.error('Error updating bank account:', error)
      throw error
    }
  },
}

export default userApi
