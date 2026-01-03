import { useState, useEffect } from 'react'
import { useUserInfo } from '../../hooks/useApi'
import { useTelegram } from '../../hooks/useTelegram'
import { userApi } from '../../services/api'
import { MenuItem } from '../../components/common/MenuItem'
import { BankAccountModal } from '../../components/common/BankAccountModal'

export const Account = () => {
  const { data: userInfo, loading } = useUserInfo()
  const { validationData, user: telegramUser } = useTelegram()
  const [isBankModalOpen, setIsBankModalOpen] = useState(false)
  const [bankAccount, setBankAccount] = useState(null)

  // Ưu tiên dùng dữ liệu từ validation, fallback về mock data
  const userData = validationData?.data?.user || telegramUser || userInfo
  const userId = userData?.id

  // Load bank account khi có userId
  useEffect(() => {
    if (userId) {
      loadBankAccount()
    }
  }, [userId])

  const loadBankAccount = async () => {
    try {
      const data = await userApi.getBankAccount(userId)
      setBankAccount(data)
    } catch (error) {
      console.error('Error loading bank account:', error)
    }
  }

  const handleSaveBankAccount = async (data) => {
    if (!userId) {
      alert('Không tìm thấy thông tin user!')
      return
    }

    try {
      const result = await userApi.updateBankAccount(userId, data)
      setBankAccount(result.data)
      alert(result.message || 'Cập nhật thành công!')
    } catch (error) {
      throw error
    }
  }

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
                backgroundImage:
                  userData?.photo_url || userData?.photoUrl
                    ? `url('${userData.photo_url || userData.photoUrl}')`
                    : undefined,
              }}
            >
              {!(userData?.photo_url || userData?.photoUrl) && (
                <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                  {(userData?.first_name || userData?.firstName)?.[0] || 'U'}
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900"></div>
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">
            {userData?.first_name || userData?.firstName}{' '}
            {userData?.last_name || userData?.lastName}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {userData?.username && `@${userData.username}`}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
            ID: {userData?.id}
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

          <MenuItem
            icon="diamond"
            title="Nâng cấp VIP"
            description="Nhận ưu đãi đặc biệt"
            iconBgColor="bg-yellow-100 dark:bg-yellow-900/30"
            iconTextColor="text-yellow-600 dark:text-yellow-400"
            onClick={() => alert('Tính năng đang phát triển')}
          />

          <MenuItem
            icon="account_balance"
            title="Tài khoản ngân hàng"
            description="Liên kết để rút tiền"
            iconBgColor="bg-blue-100 dark:bg-blue-900/30"
            iconTextColor="text-primary"
            onClick={() => setIsBankModalOpen(true)}
          />

          <MenuItem
            icon="security"
            title="Bảo mật"
            description="Đổi mật khẩu, 2FA"
            iconBgColor="bg-green-100 dark:bg-green-900/30"
            iconTextColor="text-green-600 dark:text-green-400"
            onClick={() => alert('Tính năng đang phát triển')}
          />

          <MenuItem
            icon="headset_mic"
            title="Hỗ trợ khách hàng"
            iconBgColor="bg-slate-100 dark:bg-slate-800"
            iconTextColor="text-slate-500 dark:text-slate-400"
            onClick={() => alert('Liên hệ: support@example.com')}
          />

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

      {/* Bank Account Modal */}
      <BankAccountModal
        isOpen={isBankModalOpen}
        onClose={() => setIsBankModalOpen(false)}
        onSave={handleSaveBankAccount}
        initialData={bankAccount}
      />
    </div>
  )
}
