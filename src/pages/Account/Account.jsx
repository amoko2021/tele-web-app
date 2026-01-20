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
import { UI_TEXT } from '../../config/uiText'

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

  const { data: userInfo, loading, refetch } = useUserInfo(userId)

  // Load bank account khi có userId
  useEffect(() => {
    const loadBankAccount = async () => {
      try {
        const data = await userApi.getBankAccount(userId)
        setBankAccount(data?.data)
      } catch (error) {
        console.error('Error loading bank account:', error)
      }
    }

    if (userId) {
      loadBankAccount()
    }
  }, [userId])

  const handleSaveBankAccount = async (data) => {
    if (!userId) {
      alert(UI_TEXT.home.alerts.noUser)
      return
    }

    const result = await userApi.updateBankAccount(userId, data)
    setBankAccount(result.data)
    alert(result.message || UI_TEXT.account.messages.updateSuccess)
  }

  const handleDeposit = () => {
    alert(UI_TEXT.account.messages.featureDev)
  }

  const handleWithdraw = () => {
    // Allow opening modal even without bank account to support crypto withdrawal
    // if (!bankAccount) {
    //   setIsBankWarningOpen(true)
    //   return
    // }
    setIsWithdrawalModalOpen(true)
  }

  const handleWithdrawalSubmit = async (data) => {
    // Handle both old format (amount only) and new format (object)
    const amount = typeof data === 'object' ? data.amount : data
    const type = typeof data === 'object' ? data.type : 'bank'
    const cryptoInfo = typeof data === 'object' ? data.cryptoInfo : null

    try {
      const requestData = {
        amount,
        type,
        ...(type === 'bank' ? { bankAccount } : { cryptoInfo })
      }

      const result = await userApi.requestWithdrawal(userId, requestData)

      // Cập nhật balance sau khi rút tiền thành công
      if (result.success) {
        const newBalance = (userInfo?.balance || 0) - amount
        await userApi.updateBalance(userId, newBalance)

        // Refresh user info để hiển thị số dư mới
        if (refetch) {
          await refetch()
        }
      }

      alert(result.message || UI_TEXT.withdrawal.messages.requestSent)
    } catch (error) {
      alert(error.message || UI_TEXT.common.error)
    }
  }
  const handleSetupBank = () => {
    setIsBankWarningOpen(false)
    setIsBankModalOpen(true)
  }

  const handleHistory = () => {
    navigate('/withdrawal-history')
  }

  const handleSupport = () => {
    alert(UI_TEXT.account.messages.contactSupport)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-500">{UI_TEXT.common.loading}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full pb-20">
      {/* Header Title */}
      <div className="flex items-center justify-center px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <h1 className="text-slate-900 dark:text-white text-lg font-bold">
          {UI_TEXT.account.title}
        </h1>
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto pb-6">
        {/* Profile Info */}
        <ProfileCard userData={userData} />

        {/* Stats / Balance */}
        <div className="px-4 mb-6">
          <BalanceStats balance={userInfo?.data?.balance || 0} points={userInfo?.data?.ticket || 0} />

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
        balance={userInfo?.data?.balance || 0}
      />
    </div>
  )
}

