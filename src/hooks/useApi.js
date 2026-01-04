import { useState, useEffect } from 'react'
import { lotteryApi, userApi } from '../services/api'

/**
 * Custom hook để lấy kết quả xổ số miền bắc
 * Tự động refresh mỗi 30s trong giờ quay thưởng (18h-18h30)
 */
export const useXSMB = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchXSMB = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await lotteryApi.getXSMB()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchXSMB()

    // Kiểm tra xem có đang trong giờ quay thưởng không
    const isDrawingTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      return hours === 18 && minutes >= 0 && minutes < 30
    }

    // Nếu đang trong giờ quay thưởng, refresh mỗi 30s
    let interval
    if (isDrawingTime()) {
      interval = setInterval(() => {
        fetchXSMB()
      }, 30000) // 30 giây
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [])

  return { data, loading, error, refetch: fetchXSMB }
}

/**
 * Custom hook để lấy thông tin user
 */
export const useUserInfo = (userId) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUserInfo = async () => {
    if (!userId) return

    setLoading(true)
    setError(null)
    try {
      const result = await userApi.getUserInfo(userId)
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [userId])

  return { data, loading, error, refetch: fetchUserInfo }
}
