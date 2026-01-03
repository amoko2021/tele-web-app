import { useState, useEffect } from 'react'
import { lotteryApi, userApi } from '../services/api'

/**
 * Custom hook để lấy kết quả xổ số miền bắc
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
  }, [])

  return { data, loading, error, refetch: fetchXSMB }
}

/**
 * Custom hook để lấy thông tin user
 */
export const useUserInfo = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUserInfo = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await userApi.getUserInfo()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  return { data, loading, error, refetch: fetchUserInfo }
}
