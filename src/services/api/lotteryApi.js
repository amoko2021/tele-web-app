import axios from 'axios'
import apiClient from './axios.config'
import { generateRandomXSMB } from './mockData'

// API URL cho bên thứ 3 cung cấp kết quả XSMB
const XSMB_API_URL = import.meta.env.VITE_LOTTERY_API_URL || 'https://api-xsmb-today.onrender.com/api/v1'

// Flag để bật/tắt mock mode
const USE_MOCK = false

// Cache cho kết quả XSMB
let xsmbCache = {
  data: null,
  timestamp: null,
}

// Kiểm tra xem có đang trong thời gian quay thưởng không (18h-18h30)
const isDrawingTime = () => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()

  // Từ 18h đến 18h30
  return hours === 18 && minutes >= 0 && minutes < 30
}

// Kiểm tra cache còn hợp lệ không (cùng ngày)
const isCacheValid = () => {
  if (!xsmbCache.data || !xsmbCache.timestamp) {
    return false
  }

  const cacheDate = new Date(xsmbCache.timestamp)
  const now = new Date()

  // So sánh ngày
  return (
    cacheDate.getDate() === now.getDate() &&
    cacheDate.getMonth() === now.getMonth() &&
    cacheDate.getFullYear() === now.getFullYear()
  )
}

export const lotteryApi = {
  // Lấy kết quả xổ số miền bắc từ API bên thứ 3
  getXSMB: async () => {
    // if (USE_MOCK) {
    //   // Fake API call với delay
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve(mockXSMBData)
    //     }, 500)
    //   })
    // }

    // Nếu đang trong giờ quay thưởng (18h-18h30), không dùng cache
    const isDrawing = isDrawingTime()

    // Nếu có cache hợp lệ và không trong giờ quay thưởng, trả về cache
    if (!isDrawing && isCacheValid()) {
      console.log('Sử dụng dữ liệu XSMB từ cache')
      return xsmbCache.data
    }

    try {
      console.log(
        isDrawing
          ? 'Đang trong giờ quay thưởng - Lấy dữ liệu mới'
          : 'Lấy dữ liệu XSMB mới từ API'
      )
      const response = await axios.get(XSMB_API_URL)

      // Lưu vào cache nếu không trong giờ quay thưởng
      if (!isDrawing) {
        xsmbCache = {
          data: response.data,
          timestamp: new Date().toISOString(),
        }
      }

      return response.data
    } catch (error) {
      console.error('Error fetching XSMB:', error)

      // Nếu lỗi và có cache cũ, trả về cache
      if (xsmbCache.data) {
        console.log('Lỗi API - Sử dụng dữ liệu cache')
        return xsmbCache.data
      }

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
  submitPrediction: async (userId, predictionData) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!userId) {
            resolve({ success: false, message: 'User ID không hợp lệ' })
            return
          }

          // Lưu vào localStorage theo userId
          const key = `predictions_${userId}`
          const predictions = JSON.parse(localStorage.getItem(key) || '[]')
          const newPrediction = {
            id: Date.now(),
            userId,
            ...predictionData,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('vi-VN'),
          }
          predictions.push(newPrediction)
          localStorage.setItem(key, JSON.stringify(predictions))

          resolve({
            success: true,
            message: 'Dự đoán của bạn đã được ghi nhận!',
            prediction: newPrediction,
          })
        }, 500)
      })
    }

    try {
      // Gọi endpoint khác nhau tùy theo loại giải
      if (predictionData.prizeType === 'loto') {
        // Endpoint lô tô yêu cầu guessNumber (1 số duy nhất)
        const response = await apiClient.post('/prediction-loto', {
          userId: userId,
          guessNumber: predictionData.number, // String, 1 số duy nhất
        })
        return response.data
      } else {
        // Endpoint giải ĐB yêu cầu guessNumber (string)
        const response = await apiClient.post('/prediction', {
          userId: userId,
          guessNumber: predictionData.number,
        })
        return response.data
      }
    } catch (error) {
      console.error('Error submitting prediction:', error)
      throw error
    }
  },

  // Kiểm tra đã dự đoán hôm nay chưa
  checkTodayPrediction: async (userId) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!userId) {
            resolve({
              hasPredicted: false,
              predictions: [],
              maxPredictions: 2,
              remainingPredictions: 2,
            })
            return
          }

          const key = `predictions_${userId}`
          const predictions = JSON.parse(localStorage.getItem(key) || '[]')
          const today = new Date().toLocaleDateString('vi-VN')
          const todayPredictions = predictions.filter((p) => p.date === today)

          const maxPredictions = 2
          const remainingPredictions = maxPredictions - todayPredictions.length

          resolve({
            hasPredicted: todayPredictions.length > 0,
            predictions: todayPredictions,
            maxPredictions: maxPredictions,
            remainingPredictions: Math.max(0, remainingPredictions),
          })
        }, 300)
      })
    }

    try {
      const response = await apiClient.get(`/prediction/today/${userId}`)

      // Transform backend response thành format frontend cần
      const { data } = response
      const predictions = []

      // Thêm dự đoán giải ĐB nếu có
      if (data.guess_number) {
        predictions.push({
          id: 1,
          prizeType: 'db',
          number: data.guess_number,
        })
      }

      // Thêm dự đoán lô tô nếu có
      if (data.guess_number_loto) {
        predictions.push({
          id: 2,
          prizeType: 'loto',
          number: data.guess_number_loto,
        })
      }

      const maxPredictions = 2
      const totalPredictions =
        (data.guess_number ? 1 : 0) + (data.guess_number_loto ? 1 : 0)
      const remainingPredictions = Math.max(
        0,
        maxPredictions - totalPredictions
      )

      return {
        hasPredicted: predictions.length > 0,
        predictions: predictions,
        maxPredictions: maxPredictions,
        remainingPredictions: remainingPredictions,
      }
    } catch (error) {
      console.error('Error checking today prediction:', error)
      throw error
    }
  },

  // Lấy lịch sử dự đoán hôm nay
  getTodayPredictions: async (userId) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!userId) {
            resolve([])
            return
          }

          const key = `predictions_${userId}`
          const predictions = JSON.parse(localStorage.getItem(key) || '[]')
          const today = new Date().toLocaleDateString('vi-VN')
          const todayPredictions = predictions.filter((p) => p.date === today)

          resolve(todayPredictions)
        }, 300)
      })
    }

    try {
      const response = await apiClient.get(`/predictions/today/${userId}`)
      return response
    } catch (error) {
      console.error('Error fetching today predictions:', error)
      throw error
    }
  },

  // Lấy tất cả dự đoán của user (grouped by category)
  getMyPredictions: async (using_ticket = false) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Mock data format match spec
          resolve({
            ok: true,
            data: {
              categories: [
                {
                  id: 1,
                  title: 'Giải ĐB 2 số',
                  subtitle: 'Tối đa 10 lượt dự đoán',
                  count: 2,
                  max_count: 10,
                  color: 'red',
                  icon: 'stars',
                  numbers: ['89', '23'],
                  prediction_ids: [1, 2],
                  update_time: '08:30',
                },
                {
                  id: 2,
                  title: 'Lô Tô 2 số',
                  subtitle: 'Tối đa 10 lượt dự đoán',
                  count: 0,
                  max_count: 10,
                  color: 'blue',
                  icon: 'filter_2',
                  numbers: [],
                  prediction_ids: [],
                  update_time: '--:--',
                },
                {
                  id: 3,
                  title: 'Đặc Biệt 3 số',
                  subtitle: 'Tối đa 10 lượt dự đoán',
                  count: 1,
                  max_count: 10,
                  color: 'orange',
                  icon: 'workspace_premium',
                  numbers: ['489'],
                  prediction_ids: [3],
                  update_time: '10:45',
                },
                {
                  id: 4,
                  title: 'Lô Tô 3 số',
                  subtitle: 'Tối đa 10 lượt dự đoán',
                  count: 0,
                  max_count: 10,
                  color: 'indigo',
                  icon: 'filter_3',
                  numbers: [],
                  prediction_ids: [],
                  update_time: '--:--',
                },
              ],
            },
          })
        }, 500)
      })
    }

    try {
      const response = await apiClient.get('/my-predictions', {
        params: { using_ticket },
      })
      return response
    } catch (error) {
      console.error('Error fetching my predictions:', error)
      throw error
    }
  },

  // Lấy kết quả dự đoán (sau 18h45)
  getMyPredictionResults: async (using_ticket = false) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            message: null,
            data: {
              categories: [
                {
                  id: 1,
                  title: 'Giải ĐB 2 số',
                  subtitle: 'Tối đa 10 lượt dự đoán',
                  count: 4,
                  max_count: 10,
                  color: 'red',
                  icon: 'stars',
                  numbers: ['11', '31', '19', '79'],
                  is_win: [false, false, false, false],
                  prediction_ids: [48, 96, 106, 337],
                  update_time: '14:20',
                },
                {
                  id: 2,
                  title: 'Lô Tô 2 số',
                  subtitle: 'Tối đa 10 lượt dự đoán',
                  count: 4,
                  max_count: 10,
                  color: 'blue',
                  icon: 'filter_2',
                  numbers: ['15', '16', '18', '13'],
                  is_win: [false, true, false, false],
                  prediction_ids: [98, 99, 137, 338],
                  update_time: '14:20',
                },
                {
                  id: 3,
                  title: 'Đặc Biệt 3 số',
                  subtitle: 'Tối đa 10 lượt dự đoán',
                  count: 1,
                  max_count: 10,
                  color: 'orange',
                  icon: 'workspace_premium',
                  numbers: ['333'],
                  is_win: [false],
                  prediction_ids: [34],
                  update_time: '03:40',
                },
                {
                  id: 4,
                  title: 'Lô Tô 3 số',
                  subtitle: 'Tối đa 10 lượt dự đoán',
                  count: 1,
                  max_count: 10,
                  color: 'indigo',
                  icon: 'filter_3',
                  numbers: ['159'],
                  is_win: [false],
                  prediction_ids: [35],
                  update_time: '03:41',
                },
              ],
            },
            total: null,
          })
        }, 500)
      })
    }

    try {
      const response = await apiClient.get('/my-predictions/result', {
        params: { using_ticket },
      })
      return response
    } catch (error) {
      console.error('Error fetching my prediction results:', error)
      throw error
    }
  },

  // Thêm dự đoán mới
  addPrediction: async (category, number, using_ticket = false) => {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simple validation logic for mock
          if (number === '00') {
             // Example conflict
             reject({
                response: {
                    data: {
                        ok: false,
                        error: "This prediction already exists"
                    },
                    status: 409
                }
             })
             return;
          }
          resolve({
            ok: true,
            message: 'Prediction added successfully',
            data: {
              id: Date.now(),
              number: number,
              created_at: new Date().toISOString(),
            },
          })
        }, 500)
      })
    }

    try {
      const endpoint = using_ticket ? '/my-predictions/ticket' : '/my-predictions'
      const response = await apiClient.post(endpoint, {
        category,
        number,
      })
      return response
    } catch (error) {
      console.error('Error adding prediction:', error)
      throw error
    }
  },

  // Xóa dự đoán
  deletePrediction: async (predictionId) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            message: 'Prediction deleted successfully',
            data: {
              deleted: true,
            },
          })
        }, 500)
      })
    }

    try {
      const response = await apiClient.delete(`/my-predictions/${predictionId}`)
      return response
    } catch (error) {
      console.error('Error deleting prediction:', error)
      throw error
    }
  },

  // Lấy tổng số dự đoán của toàn bộ hệ thống
  getTotalPredictions: async () => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            message: null,
            data: {
              total: 281,
            },
            total: null,
          })
        }, 300)
      })
    }

    try {
      const response = await apiClient.get('/total-predictions')
      return response
    } catch (error) {
      console.error('Error fetching total predictions:', error)
      throw error
    }
  },
}

export default lotteryApi
