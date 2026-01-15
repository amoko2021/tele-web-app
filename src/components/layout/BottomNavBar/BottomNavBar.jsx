import { NavLink } from 'react-router-dom'
import { Home, User, Navigation } from 'lucide-react'
import styles from './BottomNavBar.module.css'
import { UI_TEXT } from '../../../config/uiText'

const navItems = [
  { path: '/account', icon: User, label: UI_TEXT.navigation.account },
  { path: '/', icon: Home, label: UI_TEXT.navigation.home, variant: 'primary' },
  { path: '/invite', icon: Navigation, label: UI_TEXT.navigation.invite },
]

export const BottomNavBar = () => {
  return (
    <nav className={styles.navbar} aria-label={UI_TEXT.navigation.ariaLabel}>
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
