'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by error boundary:', error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className='p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4'>
          <h2 className='text-xl font-bold mb-2'>Something went wrong</h2>
          <p className='mb-2'>We encountered an error while rendering this component.</p>
          <div className='bg-red-50 p-2 rounded text-sm font-mono overflow-auto max-h-40'>
            {this.state.error?.message || 'Unknown error'}
          </div>
          <button
            className='mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
            onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
