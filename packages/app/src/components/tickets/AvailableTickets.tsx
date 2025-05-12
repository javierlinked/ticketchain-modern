import { formatBalance } from '@/utils/formatBalance'
import { Ticket } from '@/types/tickets'

interface AvailableTicketsProps {
  tickets: Ticket[]
  buyQuantity: Record<string, number>
  setBuyQuantity: (value: Record<string, number>) => void
  onBuyTicket: (ticketId: bigint, price: bigint) => void
  isBuyLoading: boolean
  isConnected: boolean
}

export function AvailableTickets({
  tickets,
  buyQuantity,
  setBuyQuantity,
  onBuyTicket,
  isBuyLoading,
  isConnected,
}: AvailableTicketsProps) {
  return (
    <div className='bg-white text-black p-4 rounded-lg'>
      <h2 className='text-xl font-bold mb-4 text-blue-600'>Available Tickets</h2>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th className='text-black'>Show</th>
              <th className='text-black'>Price (ETH)</th>
              <th className='text-black'>Available</th>
              <th className='text-black'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={4} className='text-center'>
                  No tickets available
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket.id.toString()}>
                  <td>
                    {ticket.name}
                    {ticket.infoUrl && (
                      <div>
                        <a
                          href={ticket.infoUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-xs text-blue-600 hover:underline'>
                          More info
                        </a>
                      </div>
                    )}
                  </td>
                  <td>{formatBalance(ticket.price)}</td>
                  <td>{ticket.available.toString()}</td>
                  <td>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='number'
                        min='1'
                        max={ticket.maxSellPerPerson.toString()}
                        value={buyQuantity[ticket.id.toString()] || 1}
                        onChange={(e) =>
                          setBuyQuantity({
                            ...buyQuantity,
                            [ticket.id.toString()]: Math.max(
                              1,
                              Math.min(Number(ticket.maxSellPerPerson), parseInt(e.target.value) || 1)
                            ),
                          })
                        }
                        className='input input-xs input-bordered w-16 text-black'
                      />
                      <button
                        className='btn btn-sm bg-blue-600 text-white'
                        onClick={() => onBuyTicket(ticket.id, ticket.price)}
                        disabled={isBuyLoading || !isConnected}>
                        {isBuyLoading ? <span className='loading loading-spinner loading-xs'></span> : 'Buy'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
