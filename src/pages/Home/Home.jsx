import styles from './Home.module.css'

export const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <p>Chào mừng đến với trang chủ</p>
      <div className={styles.content}>
        <div className={styles.card}>
          <h3>Thông tin</h3>
          <p>Đây là trang chủ của ứng dụng</p>
        </div>
      </div>
    </div>
  )
}
