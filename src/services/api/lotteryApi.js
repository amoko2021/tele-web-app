import apiClient from './axios.config'
import { mockXSMBData, generateRandomXSMB } from './mockData'

// Flag để bật/tắt mock mode
const USE_MOCK = true

export const lotteryApi = {
  // Lấy kết quả xổ số miền bắc
  getXSMB: async () => {
    if (USE_MOCK) {
      // Fake API call với delay
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockXSMBData)
        }, 500)
      })
    }

    try {
      const response = await apiClient.get('/get_xsmb')
      return response
    } catch (error) {
      console.error('Error fetching XSMB:', error)
      throw error
    }
  },

  // Lấy kết quả XSMB ngẫu nhiên (cho demo)
  getRandomXSMB: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateRandomXSMB())
      }, 500)
    })
  },

  // Gửi dự đoán kết quả
  submitPrediction: async (predictionData) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'Dự đoán của bạn đã được ghi nhận!',
            prediction: predictionData,
            timestamp: new Date().toISOString(),
          })
        }, 500)
      })
    }

    try {
      const response = await apiClient.post('/prediction', predictionData)
      return response
    } catch (error) {
      console.error('Error submitting prediction:', error)
      throw error
    }
  },
}

export default lotteryApi
