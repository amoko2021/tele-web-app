import styles from './Settings.module.css'

export const Settings = () => {
  return (
    <div className={styles.container}>
      <h1>Settings</h1>
      <p>Cài đặt ứng dụng</p>
      <div className={styles.content}>
        <div className={styles.section}>
          <h3>Chung</h3>
          <div className={styles.settingItem}>
            <span>Ngôn ngữ</span>
            <span>Tiếng Việt</span>
          </div>
          <div className={styles.settingItem}>
            <span>Chế độ tối</span>
            <span>Tắt</span>
          </div>
        </div>
        <div className={styles.section}>
          <h3>Thông báo</h3>
          <div className={styles.settingItem}>
            <span>Cho phép thông báo</span>
            <span>Bật</span>
          </div>
          <div className={styles.settingItem}>
            <span>Âm thanh</span>
            <span>Bật</span>
          </div>
        </div>
      </div>
    </div>
  )
}
