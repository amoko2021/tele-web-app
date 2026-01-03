import { NavLink } from 'react-router-dom'
import { Home, User, Settings } from 'lucide-react'
import styles from './BottomNavBar.module.css'

const navItems = [
  { path: '/', icon: Home, label: 'Trang chủ' },
  { path: '/account', icon: User, label: 'Tài khoản' },
  { path: '/settings', icon: Settings, label: 'Cài đặt' },
]

export const BottomNavBar = () => {
  return (
    <nav className={styles.navbar}>
      {navItems.map(({ path, icon: Icon, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ''}`
          }
        >
          <div className={styles.iconWrapper}>
            <Icon size={26} className={styles.icon} strokeWidth={1.5} />
          </div>
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
