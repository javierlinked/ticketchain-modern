'use client'
import React, { useMemo, useState } from 'react'
import { useToken } from '@/context/TokenContext'
import { useAccount } from 'wagmi'
import CreateTicket from '../app/examples/create-ticket/page'
import { WalletInfo } from './WalletInfo'
import { AvailableTickets } from './tickets/AvailableTickets'
import { OwnedTickets } from './tickets/OwnedTickets'
import { ErrorBoundary } from './ui/ErrorBoundary'
import { ticketContractAddress } from '@/abis'
import { sepolia } from 'viem/chains'
import { useTicketIds } from '@/hooks/tickets/useTicketIds'
import { useAvailableTickets } from '@/hooks/tickets/useAvailableTickets'
import { useOwnedTickets } from '@/hooks/tickets/useOwnedTickets'
import { useBuyTicket } from '@/hooks/tickets/useBuyTicket'

export default function TicketsPage() {
  const { isContractOwner: isTokenContractOwner, isLoading: isTokenLoading } = useToken()
  const { address, chain } = useAccount()

  return (
    <ErrorBoundary>
      <TicketsContent
        isTokenContractOwner={isTokenContractOwner}
        isTokenLoading={isTokenLoading}
        address={address}
        chainId={chain?.id}
      />
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
  } = useAvailableTickets(contractAddress, ticketIds)
  // Owned tickets
  const {
    ownedTickets,
    loading: ownedLoading,
    error: ownedError,
  } = useOwnedTickets(contractAddress, address, ticketIds)
  // Buy ticket
  const { buyTicket, isLoading: isBuyLoading } = useBuyTicket(contractAddress)

  const isLoading = isTokenLoading || ticketIdsLoading || availableLoading || ownedLoading
  const error = loadingError || ticketIdsError || availableError || ownedError

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

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            <AvailableTickets
              tickets={availableTickets}
              buyQuantity={buyQuantity}
              setBuyQuantity={setBuyQuantity}
              onBuyTicket={(ticketId, price) => {
                const quantity = buyQuantity[ticketId.toString()] || 1
                buyTicket(ticketId, quantity, price)
              }}
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
