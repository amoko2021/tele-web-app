import { NavLink } from 'react-router-dom'
import { Home, User, Navigation } from 'lucide-react'
import styles from './BottomNavBar.module.css'

const navItems = [
  { path: '/account', icon: User, label: 'Tài khoản' },
  { path: '/', icon: Home, label: 'Trang chủ', variant: 'primary' },
  { path: '/settings', icon: Navigation, label: 'Mời bạn bè' },
]

export const BottomNavBar = () => {
  return (
    <nav className={styles.navbar} aria-label="Điều hướng chính">
      {navItems.map(({ path, icon: Icon, label, variant }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            [
              styles.navItem,
              variant === 'primary' ? styles.primaryItem : '',
              isActive ? styles.active : '',
            ]
              .filter(Boolean)
              .join(' ')
          }
        >
          <div className={styles.iconWrapper}>
            <Icon size={24} className={styles.icon} strokeWidth={1.6} />
          </div>
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
