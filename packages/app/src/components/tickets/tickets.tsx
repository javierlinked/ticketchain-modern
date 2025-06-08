'use client'
import React, { useMemo, useState, useEffect } from 'react'
import { useToken } from '@/context/token-context'
import { useAccount } from 'wagmi'
import { ticketContractAddress } from '@/abis'
import CreateTicket from '@/app/examples/create-ticket/page'
import { useAvailableTickets } from '@/hooks/tickets/useAvailableTickets'
import { useBuyTicket } from '@/hooks/tickets/useBuyTicket'
import { useOwnedTickets } from '@/hooks/tickets/useOwnedTickets'
import { useTicketIds } from '@/hooks/tickets/useTicketIds'
import { sepolia } from 'viem/chains'
import { ErrorBoundary } from '../error-boundary'
import { NetworkGuard } from '../network-guard'
import { WalletInfo } from '../wallet-info'
import { AvailableTickets } from './available-tickets'
import { OwnedTickets } from './owned-tickets'

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

/**
 * Renders the main content for ticket management, handling both contract owner and regular user views.
 *
 * @param isTokenContractOwner - Indicates if the connected user is the token contract owner.
 * @param isTokenLoading - Loading state for token-related operations.
 * @param address - The connected wallet address.
 * @param chainId - The current blockchain network chain ID.
 *
 * @remarks
 * - If the user is the contract owner, displays ticket creation UI.
 * - If the user is not the contract owner, displays available tickets for purchase and owned tickets.
 * - Handles loading and error states for ticket data.
 * - Refreshes ticket data after a successful purchase.
 *
 * @returns The ticket management UI, including ticket creation (for owners), available tickets, and owned tickets.
 */
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

  const isContractOwner = isTokenContractOwner

  const { ticketIds, loading: ticketIdsLoading, error: ticketIdsError } = useTicketIds(contractAddress, isContractOwner)
  const {
    tickets: availableTickets,
    loading: availableLoading,
    error: availableError,
  } = useAvailableTickets(contractAddress, ticketIds, refreshKey)
  const {
    ownedTickets,
    loading: ownedLoading,
    error: ownedError,
  } = useOwnedTickets(contractAddress, address, ticketIds, refreshKey)
  const { buyTicket, isLoading: isBuyLoading, isSuccess } = useBuyTicket(contractAddress)

  const isLoading = isTokenLoading || ticketIdsLoading || availableLoading || ownedLoading
  const error = loadingError || ticketIdsError || availableError || ownedError

  const handleBuyTicket = (ticketId: bigint, price: bigint) => {
    const quantity = buyQuantity[ticketId.toString()] || 1
    buyTicket(ticketId, quantity, price)
  }

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
