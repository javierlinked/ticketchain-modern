'use client'

import { useState, useEffect } from 'react'
import { useWaitForTransactionReceipt } from 'wagmi'
import { useNotifications } from '@/context/notifications'

/**
 * Custom hook to manage transaction state
 */
export function useTransactionState(
  txData: `0x${string}` | undefined,
  chain?: { blockExplorers?: { default: { url: string } } }
) {
  const [isTransactionLoading, setIsTransactionLoading] = useState(false)
  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false)
  const [transactionError, setTransactionError] = useState<Error | null>(null)
  const [transactionHash, setTransactionHash] = useState<`0x${string}` | undefined>()
  const { Add } = useNotifications()

  const { isLoading: txLoading, error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash: txData })

  useEffect(() => {
    setIsTransactionLoading(txLoading)
    if (txSuccess) {
      setIsTransactionSuccess(true)
      setTransactionHash(txData)
      Add(`Transaction successful`, {
        type: 'success',
        href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${txData}` : undefined,
      })
    } else if (txError) {
      setTransactionError(txError)
      Add(`Transaction failed: ${txError.cause}`, {
        type: 'error',
      })
    }
  }, [txSuccess, txError, txLoading, txData, Add, chain])

  const resetTransactionState = () => {
    setIsTransactionLoading(false)
    setTransactionError(null)
    setIsTransactionSuccess(false)
  }

  return {
    isTransactionLoading,
    isTransactionSuccess,
    transactionError,
    transactionHash,
    resetTransactionState,
    setIsTransactionLoading,
    setTransactionError,
  }
}
