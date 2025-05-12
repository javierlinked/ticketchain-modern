import { useState } from 'react'
import { OwnedTicket } from '@/types/tickets'
import { AddressInput } from '@/components/AddressInput'

interface OwnedTicketsProps {
  tickets: OwnedTicket[]
  onTransferTicket: (ticketId: bigint, recipient: `0x${string}`) => void
  isTransferLoading: boolean
}

export function OwnedTickets({ tickets, onTransferTicket, isTransferLoading }: OwnedTicketsProps) {
  const [selectedTicketToTransfer, setSelectedTicketToTransfer] = useState<bigint | null>(null)
  const [transferTo, setTransferTo] = useState<`0x${string}` | undefined>()

  const handleTransfer = (ticketId: bigint) => {
    if (!transferTo) return
    onTransferTicket(ticketId, transferTo)
    setSelectedTicketToTransfer(null)
    setTransferTo(undefined)
  }

  return (
    <div className='bg-white text-black p-4 rounded-lg'>
      <h2 className='text-xl font-bold mb-4 text-green-700'>Your Tickets</h2>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th className='text-black'>Show</th>
              <th className='text-black'>Qty</th>
              <th className='text-black'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={3} className='text-center'>
                  You don&apos;t own any tickets
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket.id.toString()}>
                  <td>{ticket.name}</td>
                  <td>{ticket.quantity.toString()}</td>
                  <td>
                    <button className='btn btn-sm btn-outline' onClick={() => setSelectedTicketToTransfer(ticket.id)}>
                      Transfer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Transfer UI */}
      {selectedTicketToTransfer && (
        <div className='mt-6 bg-gray-100 p-4 rounded-md'>
          <h3 className='text-lg font-medium mb-4'>Transfer Ticket</h3>
          <div className='form-control w-full mb-4'>
            <label className='label'>
              <span className='label-text text-black'>Recipient Address</span>
            </label>
            <AddressInput
              onRecipientChange={(address) => setTransferTo(address as `0x${string}`)}
              placeholder='0x...'
              className='input input-bordered w-full text-black'
              value={transferTo || ''}
            />
          </div>
          <div className='flex justify-end gap-2'>
            <button className='btn btn-sm btn-outline' onClick={() => setSelectedTicketToTransfer(null)}>
              Cancel
            </button>
            <button
              className='btn btn-sm bg-blue-600 text-white'
              onClick={() => handleTransfer(selectedTicketToTransfer)}
              disabled={isTransferLoading || !transferTo}>
              {isTransferLoading ? <span className='loading loading-spinner loading-xs'></span> : 'Confirm Transfer'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
