import { useEffect, useState, useCallback } from 'react'
import { readContract } from '@/services/contract/contractService'
import { ticketContractAbi } from '@/abis'
import { OwnedTicket, Ticket, TicketDetails } from '@/types/tickets'

export function useOwnedTickets(
  contractAddress: `0x${string}`,
  address: `0x${string}` | undefined,
  ticketIds: bigint[],
  refreshKey?: number
) {
  const [ownedTickets, setOwnedTickets] = useState<OwnedTicket[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOwned = useCallback(async () => {
    if (!address) return
    setLoading(true)
    setError(null)
    try {
      const owned: OwnedTicket[] = []

      for (const id of ticketIds) {
        try {
          const balance = await readContract<bigint>({
            address: contractAddress,
            abi: ticketContractAbi,
            functionName: 'balanceOf',
            args: [address, id],
          })

          if (balance > BigInt(0)) {
            const ticketDetails = await readContract<TicketDetails>({
              address: contractAddress,
              abi: ticketContractAbi,
              functionName: 'tickets',
              args: [id],
            })

            console.log(`Ticket ${id} details:`, ticketDetails)

            // The contract returns an array of values (tuple)
            // Based on the TicketDetails type, the order is [id, name, price, maxSellPerPerson, infoUrl]
            // The second element (index 1) is the name
            const name = ticketDetails[1]

            if (!name || name === '') {
              console.error(`Ticket ${id} has no name in contract response:`, ticketDetails)
            }

            owned.push({
              id,
              name: name || `Ticket #${id.toString()}`,
              quantity: balance,
            })
          }
        } catch (ticketError) {
          console.error(`Error processing ticket ${id}:`, ticketError)
        }
      }

      setOwnedTickets(owned)
    } catch (err) {
      console.error('Error fetching owned tickets:', err)
      setError('Failed to load owned tickets')
    } finally {
      setLoading(false)
    }
  }, [contractAddress, address, ticketIds])

  useEffect(() => {
    if (contractAddress && address && ticketIds.length > 0) fetchOwned()
  }, [contractAddress, address, ticketIds, fetchOwned, refreshKey])

  const refetch = useCallback(() => {
    if (contractAddress && address && ticketIds.length > 0) {
      return fetchOwned()
    }
    return Promise.resolve()
  }, [contractAddress, address, ticketIds, fetchOwned])

  return {
    ownedTickets,
    loading,
    error,
    refetch,
  }
}
