const SkeletonNumber = ({ width = 'w-12' }) => (
  <div className={`${width} h-5 animate-pulse rounded bg-slate-200`}></div>
)

const isLoading = (value) => !value || value === 'Đang cập nhật'

// Transform history API format to current format
const transformHistoryData = (historyData) => {
  if (!historyData || historyData.G1) return historyData // Already in correct format

  // Convert history format (prize1, prize2_1, etc.) to display format (G1, G2, etc.)
  return {
    ĐB: [historyData.special],
    G1: [historyData.prize1],
    G2: [historyData.prize2_1, historyData.prize2_2],
    G3: [
      historyData.prize3_1,
      historyData.prize3_2,
      historyData.prize3_3,
      historyData.prize3_4,
      historyData.prize3_5,
      historyData.prize3_6,
    ],
    G4: [
      historyData.prize4_1,
      historyData.prize4_2,
      historyData.prize4_3,
      historyData.prize4_4,
    ],
    G5: [
      historyData.prize5_1,
      historyData.prize5_2,
      historyData.prize5_3,
      historyData.prize5_4,
      historyData.prize5_5,
      historyData.prize5_6,
    ],
    G6: [historyData.prize6_1, historyData.prize6_2, historyData.prize6_3],
    G7: [
      historyData.prize7_1,
      historyData.prize7_2,
      historyData.prize7_3,
      historyData.prize7_4,
    ],
  }
}

export const ResultsTable = ({ results }) => {
  if (!results) return null

  // Transform data if it's from history API
  const displayResults = transformHistoryData(results)

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
            {isLoading(displayResults.G1?.[0]) ? (
              <SkeletonNumber width="w-16" />
            ) : (
              displayResults.G1[0]
            )}
          </div>
        </div>

        {/* G2 */}
        <div className="flex items-center border-b border-slate-100 px-3 py-2.5">
          <div className="w-12 flex-none text-xs font-bold text-slate-500">
            G2
          </div>
          <div className="flex flex-1 flex-wrap justify-center gap-x-6 gap-y-1 text-center text-base font-bold tracking-wider text-slate-800">
            {!displayResults.G2 ||
            displayResults.G2.length === 0 ||
            isLoading(displayResults.G2[0]) ? (
              <>
                <SkeletonNumber width="w-14" />
                <SkeletonNumber width="w-14" />
              </>
            ) : (
              displayResults.G2.map((num, idx) => <span key={idx}>{num}</span>)
            )}
          </div>
        </div>

        {/* G3 */}
        <div className="flex items-center border-b border-slate-100 px-3 py-2.5">
          <div className="w-12 flex-none text-xs font-bold text-slate-500">
            G3
          </div>
          <div className="grid flex-1 grid-cols-3 gap-x-3 gap-y-1.5 text-center text-base font-medium tracking-wider text-slate-800">
            {!displayResults.G3 ||
            displayResults.G3.length === 0 ||
            isLoading(displayResults.G3[0]) ? (
              <>
                <SkeletonNumber width="w-14" />
                <SkeletonNumber width="w-14" />
                <SkeletonNumber width="w-14" />
                <SkeletonNumber width="w-14" />
                <SkeletonNumber width="w-14" />
                <SkeletonNumber width="w-14" />
              </>
            ) : (
              displayResults.G3.map((num, idx) => <span key={idx}>{num}</span>)
            )}
          </div>
        </div>

        {/* G4 */}
        <div className="flex items-center border-b border-slate-100 px-3 py-2.5">
          <div className="w-12 flex-none text-xs font-bold text-slate-500">
            G4
          </div>
          <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-1.5 text-center text-base font-medium tracking-wider text-slate-800">
            {!displayResults.G4 ||
            displayResults.G4.length === 0 ||
            isLoading(displayResults.G4[0]) ? (
              <>
                <SkeletonNumber width="w-12" />
                <SkeletonNumber width="w-12" />
                <SkeletonNumber width="w-12" />
                <SkeletonNumber width="w-12" />
              </>
            ) : (
              displayResults.G4.map((num, idx) => <span key={idx}>{num}</span>)
            )}
          </div>
        </div>

        {/* G5 */}
        <div className="flex items-center border-b border-slate-100 px-3 py-2.5">
          <div className="w-12 flex-none text-xs font-bold text-slate-500">
            G5
          </div>
          <div className="grid flex-1 grid-cols-3 gap-x-2 gap-y-1.5 text-center text-base font-medium tracking-wider text-slate-800">
            {!displayResults.G5 ||
            displayResults.G5.length === 0 ||
            isLoading(displayResults.G5[0]) ? (
              <>
                <SkeletonNumber width="w-10" />
                <SkeletonNumber width="w-10" />
                <SkeletonNumber width="w-10" />
                <SkeletonNumber width="w-10" />
                <SkeletonNumber width="w-10" />
                <SkeletonNumber width="w-10" />
              </>
            ) : (
              displayResults.G5.map((num, idx) => <span key={idx}>{num}</span>)
            )}
          </div>
        </div>

        {/* G6 */}
        <div className="flex items-center border-b border-slate-100 px-3 py-2.5">
          <div className="w-12 flex-none text-xs font-bold text-slate-500">
            G6
          </div>
          <div className="flex flex-1 flex-wrap justify-center gap-x-5 gap-y-1 text-center text-base font-medium tracking-wider text-slate-800">
            {!displayResults.G6 ||
            displayResults.G6.length === 0 ||
            isLoading(displayResults.G6[0]) ? (
              <>
                <SkeletonNumber width="w-10" />
                <SkeletonNumber width="w-10" />
                <SkeletonNumber width="w-10" />
              </>
            ) : (
              displayResults.G6.map((num, idx) => <span key={idx}>{num}</span>)
            )}
          </div>
        </div>

        {/* G7 */}
        <div className="flex items-center px-3 py-2.5">
          <div className="w-12 flex-none text-xs font-bold text-slate-500">
            G7
          </div>
          <div className="flex flex-1 flex-wrap justify-center gap-x-5 gap-y-1 text-center text-base font-bold tracking-wider text-slate-800">
            {!displayResults.G7 ||
            displayResults.G7.length === 0 ||
            isLoading(displayResults.G7[0]) ? (
              <>
                <SkeletonNumber width="w-8" />
                <SkeletonNumber width="w-8" />
                <SkeletonNumber width="w-8" />
                <SkeletonNumber width="w-8" />
              </>
            ) : (
              displayResults.G7.map((num, idx) => (
                <span key={idx} className="text-primary">
                  {num}
                </span>
              ))
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
