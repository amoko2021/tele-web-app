const SkeletonNumber = ({ width = 'w-12' }) => (
  <div className={`${width} h-5 animate-pulse rounded bg-slate-200`}></div>
)

export const ResultsTable = ({ results }) => {
  if (!results) return null

  return (
    <div className="px-4 py-2">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex border-b border-slate-100 bg-slate-50 px-3 py-1.5">
          <div className="w-12 flex-none text-[10px] font-semibold uppercase text-slate-400">
            Giải
          </div>
          <div className="flex-1 text-center text-[10px] font-semibold uppercase text-slate-400">
            Kết quả
          </div>
        </div>

        {/* G1 */}
        <div className="flex items-center border-b border-slate-100 px-3 py-2.5">
          <div className="w-12 flex-none text-xs font-bold text-slate-500">
            G1
          </div>
          <div className="flex flex-1 justify-center text-center text-lg font-bold tracking-wider text-slate-800">
            {/* {results.G1?.[0] || <SkeletonNumber width="w-16" />} */}
            {<SkeletonNumber width="w-16" />}
          </div>
        </div>

        {/* G2 */}
        <div className="flex items-center border-b border-slate-100 px-3 py-2.5">
          <div className="w-12 flex-none text-xs font-bold text-slate-500">
            G2
          </div>
          <div className="flex flex-1 flex-wrap justify-center gap-x-6 gap-y-1 text-center text-base font-bold tracking-wider text-slate-800">
            {results.G2?.map((num, idx) => <span key={idx}>{num}</span>) || (
              <>
                <SkeletonNumber width="w-14" />
                <SkeletonNumber width="w-14" />
              </>
            )}
          </div>
        </div>

        {/* G3 */}
        <div className="flex items-center border-b border-slate-100 px-3 py-2.5">
          <div className="w-12 flex-none text-xs font-bold text-slate-500">
            G3
          </div>
          <div className="grid flex-1 grid-cols-3 gap-x-3 gap-y-1.5 text-center text-base font-medium tracking-wider text-slate-800">
            {results.G3?.map((num, idx) => <span key={idx}>{num}</span>) || (
              <>
                <SkeletonNumber width="w-14" />
                <SkeletonNumber width="w-14" />
                <SkeletonNumber width="w-14" />
                <SkeletonNumber width="w-14" />
                <SkeletonNumber width="w-14" />
                <SkeletonNumber width="w-14" />
              </>
            )}
          </div>
        </div>

        {/* G4 */}
        <div className="flex items-center border-b border-slate-100 px-3 py-2.5">
          <div className="w-12 flex-none text-xs font-bold text-slate-500">
            G4
          </div>
          <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-1.5 text-center text-base font-medium tracking-wider text-slate-800">
            {results.G4?.map((num, idx) => <span key={idx}>{num}</span>) || (
              <>
                <SkeletonNumber width="w-12" />
                <SkeletonNumber width="w-12" />
                <SkeletonNumber width="w-12" />
                <SkeletonNumber width="w-12" />
              </>
            )}
          </div>
        </div>

        {/* G5 */}
        <div className="flex items-center border-b border-slate-100 px-3 py-2.5">
          <div className="w-12 flex-none text-xs font-bold text-slate-500">
            G5
          </div>
          <div className="grid flex-1 grid-cols-3 gap-x-2 gap-y-1.5 text-center text-base font-medium tracking-wider text-slate-800">
            {results.G5?.map((num, idx) => <span key={idx}>{num}</span>) || (
              <>
                <SkeletonNumber width="w-10" />
                <SkeletonNumber width="w-10" />
                <SkeletonNumber width="w-10" />
                <SkeletonNumber width="w-10" />
                <SkeletonNumber width="w-10" />
                <SkeletonNumber width="w-10" />
              </>
            )}
          </div>
        </div>

        {/* G6 */}
        <div className="flex items-center border-b border-slate-100 px-3 py-2.5">
          <div className="w-12 flex-none text-xs font-bold text-slate-500">
            G6
          </div>
          <div className="flex flex-1 flex-wrap justify-center gap-x-5 gap-y-1 text-center text-base font-medium tracking-wider text-slate-800">
            {results.G6?.map((num, idx) => <span key={idx}>{num}</span>) || (
              <>
                <SkeletonNumber width="w-10" />
                <SkeletonNumber width="w-10" />
                <SkeletonNumber width="w-10" />
              </>
            )}
          </div>
        </div>

        {/* G7 */}
        <div className="flex items-center px-3 py-2.5">
          <div className="w-12 flex-none text-xs font-bold text-slate-500">
            G7
          </div>
          <div className="flex flex-1 flex-wrap justify-center gap-x-5 gap-y-1 text-center text-base font-bold tracking-wider text-slate-800">
            {results.G7?.map((num, idx) => (
              <span key={idx} className="text-primary">
                {num}
              </span>
            )) || (
              <>
                <SkeletonNumber width="w-8" />
                <SkeletonNumber width="w-8" />
                <SkeletonNumber width="w-8" />
                <SkeletonNumber width="w-8" />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <p className="text-[10px] text-slate-400">
          Kết quả được cập nhật trực tiếp lúc 18:15 hàng ngày
        </p>
      </div>
    </div>
  )
}
