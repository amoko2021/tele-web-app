import { BrowserRouter, useLocation } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'
import { BottomNavBar } from './components/layout/BottomNavBar'
import { Loading } from './components/common/Loading'
import { JoinChannelScreen } from './components/common/JoinChannelScreen'
import { useTelegram } from './hooks/useTelegram'
import { useAutoUpdate } from './hooks/useAutoUpdate'
import { useUserInfo } from './hooks/useApi'
import { userApi } from './services/api'
import { logger } from './services/logger'
import { useEffect, useState } from 'react'
import './App.css'

function AppContent() {
  const location = useLocation()
  
  // Routes where the navigation bar should be hidden
  const hideNavBarRoutes = ['/flappy-bird', '/gift-rain']
  const shouldHideNavBar = hideNavBarRoutes.includes(location.pathname)

  return (
    <div className="app">
      <AppRoutes />
      {!shouldHideNavBar && <BottomNavBar />}
    </div>
  )
}


function App() {
  const { isValidating, validationError, user } = useTelegram()
  const [isJoined, setIsJoined] = useState(null)
  const [isCheckingMembership, setIsCheckingMembership] = useState(false)
  
  const userId = user?.id
  const { loading: loadingUserInfo } = useUserInfo(userId)
  
  // Enable auto-update check
  useAutoUpdate()

  // Check membership on mount or when userId changes
  useEffect(() => {
    const checkInitialMembership = async () => {
      if (userId && isJoined === null && !isCheckingMembership) {
        setIsCheckingMembership(true)
        try {
          const result = await userApi.checkMembership(userId)
          setIsJoined(!!result?.data?.is_joined)
        } catch (error) {
          console.error('Initial membership check failed:', error)
          // If API fails, we might want to default to false to be safe
          setIsJoined(false)
        } finally {
          setIsCheckingMembership(false)
        }
      }
    }
    checkInitialMembership()
  }, [userId, isJoined, isCheckingMembership])

  const handleCheckJoin = async () => {
    try {
      const result = await userApi.checkMembership(userId)
      const joined = !!result?.data?.is_joined
      setIsJoined(joined)
      return joined
    } catch (error) {
      console.error('Check membership failed:', error)
      return false
    }
  }

  useEffect(() => {
    if (!isValidating && !validationError) {
      logger.appInit('success', {
        validated: true,
        timestamp: new Date().toISOString(),
      })
    } else if (!isValidating && validationError) {
      logger.appInit('failed', {
        error: validationError.message,
        timestamp: new Date().toISOString(),
      })
    }
  }, [isValidating, validationError])

  if (isValidating || (userId && (isJoined === null || isCheckingMembership || loadingUserInfo))) {
    return <Loading />
  }

  if (userId && isJoined === false) {
    return <JoinChannelScreen onCheck={handleCheckJoin} />
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
