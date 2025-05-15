import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ticketContractAbi } from '@/abis'
import { useNotifications } from '@/context/Notifications'
import { useEffect, useState } from 'react'

export function useBuyTicket(contractAddress: `0x${string}`) {
  const { Add } = useNotifications()
  const { data: buyTxData, writeContract } = useWriteContract()
  const { isLoading, error, isSuccess } = useWaitForTransactionReceipt({ hash: buyTxData })
  const [pending, setPending] = useState(false)

  const buyTicket = (ticketId: bigint, quantity: number, price: bigint) => {
    setPending(true)
    const totalPrice = price * BigInt(quantity)
    writeContract({
      address: contractAddress,
      abi: ticketContractAbi,
      functionName: 'buy',
      args: [ticketId, BigInt(quantity), '0x'],
      value: totalPrice,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      Add('Successfully purchased ticket!', { type: 'success' })
      setPending(false)
    }
    if (error) {
      Add('Failed to purchase ticket', { type: 'error' })
      setPending(false)
    }
  }, [isSuccess, error, Add])

  return { buyTicket, isLoading: isLoading || pending, error }
}
