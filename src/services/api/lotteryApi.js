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
          // Lưu vào localStorage để track
          const predictions = JSON.parse(
            localStorage.getItem('predictions') || '[]'
          )
          const newPrediction = {
            id: Date.now(),
            ...predictionData,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('vi-VN'),
          }
          predictions.push(newPrediction)
          localStorage.setItem('predictions', JSON.stringify(predictions))

          resolve({
            success: true,
            message: 'Dự đoán của bạn đã được ghi nhận!',
            prediction: newPrediction,
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

  // Kiểm tra đã dự đoán hôm nay chưa
  checkTodayPrediction: async () => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const predictions = JSON.parse(
            localStorage.getItem('predictions') || '[]'
          )
          const today = new Date().toLocaleDateString('vi-VN')
          const todayPredictions = predictions.filter((p) => p.date === today)

          resolve({
            hasPredicted: todayPredictions.length > 0,
            predictions: todayPredictions,
          })
        }, 300)
      })
    }

    try {
      const response = await apiClient.get('/prediction/today')
      return response
    } catch (error) {
      console.error('Error checking today prediction:', error)
      throw error
    }
  },

  // Lấy lịch sử dự đoán hôm nay
  getTodayPredictions: async () => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const predictions = JSON.parse(
            localStorage.getItem('predictions') || '[]'
          )
          const today = new Date().toLocaleDateString('vi-VN')
          const todayPredictions = predictions.filter((p) => p.date === today)

          resolve(todayPredictions)
        }, 300)
      })
    }

    try {
      const response = await apiClient.get('/predictions/today')
      return response
    } catch (error) {
      console.error('Error fetching today predictions:', error)
      throw error
    }
  },
}

export default lotteryApi
