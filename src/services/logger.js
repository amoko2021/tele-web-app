const LOG_API_URL = `${import.meta.env.VITE_API_URL || 'https://betestminiapp-production-9a0b.up.railway.app'}/api/logs`

const getDeviceInfo = () => {
  const tg = window.Telegram?.WebApp
  return {  
    platform: tg?.platform || 'unknown',
    version: tg?.version || 'unknown',
    isExpanded: tg?.isExpanded || false,
    viewportHeight: tg?.viewportHeight || window.innerHeight,
    viewportWidth: tg?.viewportWidth || window.innerWidth,
    userAgent: navigator.userAgent,
    language: navigator.language,
    timestamp: new Date().toISOString(),
  }
}

const getUserInfo = () => {
  const tg = window.Telegram?.WebApp
  return {
    userId: tg?.initDataUnsafe?.user?.id,
    username: tg?.initDataUnsafe?.user?.username,
    firstName: tg?.initDataUnsafe?.user?.first_name,
    lastName: tg?.initDataUnsafe?.user?.last_name,
    languageCode: tg?.initDataUnsafe?.user?.language_code,
  }
}

const sendLogToServer = async (logData) => {
  try {
    const tg = window.Telegram?.WebApp
    const headers = {
      'Content-Type': 'application/json',
    }
    
    if (tg?.initData) {
      headers['Authorization'] = 'tma ' + tg.initData
    }

    await fetch(LOG_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(logData),
    })
  } catch (error) {
    console.error('Failed to send log to server:', error)
  }
}

export const logger = {
  error: (message, error = null, context = {}) => {
    const logData = {
      level: 'error',
      message,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : null,
      context,
      user: getUserInfo(),
      device: getDeviceInfo(),
    }

    console.error('[ERROR]', message, error, context)
    sendLogToServer(logData)
  },

  warn: (message, context = {}) => {
    const logData = {
      level: 'warn',
      message,
      context,
      user: getUserInfo(),
      device: getDeviceInfo(),
    }

    console.warn('[WARN]', message, context)
    sendLogToServer(logData)
  },

  info: (message, context = {}) => {
    const logData = {
      level: 'info',
      message,
      context,
      user: getUserInfo(),
      device: getDeviceInfo(),
    }

    console.info('[INFO]', message, context)
    sendLogToServer(logData)
  },

  apiResponse: (response) => {
    const duration = response.config?.metadata?.startTime
      ? Date.now() - response.config.metadata.startTime
      : null

    let dataPreview = null
    try {
      const serialized = JSON.stringify(response.data)
      dataPreview = serialized.length > 500 ? `${serialized.slice(0, 500)}...` : response.data
    } catch (err) {
      dataPreview = '[unserializable]'
    }

    const logData = {
      level: 'info',
      message: 'API Response',
      context: {
        type: 'api_response',
        request: {
          url: response.config?.url,
          method: response.config?.method,
          headers: response.config?.headers,
        },
        response: {
          status: response.status,
          statusText: response.statusText,
          data: dataPreview,
        },
        duration,
      },
      user: getUserInfo(),
      device: getDeviceInfo(),
    }

    console.info('[API RESPONSE]', logData)
    sendLogToServer(logData)
  },

  apiError: (request, error) => {
    const logData = {
      level: 'error',
      message: 'API Request Failed',
      error: {
        name: error.name,
        message: error.message,
        code: error.code,
        config: error.config ? {
          url: error.config.url,
          method: error.config.method,
          headers: error.config.headers,
        } : null,
        response: error.response ? {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        } : null,
      },
      context: {
        type: 'api_error',
        request: {
          url: request?.url,
          method: request?.method,
        },
      },
      user: getUserInfo(),
      device: getDeviceInfo(),
    }

    console.error('[API ERROR]', logData)
    sendLogToServer(logData)
  },

  appInit: (status, details = {}) => {
    const logData = {
      level: status === 'success' ? 'info' : 'error',
      message: `App Initialization: ${status}`,
      context: {
        type: 'app_init',
        status,
        details,
      },
      user: getUserInfo(),
      device: getDeviceInfo(),
    }

    console.info('[APP INIT]', status, details)
    sendLogToServer(logData)
  },

  telegramInit: (status, details = {}) => {
    const logData = {
      level: status === 'success' ? 'info' : 'error',
      message: `Telegram Initialization: ${status}`,
      context: {
        type: 'telegram_init',
        status,
        details,
      },
      user: getUserInfo(),
      device: getDeviceInfo(),
    }

    console.info('[TELEGRAM INIT]', status, details)
    sendLogToServer(logData)
  },

  validation: (status, details = {}) => {
    const logData = {
      level: status === 'success' ? 'info' : 'error',
      message: `Validation: ${status}`,
      context: {
        type: 'validation',
        status,
        details,
      },
      user: getUserInfo(),
      device: getDeviceInfo(),
    }

    console.info('[VALIDATION]', status, details)
    sendLogToServer(logData)
  },
}

export default logger
