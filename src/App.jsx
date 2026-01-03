import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'
import { BottomNavBar } from './components/layout/BottomNavBar'
import { Loading } from './components/common/Loading'
import { useTelegram } from './hooks/useTelegram'
import './App.css'

function App() {
  const { isValidating } = useTelegram()

  if (isValidating) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <div className="app">
        <AppRoutes />
        <BottomNavBar />
      </div>
    </BrowserRouter>
  )
}

export default App
