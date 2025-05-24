'use client'
import React, { useMemo, useState, useEffect } from 'react'
import { useToken } from '@/context/token-context'
import { useAccount } from 'wagmi'
import CreateTicket from '../app/examples/create-ticket/page'
import { WalletInfo } from './wallet-info'
import { AvailableTickets } from './tickets/available-tickets'
import { OwnedTickets } from './tickets/owned-tickets'
import { ErrorBoundary } from './ui/error-boundary'
import { ticketContractAddress } from '@/abis'
import { sepolia } from 'viem/chains'
import { useTicketIds } from '@/hooks/tickets/useTicketIds'
import { useAvailableTickets } from '@/hooks/tickets/useAvailableTickets'
import { useOwnedTickets } from '@/hooks/tickets/useOwnedTickets'
import { useBuyTicket } from '@/hooks/tickets/useBuyTicket'
import { NetworkGuard } from './network-guard'

export function Tickets({
  tickets,
  ownedTickets,
  buyQuantity,
  setBuyQuantity,
  onBuyTicket,
  isBuyLoading,
  isConnected,
}: {
  tickets: Array<{
    id: bigint
    name: string
    price: bigint
    available: bigint
    maxSellPerPerson: bigint
    infoUrl: string
  }>
  ownedTickets: Array<{
    id: bigint
    name: string
    quantity: bigint
  }>
  buyQuantity: Record<string, number>
  setBuyQuantity: React.Dispatch<React.SetStateAction<Record<string, number>>>
  onBuyTicket: (ticketId: bigint, price: bigint) => void
  isBuyLoading: boolean
  isConnected: boolean
}) {
  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mb-6'>
        <AvailableTickets
          tickets={tickets}
          buyQuantity={buyQuantity}
          setBuyQuantity={setBuyQuantity}
          onBuyTicket={onBuyTicket}
          isBuyLoading={isBuyLoading}
          isConnected={isConnected}
        />
        <OwnedTickets tickets={ownedTickets} isLoading={false} />
      </div>
    </div>
  )
}

export default function TicketsPage() {
  const { isContractOwner: isTokenContractOwner, isLoading: isTokenLoading } = useToken()
  const { address, chain } = useAccount()

  return (
    <ErrorBoundary>
      <NetworkGuard>
        <TicketsContent
          isTokenContractOwner={isTokenContractOwner}
          isTokenLoading={isTokenLoading}
          address={address}
          chainId={chain?.id}
        />
      </NetworkGuard>
    </ErrorBoundary>
  )
}

function TicketsContent({
  isTokenContractOwner,
  isTokenLoading,
  address,
  chainId,
}: {
  isTokenContractOwner: boolean
  isTokenLoading: boolean
  address: `0x${string}` | undefined
  chainId?: number
}) {
  const [buyQuantity, setBuyQuantity] = useState<Record<string, number>>({})
  const [loadingError, setLoadingError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const contractAddress = useMemo(() => {
    const id = chainId || sepolia.id
    return ticketContractAddress[id as keyof typeof ticketContractAddress] as `0x${string}`
  }, [chainId])

  // Assume isContractOwner is handled by TokenContext for now
  const isContractOwner = isTokenContractOwner

  // Ticket IDs
  const { ticketIds, loading: ticketIdsLoading, error: ticketIdsError } = useTicketIds(contractAddress, isContractOwner)
  // Available tickets
  const {
    tickets: availableTickets,
    loading: availableLoading,
    error: availableError,
  } = useAvailableTickets(contractAddress, ticketIds, refreshKey)
  // Owned tickets
  const {
    ownedTickets,
    loading: ownedLoading,
    error: ownedError,
  } = useOwnedTickets(contractAddress, address, ticketIds, refreshKey)
  // Buy ticket
  const { buyTicket, isLoading: isBuyLoading, isSuccess } = useBuyTicket(contractAddress)

  const isLoading = isTokenLoading || ticketIdsLoading || availableLoading || ownedLoading
  const error = loadingError || ticketIdsError || availableError || ownedError

  // Handler to buy ticket (refresh is handled in useEffect below)
  const handleBuyTicket = (ticketId: bigint, price: bigint) => {
    const quantity = buyQuantity[ticketId.toString()] || 1
    buyTicket(ticketId, quantity, price)
  }

  // Refresh tickets after successful buy
  useEffect(() => {
    if (isSuccess) {
      setRefreshKey((k) => k + 1)
    }
  }, [isSuccess])

  if (isLoading && !availableTickets.length && !ownedTickets.length)
    return (
      <div className='flex justify-center items-center min-h-[300px]'>
        <div className='loading loading-spinner loading-lg'></div>
      </div>
    )

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-2xl font-bold mb-6'>Ticket Management</h1>

      {isContractOwner ? (
        <div>
          <div className='alert alert-info mb-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='stroke-current shrink-0 w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
            </svg>
            <span>You are the contract owner. You can create new tickets.</span>
          </div>
          <WalletInfo address={address} isRefreshing={isLoading} onRefresh={() => {}} />
          <CreateTicket />
        </div>
      ) : (
        <div>
          <div className='alert alert-info mb-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='stroke-current shrink-0 w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
            </svg>
            <span>You can purchase available tickets from events.</span>
          </div>
          <WalletInfo address={address} isRefreshing={isLoading} onRefresh={() => {}} />

          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error}</span>
            </div>
          )}

          <div className='grid grid-cols-1 md:grid-cols-7 gap-6 mb-6'>
            <AvailableTickets
              tickets={availableTickets}
              buyQuantity={buyQuantity}
              setBuyQuantity={setBuyQuantity}
              onBuyTicket={handleBuyTicket}
              isBuyLoading={isBuyLoading}
              isConnected={!!address}
            />

            <OwnedTickets tickets={ownedTickets} isLoading={isLoading} />
          </div>
        </div>
      )}
    </div>
  )
}
