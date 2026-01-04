import { useState, useEffect, useCallback, useRef } from 'react'
import { lotteryApi, userApi } from '../services/api'

/**
 * Custom hook để lấy kết quả xổ số miền bắc
 * Tự động refresh mỗi 30s trong giờ quay thưởng (18h-18h30)
 */
export const useXSMB = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isMounted = useRef(true)
  const intervalRef = useRef(null)

  const isDrawingTime = () => {
    const now = new Date()
    const h = now.getHours()
    const m = now.getMinutes()
    return h === 18 && m < 30
  }

  const fetchXSMB = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true)
    setError(null)

    try {
      const result = await lotteryApi.getXSMB()
      if (isMounted.current) {
        setData(result)
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err.message || 'Fetch error')
      }
    } finally {
      if (showLoading && isMounted.current) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    // fetch lần đầu
    fetchXSMB(true)

    // check mỗi 1 phút xem có vào giờ quay chưa
    const checker = setInterval(() => {
      if (isDrawingTime() && !intervalRef.current) {
        intervalRef.current = setInterval(() => {
          fetchXSMB(false) // refresh nền
        }, 30000)
      }

      // hết giờ quay thì clear
      if (!isDrawingTime() && intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }, 60000)

    return () => {
      isMounted.current = false
      clearInterval(checker)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [fetchXSMB])

  return { data, loading, error, refetch: () => fetchXSMB(true) }
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
