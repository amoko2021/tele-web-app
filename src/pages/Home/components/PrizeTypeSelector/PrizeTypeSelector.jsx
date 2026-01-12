export const PrizeTypeSelector = ({ value, onChange }) => {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
        Chọn loại giải
      </label>
      <div className="grid grid-cols-2 gap-2">
        <label className="cursor-pointer">
          <input
            type="radio"
            name="prize_type"
            value="db"
            checked={value === 'db'}
            onChange={(e) => onChange(e.target.value)}
            className="peer hidden"
          />
          <div className="relative flex items-center justify-center rounded-lg border border-slate-200 bg-white py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
            Giải ĐB
            <span className="absolute top-0 right-0 -mt-1 -mr-1 rounded-full bg-green-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              +50K
            </span>
          </div>
        </label>
        <label className="cursor-pointer">
          <input
            type="radio"
            name="prize_type"
            value="loto"
            checked={value === 'loto'}
            onChange={(e) => onChange(e.target.value)}
            className="peer hidden"
          />
          <div className="relative flex items-center justify-center rounded-lg border border-slate-200 bg-white py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
            Lô tô
            <span className="absolute top-0 right-0 -mt-1 -mr-1 rounded-full bg-green-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              +5K
            </span>
          </div>
        </label>
      </div>
    </div>
  )
}
