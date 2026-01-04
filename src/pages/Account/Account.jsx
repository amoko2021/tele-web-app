import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserInfo } from '../../hooks/useApi'
import { useTelegram } from '../../hooks/useTelegram'
import { userApi } from '../../services/api'
import { BankAccountModal } from '../../components/common/BankAccountModal'
import { BankWarningModal } from '../../components/common/BankWarningModal'
import { WithdrawalModal } from '../../components/common/WithdrawalModal'
import { ProfileCard } from './components/ProfileCard'
import { BalanceStats } from './components/BalanceStats'
import { ActionButtons } from './components/ActionButtons'
import { SettingsMenu } from './components/SettingsMenu'

export const Account = () => {
  const navigate = useNavigate()
  const { validationData, user: telegramUser } = useTelegram()
  const [isBankModalOpen, setIsBankModalOpen] = useState(false)
  const [isBankWarningOpen, setIsBankWarningOpen] = useState(false)
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false)
  const [bankAccount, setBankAccount] = useState(null)

  // Ưu tiên dùng dữ liệu từ validation, fallback về mock data
  const userData = validationData?.data?.user || telegramUser
  const userId = userData?.id

  const { data: userInfo, loading } = useUserInfo(userId)

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

  const handleDeposit = () => {
    alert('Tính năng nạp xu đang phát triển')
  }

  const handleWithdraw = () => {
    if (!bankAccount) {
      setIsBankWarningOpen(true)
      return
    }
    setIsWithdrawalModalOpen(true)
  }

  const handleSetupBank = () => {
    setIsBankWarningOpen(false)
    setIsBankModalOpen(true)
  }

  const handleWithdrawalSubmit = async (amount) => {
    try {
      const result = await userApi.requestWithdrawal(userId, {
        amount,
        bankAccount,
      })
      alert(result.message || 'Yêu cầu rút tiền đã được gửi!')
    } catch (error) {
      alert(error.message || 'Có lỗi xảy ra, vui lòng thử lại!')
    }
  }

  const handleHistory = () => {
    navigate('/withdrawal-history')
  }

  const handleSupport = () => {
    alert('Liên hệ: @crush_xx')
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
        <ProfileCard userData={userData} />

        {/* Stats / Balance */}
        <div className="px-4 mb-6">
          <BalanceStats balance={userInfo?.data?.balance || 0} points={340} />

          {/* Primary Actions */}
          <ActionButtons
            onDeposit={handleDeposit}
            onWithdraw={handleWithdraw}
            onHistory={handleHistory}
          />
        </div>

        {/* Menu List */}
        <div className="px-4">
          <SettingsMenu
            onBankAccount={() => setIsBankModalOpen(true)}
            onSupport={handleSupport}
          />
        </div>
      </div>

      {/* Bank Warning Modal */}
      <BankWarningModal
        isOpen={isBankWarningOpen}
        onClose={() => setIsBankWarningOpen(false)}
        onSetup={handleSetupBank}
      />

      {/* Bank Account Modal */}
      <BankAccountModal
        isOpen={isBankModalOpen}
        onClose={() => setIsBankModalOpen(false)}
        onSave={handleSaveBankAccount}
        initialData={bankAccount}
      />

      {/* Withdrawal Modal */}
      <WithdrawalModal
        isOpen={isWithdrawalModalOpen}
        onClose={() => setIsWithdrawalModalOpen(false)}
        onSubmit={handleWithdrawalSubmit}
        bankInfo={bankAccount}
      />
    </div>
  )
}
