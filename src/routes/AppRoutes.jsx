import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Account } from '../pages/Account'
import { Settings } from '../pages/Settings'
import { WithdrawalHistory } from '../pages/WithdrawalHistory'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Account />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/withdrawal-history" element={<WithdrawalHistory />} />
    </Routes>
  )
}
