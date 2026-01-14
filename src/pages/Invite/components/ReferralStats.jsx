export const ReferralStats = ({ stats }) => {
  return (
    <section className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-soft border border-border-light dark:border-border-dark space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-text-dark">Thống kê giới thiệu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-border-light dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">Tổng số lượt giới thiệu</p>
          <p className="text-3xl font-bold mt-1 text-primary">{stats.total}</p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-border-light dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">Thu nhập ước tính</p>
          <p className="text-3xl font-bold mt-1 flex items-center justify-center gap-1 text-accent-green">
            <span>{stats.earnings.toLocaleString()}</span>
            <span className="text-base">VND</span>
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-border-light dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">Đang chờ xử lý</p>
          <p className="text-3xl font-bold mt-1 flex items-center justify-center gap-1 text-orange-500">
            <span>{stats.pending.toLocaleString()}</span>
            <span className="text-base">VND</span>
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center pt-2">
        Bạn nhận được 10 USD cho mỗi lượt giới thiệu đủ điều kiện.
      </p>
    </section>
  )
}
