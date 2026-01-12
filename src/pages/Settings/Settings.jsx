import { useState, useEffect, useCallback } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import { userApi } from '../../services/api'
import { HeaderSection } from './components/HeaderSection'
import { ReferralLinkCard } from './components/ReferralLinkCard'
import { InviteButton } from './components/InviteButton'
import { RewardInfo } from './components/RewardInfo'
import { FriendsListSection } from './components/FriendsListSection'
import { BackgroundEffects } from './components/BackgroundEffects'
import { UI_TEXT } from '../../config/uiText'

export const Settings = () => {
  const { user, tg } = useTelegram()
  const [copied, setCopied] = useState(false)
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalFriends, setTotalFriends] = useState(0)

  const userId = user?.id || 'demo'
  const botUsername = 'ket_qua_xsmb_bot'
  const referralLink = `https://t.me/${botUsername}?start=${userId}`

  const fetchFriends = useCallback(async () => {
    if (!userId) return

    setLoading(true)
    try {
      const response = await userApi.getReferralFriends(userId)
      if (response.ok) {
        setFriends(response.data || [])
        setTotalFriends(response.total || 0)
      } else {
        setFriends([])
        setTotalFriends(0)
      }
    } catch (error) {
      console.error('Error fetching friends:', error)
      setFriends([])
      setTotalFriends(0)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchFriends()
  }, [fetchFriends])

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    tg?.HapticFeedback?.notificationOccurred('success')
    setTimeout(() => setCopied(false), 2000)
  }, [referralLink, tg])

  const handleInviteFriends = useCallback(() => {
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      referralLink
    )}&text=${encodeURIComponent(UI_TEXT.settings.invite.shareText)}`
    tg?.openTelegramLink(shareUrl)
  }, [referralLink, tg])

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 pb-20">
      <HeaderSection />

      <main className="flex-1 overflow-y-auto px-4 pt-6 pb-6 space-y-6">
        <ReferralLinkCard
          referralLink={referralLink}
          copied={copied}
          onCopy={handleCopyLink}
        />

        <InviteButton onInvite={handleInviteFriends} />

        <RewardInfo />

        <div className="pt-4 border-t border-slate-300 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {UI_TEXT.settings.friends.title}
            </h2>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {UI_TEXT.settings.friends.total.replace('{count}', totalFriends)}
            </span>
          </div>

          <FriendsListSection friends={friends} loading={loading} />
        </div>
      </main>

      <BackgroundEffects />
    </div>
  )
}

