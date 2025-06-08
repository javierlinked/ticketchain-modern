import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ticketContractAbi } from '@/abis'
import { useNotifications } from '@/context/notifications'
import { useCallback, useEffect, useRef } from 'react'

export function useBuyTicket(contractAddress: `0x${string}`) {
  const { Add } = useNotifications()
  const { data: buyTxData, writeContract } = useWriteContract()
  const { isLoading, error, isSuccess } = useWaitForTransactionReceipt({ hash: buyTxData })

  const successNotifiedRef = useRef(false)
  const errorNotifiedRef = useRef(false)
  const currentTxHashRef = useRef<`0x${string}` | undefined>(undefined)

  useEffect(() => {
    if (buyTxData !== currentTxHashRef.current) {
      successNotifiedRef.current = false
      errorNotifiedRef.current = false
      currentTxHashRef.current = buyTxData
    }
  }, [buyTxData])

  useEffect(() => {
    if (isSuccess && !successNotifiedRef.current && buyTxData) {
      Add('Successfully purchased ticket!', { type: 'success' })
      successNotifiedRef.current = true
    }

    if (error && !errorNotifiedRef.current && buyTxData) {
      Add(`Failed to purchase ticket: ${error.message || 'Transaction failed'}`, {
        type: 'error',
      })
      errorNotifiedRef.current = true
    }
  }, [isSuccess, error, Add, buyTxData])

  const buyTicket = useCallback(
    (ticketId: bigint, quantity: number, price: bigint) => {
      const totalPrice = price * BigInt(quantity)
      const emptyBytes = '0x'

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

  return { buyTicket, isLoading, isSuccess }
}
