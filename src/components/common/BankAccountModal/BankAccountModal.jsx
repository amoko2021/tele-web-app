import { useState } from 'react'
import { Modal } from '../Modal'
import { UI_TEXT } from '../../../config/uiText'

export const BankAccountModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    bankName: initialData?.bankName || '',
    accountName: initialData?.accountName || '',
    accountNumber: initialData?.accountNumber || '',
  })
  const [saving, setSaving] = useState(false)

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    // Validation
    if (
      !formData.bankName ||
      !formData.accountName ||
      !formData.accountNumber
    ) {
      alert(UI_TEXT.validation.required)
      return
    }

    setSaving(true)
    try {
      await onSave(formData)
      onClose()
    } catch (error) {
      alert(UI_TEXT.common.error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={UI_TEXT.withdrawal.bankInfo.title}
    >
      <div className="flex flex-col gap-5">
        {/* Bank Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            {UI_TEXT.withdrawal.bankInfo.bankName} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-[20px]">
                account_balance
              </span>
            </div>
            <input
              type="text"
              value={formData.bankName}
              onChange={(e) => handleChange('bankName', e.target.value)}
              placeholder={UI_TEXT.withdrawal.bankInfo.bankName}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white h-12 pl-10 pr-4 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Account Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            {UI_TEXT.withdrawal.bankInfo.accountName} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-[20px]">
                person
              </span>
            </div>
            <input
              type="text"
              value={formData.accountName}
              onChange={(e) =>
                handleChange('accountName', e.target.value.toUpperCase())
              }
              placeholder="NGUYEN VAN A"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white h-12 pl-10 pr-4 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all uppercase"
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pl-1">
            {UI_TEXT.withdrawal.bankInfo.note}
          </p>
        </div>

        {/* Account Number */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            {UI_TEXT.withdrawal.bankInfo.accountNumber} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-[20px]">
                credit_card
              </span>
            </div>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) =>
                handleChange('accountNumber', e.target.value.replace(/\D/g, ''))
              }
              placeholder={UI_TEXT.withdrawal.bankInfo.accountNumber}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white h-12 pl-10 pr-4 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="flex items-center justify-center h-10 px-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-900 dark:text-white text-sm font-semibold transition-colors"
          >
            {UI_TEXT.common.cancel}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center h-10 px-6 rounded-lg bg-primary hover:bg-blue-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>{saving ? UI_TEXT.common.loading : UI_TEXT.common.save}</span>
          </button>
        </div>
      </div>
    </Modal>
  )
}

