export const FriendCard = ({ friend }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl">
            {friend.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {friend.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Joined {new Date(friend.joinedDate).toLocaleDateString('vi-VN')}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-primary font-bold">
            <span className="text-lg">{friend.coinsEarned}</span>
            <span className="text-sm">🪙</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">earned</p>
        </div>
      </div>
    </div>
  )
}
