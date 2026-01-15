import { UI_TEXT } from '../../../config/uiText'

export const ReferralHeader = () => {
  return (
    <header className="text-center space-y-2">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-text-dark">
        {UI_TEXT.settings.invite.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-base font-medium">
        {UI_TEXT.settings.invite.subtitle}
      </p>
    </header>
  )
}
