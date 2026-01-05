import { useCallback, useEffect, useRef, useState } from 'react'

export function useAdsgram({ blockId, fallbackBlockId, onReward, onError }) {
  const AdControllerRef = useRef(undefined)
  const [currentBlockId, setCurrentBlockId] = useState(blockId)

  useEffect(() => {
    AdControllerRef.current = window.Adsgram?.init({ blockId: currentBlockId })
  }, [currentBlockId])

  return useCallback(async () => {
    if (AdControllerRef.current) {
      AdControllerRef.current
        .show()
        .then(() => {
          // user watch ad till the end or close it in interstitial format
          onReward()
        })
        .catch((result) => {
          // user get error during playing ad
          // Nếu có fallback blockId và đang dùng blockId chính, thử fallback
          if (fallbackBlockId && currentBlockId === blockId) {
            console.log('Primary blockId failed, trying fallback:', fallbackBlockId)
            setCurrentBlockId(fallbackBlockId)
            // Khởi tạo lại AdController với fallback blockId
            setTimeout(() => {
              const fallbackController = window.Adsgram?.init({ blockId: fallbackBlockId })
              if (fallbackController) {
                fallbackController
                  .show()
                  .then(() => onReward())
                  .catch((fallbackResult) => {
                    console.error('Fallback blockId also failed:', fallbackResult)
                    onError?.(fallbackResult)
                  })
              } else {
                onError?.(result)
              }
            }, 100)
          } else {
            onError?.(result)
          }
        })
    } else {
      onError?.({
        error: true,
        done: false,
        state: 'load',
        description: 'Adsgram script not loaded',
      })
    }
  }, [onError, onReward, blockId, fallbackBlockId, currentBlockId])
}
