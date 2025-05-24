import { useEffect, useState, useCallback } from 'react'
import { readContract } from '@/services/contract/contractService'
import { ticketContractAbi } from '@/abis'
import { Ticket, TicketDetails } from '@/types/tickets'

export function useAvailableTickets(contractAddress: `0x${string}`, ticketIds: bigint[], refreshKey?: number) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTickets = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const results: Ticket[] = []
      for (const id of ticketIds) {
        const details = await readContract<TicketDetails>({
          address: contractAddress,
          abi: ticketContractAbi,
          functionName: 'tickets',
          args: [id],
        })
        if (details) {
          results.push({
            id,
            name: details[1] || 'Unknown Ticket',
            price: details[2] || BigInt(0),
            available: BigInt(0), // Update if your contract supports supply
            maxSellPerPerson: details[3] || BigInt(1),
            infoUrl: details[4] || '',
          })
        }
      }
      setTickets(results)
    } catch (err) {
      setError('Failed to load tickets')
    } finally {
      setLoading(false)
    }
  }, [contractAddress, ticketIds])

  useEffect(() => {
    if (contractAddress && ticketIds.length > 0) fetchTickets()
  }, [contractAddress, ticketIds, fetchTickets, refreshKey])

  return { tickets, loading, error, refetch: fetchTickets }
}
