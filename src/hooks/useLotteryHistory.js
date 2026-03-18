import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const LOTTERY_HISTORY_API =
  import.meta.env.VITE_LOTTERY_HISTORY_URL ||
  'https://raw.githubusercontent.com/khiemdoan/vietnam-lottery-xsmb-analysis/refs/heads/main/data/xsmb.json'

export const useLotteryHistory = () => {
  const [allResults, setAllResults] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentResult, setCurrentResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all lottery history data
  useEffect(() => {
    const fetchLotteryHistory = async () => {
      try {
        setLoading(true)
        const response = await axios.get(LOTTERY_HISTORY_API)
        setAllResults(response.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching lottery history:', err)
        setError('Không thể tải lịch sử kết quả. Vui lòng thử lại sau.')
      } finally {
        setLoading(false)
      }
    }

    fetchLotteryHistory()
  }, [])

  // Update current result when date or data changes
  useEffect(() => {
    if (allResults.length === 0) return

    const dateString = formatDateToString(currentDate)
    const result = allResults.find((item) => {
      const itemDate = new Date(item.date)
      return formatDateToString(itemDate) === dateString
    })

    setCurrentResult(result || null)
  }, [currentDate, allResults])

  // Navigate to previous day
  const goToPreviousDay = useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setDate(newDate.getDate() - 1)
      return newDate
    })
  }, [])

  // Navigate to next day
  const goToNextDay = useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setDate(newDate.getDate() + 1)

      // Don't go beyond today
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      newDate.setHours(0, 0, 0, 0)

      if (newDate > today) {
        return prevDate
      }

      return newDate
    })
  }, [])

  // Go to specific date
  const goToDate = useCallback((date) => {
    setCurrentDate(new Date(date))
  }, [])

  // Go to today
  const goToToday = useCallback(() => {
    setCurrentDate(new Date())
  }, [])

  // Check if we can navigate next (not beyond today)
  const canGoNext = useCallback(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const current = new Date(currentDate)
    current.setHours(0, 0, 0, 0)
    return current < today
  }, [currentDate])

  // Check if we can navigate previous (has data)
  const canGoPrevious = useCallback(() => {
    if (allResults.length === 0) return false
    const oldestDate = new Date(allResults[0].date)
    const current = new Date(currentDate)
    current.setHours(0, 0, 0, 0)
    oldestDate.setHours(0, 0, 0, 0)
    return current > oldestDate
  }, [currentDate, allResults])

  // Format date to DD/MM/YYYY
  const formatDate = useCallback((date) => {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
  }, [])

  // Check if current date is today
  const isToday = useCallback(() => {
    const today = new Date()
    return formatDateToString(today) === formatDateToString(currentDate)
  }, [currentDate])

  return {
    // Data
    currentResult,
    currentDate,
    allResults,

    // States
    loading,
    error,

    // Navigation
    goToPreviousDay,
    goToNextDay,
    goToDate,
    goToToday,

    // Checks
    canGoNext: canGoNext(),
    canGoPrevious: canGoPrevious(),
    isToday: isToday(),

    // Helpers
    formatDate: (date) => formatDate(date || currentDate),
  }
}

// Helper function to format date to YYYY-MM-DD for comparison
const formatDateToString = (date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
