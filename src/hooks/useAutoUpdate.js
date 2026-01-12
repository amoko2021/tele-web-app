import { useEffect } from 'react'
import { logger } from '../services/logger'

export const useAutoUpdate = (checkInterval = 30000) => {
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const res = await fetch('/version.json?t=' + Date.now())
        if (!res.ok) return
        
        const data = await res.json()
        const remoteVersion = data.version
        
        // __APP_VERSION__ is injected by Vite build process
        if (remoteVersion !== __APP_VERSION__) {
          logger.info('System', 'New version detected, reloading...', { 
            current: __APP_VERSION__, 
            new: remoteVersion 
          })
          
          // Clear cache and reload
          if ('caches' in window) {
            try {
              const names = await caches.keys()
              await Promise.all(names.map(name => caches.delete(name)))
            } catch (e) {
              console.error('Error clearing caches:', e)
            }
          }
          window.location.reload(true)
        }
      } catch (err) {
        // Silent fail for version check
        console.error('Auto update check failed:', err)
      }
    }

    // Check immediately
    checkVersion()
    
    // Check periodically
    const interval = setInterval(checkVersion, checkInterval)
    return () => clearInterval(interval)
  }, [checkInterval])
}
