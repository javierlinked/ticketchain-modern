'use client'

import { useAccount } from 'wagmi'
import { useTickets } from '@/hooks/tickets/useTickets'
import { WalletInfo } from '@/components/WalletInfo'
import { AvailableTickets } from '@/components/tickets/AvailableTickets'
import { OwnedTickets } from '@/components/tickets/OwnedTickets'

export default function BuyTicketPage() {
  const { address } = useAccount()
  const {
    availableTickets,
    ownedTickets,
    buyQuantity,
    isRefreshing,
    isBuyLoading,
    isTransferLoading,
    loadingError,

    setBuyQuantity,
    fetchTickets,
    handleBuyTicket,
    handleTransferTicket,
  } = useTickets()

  return (
    <div className='container mx-auto'>
      <div className='bg-[#24272D] p-6'>
        <WalletInfo address={address} isRefreshing={isRefreshing} onRefresh={fetchTickets} />

        {loadingError && (
          <div className='alert alert-error mb-4'>
            <span>{loadingError}</span>
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <AvailableTickets
            tickets={availableTickets}
            buyQuantity={buyQuantity}
            setBuyQuantity={setBuyQuantity}
            onBuyTicket={handleBuyTicket}
            isBuyLoading={isBuyLoading}
            isConnected={!!address}
          />

          <OwnedTickets
            tickets={ownedTickets}
            onTransferTicket={handleTransferTicket}
            isTransferLoading={isTransferLoading}
          />
        </div>
      </div>
    </div>
  )
}
