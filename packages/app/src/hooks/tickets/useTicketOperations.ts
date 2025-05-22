'use client'

import { useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { useNotifications } from '@/context/notifications'
import { ticketContractAbi } from '@/abis'
import { useTransactionState } from '../web3/useTransactionState'

/**
 * Hook for ticket contract operations
 */
export function useTicketOperations(
  contractAddress: `0x${string}` | undefined,
  chain?: { blockExplorers?: { default: { url: string } } }
) {
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

  // Create a new ticket
  const createTicket = (name: string, price: string, amount: string, maxSellPerPerson: string, infoUrl: string) => {
    resetTransactionState()
    setIsTransactionLoading(true)

    if (!contractAddress) {
      setTransactionError(new Error('Contract address is undefined'))
      setIsTransactionLoading(false)
      Add(`Error preparing transaction: Contract address is undefined`, {
        type: 'error',
      })
      return
    }

    try {
      writeContract({
        address: contractAddress,
        abi: ticketContractAbi,
        functionName: 'create',
        args: [name, parseEther(price), BigInt(amount), BigInt(maxSellPerPerson), infoUrl, '0x'],
      })
    } catch (e) {
      setTransactionError(e as Error)
      setIsTransactionLoading(false)
      Add(`Error preparing transaction: ${(e as Error).message}`, {
        type: 'error',
      })
    }
  }

  // Buy a ticket
  const buyTicket = (ticketId: bigint, amount: number) => {
    resetTransactionState()
    setIsTransactionLoading(true)

    if (!contractAddress) {
      setTransactionError(new Error('Contract address is undefined'))
      setIsTransactionLoading(false)
      Add(`Error preparing transaction: Contract address is undefined`, {
        type: 'error',
      })
      return
    }

    try {
      writeContract({
        address: contractAddress,
        abi: ticketContractAbi,
        functionName: 'buy',
        args: [ticketId, BigInt(amount), '0x'],
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
    createTicket,
    buyTicket,
    isTransactionLoading,
    isTransactionSuccess,
    transactionError,
    transactionHash,
  }
}
