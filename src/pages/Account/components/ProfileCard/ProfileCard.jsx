import { UI_TEXT } from '../../../../config/uiText'

export const ProfileCard = ({ userData }) => {
  return (
    <div className="flex flex-col items-center pt-8 pb-6 px-4">
      <div className="relative mb-4">
        <div
          className="w-24 h-24 rounded-full bg-cover bg-center border-4 border-slate-50 dark:border-slate-800 shadow-sm bg-gradient-to-br from-primary to-blue-600"
          style={{
            backgroundImage:
              userData?.photo_url || userData?.photoUrl
                ? `url('${userData.photo_url || userData.photoUrl}')`
                : undefined,
          }}
        >
          {!(userData?.photo_url || userData?.photoUrl) && (
            <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
              {(userData?.first_name || userData?.firstName)?.[0] || 'U'}
            </div>
          )}
        </div>
        <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900"></div>
      </div>
      <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">
        {userData?.first_name || userData?.firstName}{' '}
        {userData?.last_name || userData?.lastName}
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
        {userData?.username && `@${userData.username}`}
      </p>
      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
        {UI_TEXT.account.profile.uid}: {userData?.id}
      </p>
    </div>
  )
}

