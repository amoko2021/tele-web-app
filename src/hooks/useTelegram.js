import { useEffect, useState } from 'react'

export const useTelegram = () => {
  const [tg] = useState(window.Telegram?.WebApp)

  useEffect(() => {
    tg?.ready()
    tg?.expand()
  }, [tg])

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    closeApp: () => tg?.close(),
  }
}
