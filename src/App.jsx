import { BrowserRouter, useLocation } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'
import { BottomNavBar } from './components/layout/BottomNavBar'
import { Loading } from './components/common/Loading'
import { useTelegram } from './hooks/useTelegram'
import { useAutoUpdate } from './hooks/useAutoUpdate'
import { logger } from './services/logger'
import { useEffect } from 'react'
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
  const { isValidating, validationError } = useTelegram()
  
  // Enable auto-update check
  useAutoUpdate()

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

  if (isValidating) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
