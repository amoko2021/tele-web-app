import { useMemo } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import { Loading } from '../../components/common/Loading'
import CryptoJS from 'crypto-js'

// Replace with your actual app secure hash from CPX Research
const APP_SECURE_HASH = '7kvhJ8lE03UyvH9vvXiG2k90em4UcPrB'
const APP_ID = '30866'

export const Test = () => {
  const { validationData, isValidating, user: telegramUser } = useTelegram()

  const iframeUrl = useMemo(() => {
    // Lấy user data giống như trong Home.jsx
    const userData = validationData?.data?.user || telegramUser
    if (!userData) return null

    const userId = userData.id
    const username = userData.username || userData.first_name || ''
    const email = '' // Telegram doesn't provide email

    // Generate secure hash: md5(userId-APP_SECURE_HASH)
    const hashInput = `${userId}-${APP_SECURE_HASH}`
    const secureHash = CryptoJS.MD5(hashInput).toString()

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
  }, [validationData, telegramUser])

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 overflow-y-auto pb-20">
        {isValidating && (
          <div className="flex items-center justify-center h-full">
            <Loading />
          </div>
        )}

        {!isValidating && !iframeUrl && (
          <div className="text-center py-8 text-red-600">
            Không thể xác thực người dùng Telegram
          </div>
        )}

        {!isValidating && iframeUrl && (
          <iframe
            width="100%"
            frameBorder="0"
            height="100%"
            src={iframeUrl}
            title="CPX Research Offers"
            className="border-0"
            style={{ minHeight: 'calc(100vh - 80px)' }}
          />
        )}
      </main>
    </div>
  )
}
