'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { ticketContractAddress, ticketContractAbi } from '@/abis'

/**
 * Hook to check if the current wallet is the contract owner
 */
export function useContractOwnership(contractAddress: `0x${string}` | undefined) {
  const { address } = useAccount()
  const [isContractOwner, setIsContractOwner] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { data: contractOwner } = useReadContract({
    address: contractAddress,
    abi: ticketContractAbi,
    functionName: 'owner',
  })

  useEffect(() => {
    if (address && contractOwner) {
      setIsContractOwner(address.toLowerCase() === contractOwner.toLowerCase())
    } else {
      setIsContractOwner(false)
    }
    setIsLoading(false)
  }, [address, contractOwner])

  return { isContractOwner, isLoading }
}
