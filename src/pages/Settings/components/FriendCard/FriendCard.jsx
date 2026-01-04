export const FriendCard = ({ friend }) => {
  // Backend trả về: {id, invited_user_id, inviter_user_id, rewarded, created_at}
  const displayName = `User ${friend.invited_user_id}` // Có thể fetch thêm thông tin user nếu cần
  const joinedDate = friend.created_at || new Date().toISOString()
  const isRewarded = friend.rewarded

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {displayName}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Joined {new Date(joinedDate).toLocaleDateString('vi-VN')}
            </p>
          </div>
        </div>
        <div className="text-right">
          {isRewarded ? (
            <>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold">
                <span className="material-symbols-outlined text-lg">
                  check_circle
                </span>
                <span className="text-sm">Rewarded</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                10 🪙
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 font-medium">
                <span className="material-symbols-outlined text-lg">
                  schedule
                </span>
                <span className="text-sm">Pending</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">0 🪙</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
