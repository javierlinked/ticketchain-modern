import { useEffect, useState, useCallback } from 'react'
import { readContract } from '@/services/contract/contractService'
import { ticketContractAbi } from '@/abis'
import { OwnedTicket } from '@/types/tickets'

export function useOwnedTickets(
  contractAddress: `0x${string}`,
  address: `0x${string}` | undefined,
  ticketIds: bigint[]
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
        const balance = await readContract<bigint>({
          address: contractAddress,
          abi: ticketContractAbi,
          functionName: 'balanceOf',
          args: [address, id],
        })
        if (balance > BigInt(0)) {
          owned.push({ id, name: '', quantity: balance })
        }
      }
      setOwnedTickets(owned)
    } catch (err) {
      setError('Failed to load owned tickets')
    } finally {
      setLoading(false)
    }
  }, [contractAddress, address, ticketIds])

  useEffect(() => {
    if (contractAddress && address && ticketIds.length > 0) fetchOwned()
  }, [contractAddress, address, ticketIds, fetchOwned])

  return { ownedTickets, loading, error, refetch: fetchOwned }
}
