import { useUserInfo } from '../../hooks/useApi'

export const Account = () => {
  const { data: userInfo, loading } = useUserInfo()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-500">Đang tải...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full pb-20">
      {/* Header Title */}
      <div className="flex items-center justify-center px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <h1 className="text-slate-900 dark:text-white text-lg font-bold">
          Tài khoản
        </h1>
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto pb-6">
        {/* Profile Info */}
        <div className="flex flex-col items-center pt-8 pb-6 px-4">
          <div className="relative mb-4">
            <div
              className="w-24 h-24 rounded-full bg-cover bg-center border-4 border-slate-50 dark:border-slate-800 shadow-sm bg-gradient-to-br from-primary to-blue-600"
              style={{
                backgroundImage: userInfo?.photoUrl
                  ? `url('${userInfo.photoUrl}')`
                  : undefined,
              }}
            >
              {!userInfo?.photoUrl && (
                <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                  {userInfo?.firstName?.[0] || 'U'}
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900"></div>
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">
            {userInfo?.firstName} {userInfo?.lastName}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            ID: {userInfo?.id}
          </p>
        </div>

        {/* Stats / Balance */}
        <div className="px-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            {/* Coin Balance */}
            <div className="flex flex-col gap-1 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  monetization_on
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                  Số dư Xu
                </span>
              </div>
              <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
                {userInfo?.balance?.toLocaleString() || '0'}
              </p>
            </div>

            {/* Reward Points */}
            <div className="flex flex-col gap-1 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-orange-500 text-[20px]">
                  stars
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                  Điểm thưởng
                </span>
              </div>
              <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
                340
              </p>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="flex gap-3 mt-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white h-11 rounded-lg font-medium transition-colors text-sm">
              <span className="material-symbols-outlined text-[20px]">
                add_circle
              </span>
              Nạp Xu
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 h-11 rounded-lg font-medium transition-colors text-sm">
              <span className="material-symbols-outlined text-[20px]">
                history
              </span>
              Lịch sử
            </button>
          </div>
        </div>

        {/* Menu List */}
        <div className="px-4 flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 mb-1">
            Cài đặt chung
          </p>

          {/* VIP Item */}
          <button className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors w-full group">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">diamond</span>
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div className="text-left">
                <p className="text-slate-900 dark:text-white text-sm font-medium">
                  Nâng cấp VIP
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                  Nhận ưu đãi đặc biệt
                </p>
              </div>
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors text-[20px]">
                chevron_right
              </span>
            </div>
          </button>

          {/* Bank Account */}
          <button className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors w-full group">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div className="text-left">
                <p className="text-slate-900 dark:text-white text-sm font-medium">
                  Tài khoản ngân hàng
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                  Liên kết để rút tiền
                </p>
              </div>
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors text-[20px]">
                chevron_right
              </span>
            </div>
          </button>

          {/* Security */}
          <button className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors w-full group">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">security</span>
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div className="text-left">
                <p className="text-slate-900 dark:text-white text-sm font-medium">
                  Bảo mật
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                  Đổi mật khẩu, 2FA
                </p>
              </div>
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors text-[20px]">
                chevron_right
              </span>
            </div>
          </button>

          {/* Support */}
          <button className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors w-full group">
            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">headset_mic</span>
            </div>
            <div className="flex flex-1 items-center justify-between">
              <p className="text-slate-900 dark:text-white text-sm font-medium">
                Hỗ trợ khách hàng
              </p>
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors text-[20px]">
                chevron_right
              </span>
            </div>
          </button>

          {/* Logout */}
          <button className="flex items-center gap-4 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full group mt-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-500 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">logout</span>
            </div>
            <div className="flex flex-1 items-center justify-between">
              <p className="text-red-500 dark:text-red-400 text-sm font-medium">
                Đăng xuất
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
