import { useState, useCallback, useEffect } from 'react'
import { useReadContract } from 'wagmi'
import { ticketContractAbi } from '@/abis'
import { readContract } from '@/services/contract/contractService'

export function useTicketIds(contractAddress: `0x${string}` | undefined, isContractOwner: boolean) {
  const [ticketIds, setTicketIds] = useState<bigint[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: ticketIdsLength } = useReadContract({
    address: contractAddress,
    abi: ticketContractAbi,
    functionName: 'tokenIdsLength',
  })

  const fetchTicketIds = useCallback(async () => {
    if (!ticketIdsLength || !contractAddress || isContractOwner) {
      setTicketIds([])
      return
    }
    setLoading(true)
    setError(null)
    try {
      const ids: bigint[] = []
      const safeLength = Math.min(Number(ticketIdsLength), 100)
      for (let i = 0; i < safeLength; i++) {
        try {
          const id = await readContract<bigint>({
            address: contractAddress,
            abi: ticketContractAbi,
            functionName: 'tokenIds',
            args: [BigInt(i)],
          })
          if (id) ids.push(id)
        } catch (error) {
          // Continue to next ID
        }
      }
      setTicketIds(ids)
    } catch (err) {
      setError('Failed to load ticket IDs')
    } finally {
      setLoading(false)
    }
  }, [contractAddress, ticketIdsLength, isContractOwner])

  useEffect(() => {
    fetchTicketIds()
  }, [fetchTicketIds])

  return { ticketIds, loading, error, refetch: fetchTicketIds }
}
