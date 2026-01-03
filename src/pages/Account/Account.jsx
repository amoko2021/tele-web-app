import styles from './Account.module.css'

export const Account = () => {
  return (
    <div className={styles.container}>
      <h1>Account</h1>
      <p>Thông tin tài khoản của bạn</p>
      <div className={styles.content}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <span>👤</span>
          </div>
          <h3>Người dùng</h3>
          <p>user@example.com</p>
        </div>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span>Tên:</span>
            <span>Người dùng</span>
          </div>
          <div className={styles.infoItem}>
            <span>Email:</span>
            <span>user@example.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}
