'use client'

import { useTickets } from '@/hooks/tickets/useTickets'
import Tickets from '@/components/Tickets'

interface Ticket {
  id: bigint
  name: string
  price: bigint
  available: bigint
  maxSellPerPerson: bigint
  infoUrl: string
}

interface OwnedTicket {
  id: bigint
  name: string
  quantity: bigint
}

export default function BuyTicketExample() {
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

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Buy Tickets Example</h1>
      <Tickets
        tickets={availableTickets}
        ownedTickets={ownedTickets}
        buyQuantity={buyQuantity}
        setBuyQuantity={setBuyQuantity}
        onBuyTicket={handleBuyTicket}
        isBuyLoading={isBuyLoading}
        isConnected={true}
      />
    </div>
  )
}
