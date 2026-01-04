import { MenuItem } from '../../../../components/common/MenuItem'

export const SettingsMenu = ({ onBankAccount, onSupport }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 mb-1">
        Cài đặt chung
      </p>

      <MenuItem
        icon="account_balance"
        title="Tài khoản ngân hàng"
        description="Liên kết để rút tiền"
        iconBgColor="bg-blue-100 dark:bg-blue-900/30"
        iconTextColor="text-primary"
        onClick={onBankAccount}
      />

      <MenuItem
        icon="headset_mic"
        title="Hỗ trợ khách hàng"
        iconBgColor="bg-slate-100 dark:bg-slate-800"
        iconTextColor="text-slate-500 dark:text-slate-400"
        onClick={onSupport}
      />
    </div>
  )
}
