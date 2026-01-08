import { useMemo } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import md5 from 'crypto-js/md5'

// Replace with your actual app secure hash from CPX Research
const APP_SECURE_HASH = '7kvhJ8lE03UyvH9vvXiG2k90em4UcPrB'
const APP_ID = '30866'

export const Test = () => {
  const { validationData, isValidating } = useTelegram()

  const iframeUrl = useMemo(() => {
    if (!validationData?.user) return null

    const user = validationData.user
    const userId = user.id
    const username = user.username || user.first_name || ''
    const email = '' // Telegram doesn't provide email

    // Generate secure hash: md5(userId-APP_SECURE_HASH)
    const hashInput = `${userId}-${APP_SECURE_HASH}`
    const secureHash = md5(hashInput).toString()

    const params = new URLSearchParams({
      app_id: APP_ID,
      ext_user_id: userId.toString(),
      secure_hash: secureHash,
      username: username,
      email: email,
      subid_1: '',
      subid_2: '',
    })

    return `https://offers.cpx-research.com/index.php?${params.toString()}`
  }, [validationData])

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">
            CPX Research
          </h1>

          {isValidating && (
            <div className="text-center py-8 text-slate-600">
              Đang xác thực người dùng...
            </div>
          )}

          {!isValidating && !validationData && (
            <div className="text-center py-8 text-red-600">
              Không thể xác thực người dùng Telegram
            </div>
          )}

          {!isValidating && iframeUrl && (
            <iframe
              width="100%"
              frameBorder="0"
              height="2000px"
              src={iframeUrl}
              title="CPX Research Offers"
              className="border-0"
            />
          )}
        </div>
      </main>
    </div>
  )
}
