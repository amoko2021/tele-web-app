import { UI_TEXT } from '../../../config/uiText'

export const FriendsTable = ({ friends, loading }) => {
  if (loading) {
     return (
        <section className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-soft border border-border-light dark:border-border-dark space-y-4">
             <div className="flex justify-center p-8">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
             </div>
        </section>
     )
  }

  return (
    <section className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-soft border border-border-light dark:border-border-dark space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-text-dark">{UI_TEXT.settings.friends.title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm whitespace-nowrap">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-600">
            <tr>
              <th scope="col" className="px-4 py-3">{UI_TEXT.settings.friends.name}</th>
              <th scope="col" className="px-4 py-3 text-center">{UI_TEXT.settings.friends.statusLabel}</th>
              <th scope="col" className="px-4 py-3 text-right">{UI_TEXT.settings.friends.income}</th>
            </tr>
          </thead>
          <tbody>
            {friends.length === 0 ? (
                 <tr>
                    <td colSpan="3" className="px-4 py-8 text-center text-gray-500">
                        {UI_TEXT.settings.friends.empty}
                    </td>
                 </tr>
            ) : (
                friends.map((friend, index) => {
                    const displayName = `User ${friend.invited_user_id}`
                    const isRewarded = friend.rewarded

                    return (
                        <tr key={friend.id || index} className="bg-card-light dark:bg-card-dark border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-text-dark flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                 {displayName.charAt(0)}
                            </div>
                            <span>{displayName}</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            {isRewarded ? (
                                <span className="bg-accent-green/10 text-accent-green text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-accent-green/20">{UI_TEXT.settings.friends.status.rewarded}</span>
                            ) : (
                                <span className="bg-accent-red/10 text-accent-red text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-accent-red/20">{UI_TEXT.settings.friends.status.pending}</span>
                            )}
                          </td>
                          <td className={`px-4 py-3 text-right font-medium ${isRewarded ? 'text-accent-green' : 'text-gray-500'}`}>
                              {isRewarded ? '+1,000 VND' : '0 VND'}
                          </td>
                        </tr>
                    )
                })
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center p-8 bg-gray-50 dark:bg-gray-700 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 text-sm">
        <p>{UI_TEXT.settings.friends.noMore}</p>
      </div>
    </section>
  )
}
