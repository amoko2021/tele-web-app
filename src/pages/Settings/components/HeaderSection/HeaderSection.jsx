import { UI_TEXT } from '../../../../config/uiText'

export const HeaderSection = () => {
  return (
    <header className="text-center space-y-2 pt-8 px-4">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {UI_TEXT.settings.header.title}
      </h1>
      <p className="text-slate-500 dark:text-slate-300 text-sm font-medium">
        {UI_TEXT.settings.header.subtitle}
      </p>
    </header>
  )
}

