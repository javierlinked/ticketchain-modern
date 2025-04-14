'use client'

import { useAccount, useReadContract } from 'wagmi'
import { useEffect, useState } from 'react'
import CreateScreen from '@/components/CreateScreen'
import BuyTokensScreen from '@/components/BuyTokensScreen'
import { Connect } from '@/components/Connect'
import { ticketContractAbi, ticketContractAddress } from '@/utils/contractConfig'

export default function HomePage() {
  const { address, isConnected } = useAccount()
  const [isOwner, setIsOwner] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if the connected wallet is the contract owner
  const { data: contractOwner, isError } = useReadContract({
    address: ticketContractAddress,
    abi: ticketContractAbi,
    functionName: 'owner',
    enabled: isConnected && !!address,
  })

  useEffect(() => {
    if (isConnected && address && contractOwner) {
      setIsOwner(address.toLowerCase() === (contractOwner as string).toLowerCase())
      setIsLoading(false)
    } else if (isConnected && isError) {
      setIsLoading(false)
      setIsOwner(false)
    } else if (!isConnected) {
      setIsLoading(false)
      setIsOwner(null)
    }
  }, [address, contractOwner, isConnected, isError])

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
        <h1 className="text-3xl font-bold mb-8">TicketChain</h1>
        <p className="mb-6 text-center max-w-md">
          Please connect your wallet to continue. You need an Ethereum wallet to use this application.
        </p>
        <Connect />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isOwner ? <CreateScreen /> : <BuyTokensScreen />}
    </div>
  )
}
