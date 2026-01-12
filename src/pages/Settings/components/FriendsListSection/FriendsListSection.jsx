import { FriendCard } from '../FriendCard'
import { UI_TEXT } from '../../../../config/uiText'

export const FriendsListSection = ({ friends, loading }) => {
  if (loading) {
    return (
      <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          {UI_TEXT.settings.friends.loading}
        </p>
      </div>
    )
  }

  if (friends.length === 0) {
    return (
      <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600">
        <span className="text-slate-500 dark:text-slate-400 text-sm">
          {UI_TEXT.settings.friends.empty}
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {friends.map((friend) => (
        <FriendCard key={friend.id} friend={friend} />
      ))}
    </div>
  )
}

