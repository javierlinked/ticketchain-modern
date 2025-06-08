'use client'

import { useState, useEffect } from 'react'
import { useReadContract } from 'wagmi'
import { ticketContractAbi } from '@/abis'

export interface TicketDetails {
  id: bigint
  name: string
  price: bigint
  maxSellPerPerson: bigint
  infoUrl: string
}

type TicketData = [
  id: bigint, // uint id
  name: string, // string name
  price: bigint, // uint price
  maxSellPerPerson: bigint, // uint maxSellPerPerson
  infoUrl: string // string infoUrl
]

/**
 * Hook to manage ticket data and state
 */
export function useTicketData(contractAddress: `0x${string}` | undefined) {
  // Ticket state
  const [ticketIds, setTicketIds] = useState<bigint[]>([])
  const [selectedTicketId, setSelectedTicketId] = useState<bigint | null>(null)
  const [ticketDetails, setTicketDetails] = useState<TicketDetails | null>(null)
  const [ticketAmount, setTicketAmount] = useState(1)

  const { data: ticketIdsLength } = useReadContract({
    address: contractAddress,
    abi: ticketContractAbi,
    functionName: 'tokenIdsLength',
  })

  const { data: selectedTicketData, refetch: refetchTicketDetails } = useReadContract({
    address: selectedTicketId ? contractAddress : undefined,
    abi: ticketContractAbi,
    functionName: 'tickets',
    args: selectedTicketId ? [selectedTicketId] : undefined,
  }) as { data: TicketData | undefined; refetch: () => void }

  useEffect(() => {
    const loadTicketIds = async () => {
      if (!ticketIdsLength || Number(ticketIdsLength) === 0) {
        setTicketIds([])
        return
      }

      const ids: bigint[] = []
      for (let i = 0; i < Number(ticketIdsLength); i++) {
        // Simplified for demo
        // In real implementation, this would fetch each ticketId
      }
      setTicketIds(ids)
    }
    loadTicketIds()
  }, [ticketIdsLength])

  useEffect(() => {
    if (selectedTicketData) {
      const [_, name, price, maxSellPerPerson, infoUrl] = selectedTicketData

      setTicketDetails({
        id: selectedTicketId!,
        name: name,
        price: price,
        maxSellPerPerson: maxSellPerPerson,
        infoUrl: infoUrl,
      })
    } else {
      setTicketDetails(null)
    }
  }, [selectedTicketData, selectedTicketId])

  const selectTicket = (ticketId: bigint | null) => {
    setSelectedTicketId(ticketId)
    if (ticketId) {
      refetchTicketDetails()
    }
  }

  return {
    ticketIds,
    selectedTicketId,
    ticketDetails,
    ticketAmount,
    selectTicket,
    setTicketAmount,
  }
}
