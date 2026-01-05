import { useState, useEffect } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import { userApi } from '../../services/api'
import { FriendCard } from './components/FriendCard'
import styles from './Settings.module.css'

export const Settings = () => {
  const { user, tg } = useTelegram()
  const [copied, setCopied] = useState(false)
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalFriends, setTotalFriends] = useState(0)

  // Tạo referral link dựa trên user ID
  const userId = user?.id || 'demo'
  const botUsername = 'ket_qua_xsmb_bot' // Thay bằng username bot của bạn
  const referralLink = `https://t.me/${botUsername}?start=${userId}`

  // Lấy danh sách bạn bè từ API
  useEffect(() => {
    const fetchFriends = async () => {
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
    }

    fetchFriends()
  }, [userId])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    tg?.HapticFeedback?.notificationOccurred('success')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInviteFriends = () => {
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      referralLink
    )}&text=${encodeURIComponent('Join me in this amazing lottery game! 🎰')}`
    tg?.openTelegramLink(shareUrl)
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 pb-20">
      {/* Header */}
      <header className="text-center space-y-2 pt-8 px-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Build your team!
        </h1>
        <p className="text-slate-500 dark:text-slate-300 text-sm font-medium">
          Share the fun and get rewards.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 pt-6 pb-6 space-y-6">
        {/* Referral Link Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
          <label className="text-xs text-slate-500 dark:text-slate-400 font-medium ml-1 block mb-2">
            Your referral link
          </label>
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 rounded-xl p-3 relative">
            <p className="text-sm text-blue-600 dark:text-blue-400 truncate font-mono select-all pr-12 flex-1">
              {referralLink}
            </p>
            <button
              onClick={handleCopyLink}
              className="absolute right-3 p-2 text-slate-400 hover:text-primary transition-colors"
              title={copied ? 'Copied!' : 'Copy Link'}
            >
              <span className="material-symbols-outlined text-xl">
                {copied ? 'check' : 'content_copy'}
              </span>
            </button>
          </div>
        </div>

        {/* Invite Button */}
        <button
          onClick={handleInviteFriends}
          className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-400 to-sky-400 text-slate-900 font-extrabold text-lg py-4 shadow-lg shadow-blue-500/30 border border-white/50 backdrop-blur-sm transition-all transform active:scale-[0.97] hover:shadow-blue-500/50 flex items-center justify-center gap-3 uppercase tracking-wide"
        >
          <span className="material-symbols-outlined -rotate-45 bg-white/40 text-slate-900 p-2 rounded-xl shadow-sm">
            send
          </span>
          Mời bạn bè
          <span className="pointer-events-none absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-20 transition-opacity"></span>
        </button>

        {/* Reward Info */}
        <div className="text-center py-4">
          <p className="text-lg font-medium flex items-center justify-center gap-2 text-slate-700 dark:text-slate-200">
            Each friend gets 10
            <span className="text-2xl drop-shadow-md">🪙</span>
          </p>
        </div>

        {/* Friends List Section */}
        <div className="pt-4 border-t border-slate-300 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Friends
            </h2>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {totalFriends} total
            </span>
          </div>

          {loading ? (
            <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                Loading friends...
              </p>
            </div>
          ) : friends.length === 0 ? (
            <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600">
              <span className="text-slate-500 dark:text-slate-400 text-sm">
                Your friends list will appear here
              </span>
            </div>
          ) : (
            <div className="space-y-3">
              {friends.map((friend) => (
                <FriendCard key={friend.id} friend={friend} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Background Blur Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-yellow-500/10 rounded-full blur-[80px]"></div>
      </div>
    </div>
  )
}
