'use client'

import { useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { erc20Abi } from 'viem'
import { useNotifications } from '@/context/notifications'
import { useTransactionState } from '../web3/useTransactionState'

/**
 * Hook for ERC20 token operations
 */
export function useTokenOperations(chain?: { blockExplorers?: { default: { url: string } } }) {
  const { Add } = useNotifications()
  const { data: txData, writeContract } = useWriteContract()
  const {
    isTransactionLoading,
    isTransactionSuccess,
    transactionError,
    transactionHash,
    resetTransactionState,
    setIsTransactionLoading,
    setTransactionError,
  } = useTransactionState(txData, chain)

  // Send ERC20 token to another address
  const sendERC20Token = (tokenAddress: `0x${string}`, to: `0x${string}`, amount: string) => {
    resetTransactionState()
    setIsTransactionLoading(true)

    try {
      writeContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [to, parseEther(amount)],
      })
    } catch (e) {
      setTransactionError(e as Error)
      setIsTransactionLoading(false)
      Add(`Error preparing transaction: ${(e as Error).message}`, {
        type: 'error',
      })
    }
  }

  return {
    sendERC20Token,
    isTransactionLoading,
    isTransactionSuccess,
    transactionError,
    transactionHash,
  }
}
