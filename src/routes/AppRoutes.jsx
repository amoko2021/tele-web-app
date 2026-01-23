import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Account } from '../pages/Account'
import { Invite } from '../pages/Invite'
import { WithdrawalHistory } from '../pages/WithdrawalHistory'
import { Test } from '../pages/Test'
import { Prediction } from '../pages/Prediction'
import { GiftRain } from '../pages/GiftRain'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Account />} />
      <Route path="/invite" element={<Invite />} />
      <Route path="/withdrawal-history" element={<WithdrawalHistory />} />
      <Route path="/prediction" element={<Prediction />} />
      <Route path="/gift-rain" element={<GiftRain />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  )
}
