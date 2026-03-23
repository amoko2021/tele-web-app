import { UI_TEXT } from '../../../../config/uiText'

export const SpecialPrize = ({ number, myPredictions }) => {
  // Extract winning predictions for DB
  const winningPredictions = {
    db2: [],
    db3: [],
    loto2: [],
    loto3: []
  }

  if (myPredictions) {
    myPredictions.forEach(cat => {
      if (cat.numbers && cat.is_win) {
        cat.numbers.forEach((num, idx) => {
          if (cat.is_win[idx]) {
            if (cat.id === 1) winningPredictions.db2.push(num)
            if (cat.id === 2) winningPredictions.loto2.push(num)
            if (cat.id === 3) winningPredictions.db3.push(num)
            if (cat.id === 4) winningPredictions.loto3.push(num)
          }
        })
      }
    })
  }

  const renderNumber = (num) => {
    if (!num || num === '-----') return num;
    
    let highlightLength = 0;
    
    const last3 = num.slice(-3);
    const last2 = num.slice(-2);
    
    if (winningPredictions.db3.includes(last3)) highlightLength = 3;
    else if (winningPredictions.db2.includes(last2)) highlightLength = 2;
    else if (winningPredictions.loto3.includes(last3)) highlightLength = 3;
    else if (winningPredictions.loto2.includes(last2)) highlightLength = 2;
    
    if (highlightLength > 0) {
      const normalPart = num.slice(0, num.length - highlightLength);
      const highlightPart = num.slice(-highlightLength);
      return (
        <span>
          {normalPart}
          <span className="text-green-600 font-black bg-green-100 px-1 rounded">{highlightPart}</span>
        </span>
      );
    }
    
    return num;
  }

  return (
    <div className="relative px-4 pt-3 pb-1.5">
      <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white border border-red-100 p-3 shadow-[0_4px_20px_-4px_rgba(220,38,38,0.1)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#fee2e2_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
        <span className="relative z-10 rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-600">
          {UI_TEXT.home.prizeSection.specialPrize}
        </span>
        <h2 className="relative z-10 text-2xl font-extrabold tracking-widest text-red-600 drop-shadow-sm">
          {renderNumber(number || '-----')}
        </h2>
      </div>
    </div>
  )
}

