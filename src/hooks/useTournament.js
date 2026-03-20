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
        const { minutes_remaining, is_result_phase, full_result, my_predictions, total_predictions } = tournamentRes.data
        
        // Calculate target end time locally based on the current hour
        // Tournament ends at 45m of every hour
        const now = new Date()
        const target = new Date(now)
        target.setMinutes(45, 0, 0)
        
        // If we are already past 45m, the next target is the 45m of the next hour
        if (now.getMinutes() >= 45) {
          target.setHours(target.getHours() + 1)
        }
        
        const targetTime = target.getTime()
        
        setStatus((prev) => ({
          ...prev,
          minutesRemaining: minutes_remaining,
          secondsRemaining: 0,
          targetTime: targetTime,
          isResultPhase: is_result_phase,
          fullResult: full_result,
          myPredictions: my_predictions,
          totalFree: total_predictions || 0,
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
    if (status.loading || status.isResultPhase || !status.targetTime) return

    const timer = setInterval(() => {
      const now = Date.now()
      const diff = status.targetTime - now

      if (diff > 0) {
        setStatus((prev) => ({
          ...prev,
          minutesRemaining: Math.floor((diff / 1000 / 60) % 60),
          secondsRemaining: Math.floor((diff / 1000) % 60),
        }))
      } else {
        // Time's up, trigger a refresh to enter result phase
        fetchStatus()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [status.loading, status.isResultPhase, status.targetTime, fetchStatus])

  return {
    ...status,
    refresh: fetchStatus,
  }
}
