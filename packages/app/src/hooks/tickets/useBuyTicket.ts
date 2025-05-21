import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ticketContractAbi } from '@/abis'
import { useNotifications } from '@/context/Notifications'
import { useCallback, useEffect, useRef } from 'react'

export function useBuyTicket(contractAddress: `0x${string}`) {
  const { Add } = useNotifications()
  const { data: buyTxData, writeContract } = useWriteContract()
  const { isLoading, error, isSuccess } = useWaitForTransactionReceipt({ hash: buyTxData })

  // Use refs to track notification states to avoid re-renders and loops
  const successNotifiedRef = useRef(false)
  const errorNotifiedRef = useRef(false)
  const currentTxHashRef = useRef<`0x${string}` | undefined>(undefined)

  // Reset notification flags when transaction hash changes
  useEffect(() => {
    if (buyTxData !== currentTxHashRef.current) {
      successNotifiedRef.current = false
      errorNotifiedRef.current = false
      currentTxHashRef.current = buyTxData
    }
  }, [buyTxData])

  // Handle success/error notifications
  useEffect(() => {
    if (isSuccess && !successNotifiedRef.current && buyTxData) {
      Add('Successfully purchased ticket!', { type: 'success' })
      successNotifiedRef.current = true
    }

    if (error && !errorNotifiedRef.current && buyTxData) {
      Add('Failed to purchase ticket', {
        type: 'error',
        description: error.message || 'Transaction failed',
      })
      errorNotifiedRef.current = true
    }
  }, [isSuccess, error, Add, buyTxData])

  const buyTicket = useCallback(
    (ticketId: bigint, quantity: number, price: bigint) => {
      const totalPrice = price * BigInt(quantity)
      const emptyBytes = '0x'

      // Reset notification flags before initiating a new transaction
      successNotifiedRef.current = false
      errorNotifiedRef.current = false

      writeContract({
        address: contractAddress,
        abi: ticketContractAbi,
        functionName: 'buy',
        args: [ticketId, BigInt(quantity), emptyBytes as `0x${string}`],
        value: totalPrice,
      })
    },
    [contractAddress, writeContract]
  )

  return { buyTicket, isLoading }
}
