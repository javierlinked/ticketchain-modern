'use client'
import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useReadContracts } from 'wagmi'
import { ticketContractAddress, ticketContractAbi } from '@/abis'
import Available from './Available'
import Owned from './Owned'

interface TicketDetails {
  id: bigint
  price: bigint
  amount: bigint  // Changed from maxSellPerPerson
  maxSellPerPerson: bigint
  name: string
  infoUrl: string
}

export default function TicketList() {
  const [ticketIds, setTicketIds] = useState<bigint[]>([])
  const [ownedTickets, setOwnedTickets] = useState<Map<bigint, number>>(new Map())
  const [ticketDetails, setTicketDetails] = useState<Map<bigint, TicketDetails>>(new Map())
  const [isLoading, setIsLoading] = useState(true)

  const { address, chain } = useAccount()

  const chainId = chain?.id
  const contractAddress = ticketContractAddress[chainId as keyof typeof ticketContractAddress]

  // Get the list of ticket IDs
  const { data: ticketIdsLength } = useReadContract({
    address: contractAddress,
    abi: ticketContractAbi,
    functionName: 'tokenIdsLength',
    query: {
      enabled: !!contractAddress,
    },
  })


  // Load ticket IDs
  const { data: tokenIds, refetch: refetchTickets } = useReadContracts({
    contracts: Array.from({ length: Number(ticketIdsLength || 0) }, (_, i) => ({
      address: contractAddress,
      abi: ticketContractAbi,
      functionName: 'tokenIds',
      args: [BigInt(i)]
    })),
    query: {
      enabled: !!contractAddress && !!ticketIdsLength && Number(ticketIdsLength) > 0,
      select: (data) => data.map(({ result }) => result).filter(Boolean) as bigint[]
    }
  })

  // Get all ticket details once we have the ticket IDs
  const { data: allTicketDetails } = useReadContracts({
    contracts: tokenIds?.map(id => ({
      address: contractAddress,
      abi: ticketContractAbi,
      functionName: 'tickets',
      args: [id]
    })) || [],
    query: {
      enabled: !!contractAddress && !!tokenIds && tokenIds.length > 0,
    }
  })

  // Get user's balance for all tickets
  const { data: userBalances, refetch: refetchBalances } = useReadContracts({
    contracts: tokenIds?.map(id => ({
      address: contractAddress,
      abi: ticketContractAbi,
      functionName: 'balanceOf',
      args: [address as `0x${string}`, id]
    })) || [],
    query: {
      enabled: !!contractAddress && !!tokenIds && tokenIds.length > 0 && !!address,
    }
  })

  // Update ticket IDs from the contract
  useEffect(() => {
    if (tokenIds) {
      setTicketIds(tokenIds)
      setIsLoading(false)
    }
  }, [tokenIds])

  // Update ticket details when details are loaded
  useEffect(() => {
    if (allTicketDetails && tokenIds) {
      const detailsMap = new Map<bigint, TicketDetails>()

      allTicketDetails.forEach((detailData, index) => {
        if (detailData.result && tokenIds[index]) {
          const detail = detailData.result
          detailsMap.set(tokenIds[index], {
            // following line is wrong
            id: tokenIds[index],
            name: detail[1],
            price: detail[2],
            // TODO: check why amount is not being set
            amount: BigInt(0),
            maxSellPerPerson: detail[3],
            infoUrl: detail[4]
          })
        }
      })

      setTicketDetails(detailsMap)
    }
  }, [allTicketDetails, tokenIds])

  // Update owned tickets
  useEffect(() => {
    if (userBalances && tokenIds) {
      const balancesMap = new Map<bigint, number>()

      userBalances.forEach((balanceData, index) => {
        if (balanceData.result && tokenIds[index] && Number(balanceData.result) > 0) {
          balancesMap.set(tokenIds[index], Number(balanceData.result))
        }
      })

      setOwnedTickets(balancesMap)
    }
  }, [userBalances, tokenIds])

  if (!contractAddress) {
    return (
      <div className="flex-column align-center">
        <h1 className="text-xl mb-6">Tickets</h1>
        <div className="alert alert-warning">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>Contract is not deployed on the current network. Please switch to a supported network.</span>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex-column align-center">
        <h1 className="text-xl mb-6">Tickets</h1>
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-column align-center">
      <h1 className="text-xl mb-6">TicketChain</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Available Tickets Section */}
        <Available
          ticketIds={ticketIds}
          ticketDetails={ticketDetails}
          refetchTickets={refetchTickets}
          refetchBalances={refetchBalances}
        />

        {/* Your Tickets Section */}
        <Owned
          ownedTickets={ownedTickets}
          ticketDetails={ticketDetails}
        />
      </div>
    </div>
  )
}