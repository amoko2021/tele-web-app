import { useState, useEffect, useCallback } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import { userApi } from '../../services/api'
import { ReferralHeader } from './components/ReferralHeader'
import { ReferralLinkSection } from './components/ReferralLinkSection'
import { ReferralStats } from './components/ReferralStats'
import { FriendsTable } from './components/FriendsTable'
import { UI_TEXT } from '../../config/uiText'

export const Invite = () => {
  const { user, tg } = useTelegram()
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    earnings: 0,
    pending: 0
  })

  const userId = user?.id || ''
  const botUsername = 'ket_qua_xsmb_bot'
  const referralLink = `https://t.me/${botUsername}?start=${userId}`

  const fetchFriends = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    try {
      const response = await userApi.getReferralFriends(userId)
      if (response.ok) {
        const friendList = response.data || []
        setFriends(friendList)
        
        // Calculate stats based on rewarded status
        const earnings = friendList.reduce((acc, friend) => acc + (friend.rewarded ? 1000 : 0), 0)
        const pending = friendList.reduce((acc, friend) => acc + (!friend.rewarded ? 1000 : 0), 0)
        
        setStats({
          total: friendList.length,
          earnings: earnings,
          pending: pending
        })
      }
    } catch (error) {
      console.error('Error fetching friends:', error)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchFriends()
  }, [fetchFriends])

  const handleShare = () => {
     const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      referralLink
    )}&text=${encodeURIComponent(UI_TEXT?.settings?.invite?.shareText || 'Tham gia cùng tôi!')}`
    tg?.openTelegramLink(shareUrl)
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-light dark:text-text-dark flex flex-col items-center justify-start p-4 transition-colors duration-300 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-primary/5 rounded-full blur-[80px]"></div>
        </div>

        <main className="w-full max-w-2xl mx-auto space-y-8 pt-6 pb-28 z-10 relative">
            <ReferralHeader />
            <ReferralLinkSection referralLink={referralLink} onShare={handleShare} />
            <ReferralStats stats={stats} />
            <FriendsTable friends={friends} loading={loading} />
        </main>
    </div>
  )
}
