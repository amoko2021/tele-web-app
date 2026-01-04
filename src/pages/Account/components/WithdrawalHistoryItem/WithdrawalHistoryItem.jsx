const statusConfig = {
  pending: {
    icon: 'pending',
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-500',
    badgeBg: 'bg-yellow-100 dark:bg-yellow-900/30',
    badgeText: 'text-yellow-700 dark:text-yellow-500',
    label: 'Đang xử lý',
  },
  paid: {
    icon: 'check_circle',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-500',
    badgeBg: 'bg-green-100 dark:bg-green-900/30',
    badgeText: 'text-green-700 dark:text-green-500',
    label: 'Thành công',
  },
  success: {
    icon: 'check_circle',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-500',
    badgeBg: 'bg-green-100 dark:bg-green-900/30',
    badgeText: 'text-green-700 dark:text-green-500',
    label: 'Thành công',
  },
  cancelled: {
    icon: 'cancel',
    iconBg: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-500',
    badgeBg: 'bg-red-100 dark:bg-red-900/30',
    badgeText: 'text-red-700 dark:text-red-500',
    label: 'Đã hủy',
  },
}

export const WithdrawalHistoryItem = ({ transaction }) => {
  const config = statusConfig[transaction.status] || statusConfig.pending
  const isOpaque = transaction.status === 'cancelled'

  // Format datetime from "2026-01-04 10:30:00" to "10:30, 04/01/2026"
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr.replace(' ', 'T'))
    const time = date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    })
    const day = date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    return `${time}, ${day}`
  }

  return (
    <div
      className={`bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800 flex items-center justify-between ${
        isOpaque ? 'opacity-80' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full ${config.iconBg} flex items-center justify-center ${config.iconColor}`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {config.icon}
          </span>
        </div>
        <div>
          <p className="text-slate-900 dark:text-white font-semibold text-sm">
            Rút về {transaction.bank_name || transaction.bankName}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
            {formatDate(transaction.created_at || transaction.date)}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-slate-900 dark:text-white font-bold text-sm">
          - {transaction.amount.toLocaleString()} đ
        </p>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${config.badgeBg} ${config.badgeText} mt-1`}
        >
          {config.label}
        </span>
      </div>
    </div>
  )
}
