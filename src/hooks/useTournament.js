import { useState, useEffect, useCallback } from 'react'
import lotteryApi from '../services/api/lotteryApi'

/**
 * Hook to manage hourly tournament state and countdown
 */
export const useTournament = () => {
  const [status, setStatus] = useState({
    minutesRemaining: 0,
    secondsRemaining: 0,
    isResultPhase: false,
    fullResult: null,
    myPredictions: null,
    totalFree: 0,
    totalTicket: 0,
    loading: true,
    error: null,
  })

  const fetchStatus = useCallback(async () => {
    try {
      const [tournamentRes, totalRes] = await Promise.all([
        lotteryApi.getTournamentStatus(),
        lotteryApi.getTotalPredictions(),
      ])

      if (tournamentRes && tournamentRes.data) {
        const { minutes_remaining, is_result_phase, full_result, my_predictions } = tournamentRes.data
        setStatus((prev) => ({
          ...prev,
          minutesRemaining: minutes_remaining,
          secondsRemaining: 0, // Reset seconds when fetching new minutes
          isResultPhase: is_result_phase,
          fullResult: full_result,
          myPredictions: my_predictions,
          loading: false,
        }))
      }

      if (totalRes && totalRes.data) {
        setStatus((prev) => ({
          ...prev,
          totalFree: totalRes.data.total_free || 0,
          totalTicket: totalRes.data.total_ticket || 0,
        }))
      }
    } catch (err) {
      console.error('Failed to fetch tournament status:', err)
      setStatus((prev) => ({ ...prev, error: err, loading: false }))
    }
  }, [])

  useEffect(() => {
    fetchStatus()
    // Refresh status every minute to stay in sync with backend
    const statusInterval = setInterval(fetchStatus, 60000)
    return () => clearInterval(statusInterval)
  }, [fetchStatus])

  // Local countdown for seconds
  useEffect(() => {
    if (status.loading || status.isResultPhase) return

    const timer = setInterval(() => {
      setStatus((prev) => {
        if (prev.secondsRemaining > 0) {
          return { ...prev, secondsRemaining: prev.secondsRemaining - 1 }
        } else if (prev.minutesRemaining > 0) {
          return {
            ...prev,
            minutesRemaining: prev.minutesRemaining - 1,
            secondsRemaining: 59,
          }
        } else {
          // Time's up, trigger a refresh to enter result phase
          fetchStatus()
          return prev
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [status.loading, status.isResultPhase, fetchStatus])

  return {
    ...status,
    refresh: fetchStatus,
  }
}
