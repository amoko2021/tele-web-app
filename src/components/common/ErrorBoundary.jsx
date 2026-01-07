import { Component } from 'react'
import { logger } from '../../services/logger'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    logger.error('React Error Boundary caught an error', error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-background-light p-4">
          <div className="bg-surface-light rounded-lg p-6 max-w-md text-center">
            <span className="material-symbols-outlined text-red-500 text-4xl mb-4">
              error
            </span>
            <h1 className="text-xl font-semibold mb-2">Có lỗi xảy ra</h1>
            <p className="text-slate-600 mb-4">
              Ứng dụng gặp sự cố không mong muốn. Vui lòng thử lại sau.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
