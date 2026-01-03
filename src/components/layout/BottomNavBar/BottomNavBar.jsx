import { NavLink } from 'react-router-dom'
import { Home, User, Settings } from 'lucide-react'
import styles from './BottomNavBar.module.css'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/account', icon: User, label: 'Account' },
  { path: '/settings', icon: Settings, label: 'Settings' },
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
          <Icon size={24} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
