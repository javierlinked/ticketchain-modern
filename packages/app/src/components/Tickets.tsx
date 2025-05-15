'use client'
import React from 'react'
import { useToken } from '@/context/TokenContext'
import { useAccount } from 'wagmi'
import CreateTicket from '../app/examples/create-ticket/page'
import { WalletInfo } from './WalletInfo'
import { AvailableTickets } from './tickets/AvailableTickets'
import { OwnedTickets } from './tickets/OwnedTickets'
import { useTickets } from '@/hooks/tickets/useTickets'
import { ErrorBoundary } from './ui/ErrorBoundary'
import { Ticket, OwnedTicket } from '@/types/tickets'

export default function TicketsPage() {
  const { isContractOwner: isTokenContractOwner, isLoading: isTokenLoading } = useToken()
  const { address } = useAccount()

  return (
    <ErrorBoundary>
      <TicketsContent isTokenContractOwner={isTokenContractOwner} isTokenLoading={isTokenLoading} address={address} />
    </ErrorBoundary>
  )
}

// Separate the main content to allow the error boundary to work properly
function TicketsContent({
  isTokenContractOwner,
  isTokenLoading,
  address,
}: {
  isTokenContractOwner: boolean
  isTokenLoading: boolean
  address: `0x${string}` | undefined
}) {
  const {
    availableTickets,
    ownedTickets,
    buyQuantity,
    isRefreshing,
    isBuyLoading,
    loadingError,
    isContractOwner,
    setBuyQuantity,
    fetchTickets,
    handleBuyTicket,
  } = useTickets()

  // Use either the token context owner status or the tickets hook owner status
  const isOwner = isTokenContractOwner || isContractOwner
  const isLoading = isTokenLoading || isRefreshing

  if (isLoading && !availableTickets.length && !ownedTickets.length)
    return (
      <div className='flex justify-center items-center min-h-[300px]'>
        <div className='loading loading-spinner loading-lg'></div>
      </div>
    )

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-2xl font-bold mb-6'>Ticket Management</h1>

      {isOwner ? (
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
          <WalletInfo address={address} isRefreshing={isRefreshing} onRefresh={fetchTickets} />
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
          <WalletInfo address={address} isRefreshing={isRefreshing} onRefresh={fetchTickets} />

          {loadingError && (
            <div className='alert alert-error mb-4'>
              <span>{loadingError}</span>
            </div>
          )}

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
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

interface TicketsProps {
  tickets: Ticket[]
  ownedTickets: OwnedTicket[]
  buyQuantity: Record<string, number>
  setBuyQuantity: (value: Record<string, number>) => void
  onBuyTicket: (ticketId: bigint, price: bigint) => void
  isBuyLoading: boolean
  isConnected: boolean
}

export function Tickets({
  tickets,
  ownedTickets,
  buyQuantity,
  setBuyQuantity,
  onBuyTicket,
  isBuyLoading,
  isConnected,
}: TicketsProps) {
  const ownedTicketsAsTickets = ownedTickets.map((ot) => ({
    ...ot,
    price: BigInt(0),
    available: BigInt(0),
    maxSellPerPerson: BigInt(0),
    infoUrl: '',
  }))

  return (
    <div className='space-y-8'>
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
  )
}
