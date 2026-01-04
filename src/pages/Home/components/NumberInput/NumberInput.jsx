export const NumberInput = ({ value, onChange, placeholder = '00' }) => {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
        Nhập số dự đoán
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full rounded-xl border-slate-200 bg-slate-50 p-4 text-center text-3xl font-bold tracking-widest text-slate-800 placeholder:text-slate-300 focus:border-primary focus:bg-white focus:ring-primary"
        />
      </div>
    </div>
  )
}
