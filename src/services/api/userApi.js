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
}

export default userApi
