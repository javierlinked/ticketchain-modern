import { useState } from 'react'
import { OwnedTicket } from '@/types/tickets'
import { AddressInput } from '@/components/AddressInput'
import { Ticket } from '@/types/tickets'

interface OwnedTicketsProps {
  tickets: Ticket[]
  isLoading?: boolean
}

export function OwnedTickets({ tickets, isLoading }: OwnedTicketsProps) {
  if (isLoading) {
    return <div>Loading owned tickets...</div>
  }

  if (!tickets.length) {
    return <div>No owned tickets found.</div>
  }

  return (
    <div>
      <h3>Your Owned Tickets</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {tickets.map((ticket) => (
          <div key={ticket.id.toString()} className='border p-4 rounded-lg'>
            <h4>Ticket #{ticket.id.toString()}</h4>
            <p>Event: {ticket.name}</p>
            <p>Price: {ticket.price.toString()} ETH</p>
          </div>
        ))}
      </div>
    </div>
  )
}
