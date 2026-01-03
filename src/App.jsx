import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'
import { BottomNavBar } from './components/layout/BottomNavBar'
import './App.css'

function App() {
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
