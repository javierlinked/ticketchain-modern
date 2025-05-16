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
    <div className='bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700'>
      <div className='p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-500 to-indigo-600'>
        <h2 className='text-xl font-bold text-white flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 mr-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z'
            />
          </svg>
          Available Tickets
        </h2>
      </div>

      {tickets.length === 0 ? (
        <div className='p-8 text-center text-slate-500 dark:text-slate-400'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-12 w-12 mx-auto mb-4 text-slate-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <p>No tickets available at the moment.</p>
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='table-modern w-full'>
            <thead>
              <tr className='bg-slate-50 dark:bg-slate-700'>
                <th className='text-slate-700 dark:text-slate-200 font-semibold py-3 px-4 text-left'>Id</th>
                <th className='text-slate-700 dark:text-slate-200 font-semibold py-3 px-4 text-left'>Event</th>
                <th className='text-slate-700 dark:text-slate-200 font-semibold py-3 px-4 text-left'>Price (ETH)</th>
                <th className='text-slate-700 dark:text-slate-200 font-semibold py-3 px-4 text-left'>Max/Person</th>
                <th className='text-slate-700 dark:text-slate-200 font-semibold py-3 px-4 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr
                  key={ticket.id.toString()}
                  className='hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors'>
                  <td className='py-3 px-4 text-slate-800 dark:text-slate-200'>{ticket.id.toString()}</td>
                  <td className='py-3 px-4'>
                    <div className='font-medium text-slate-800 dark:text-slate-200'>{ticket.name}</div>
                    {ticket.infoUrl && (
                      <div className='mt-1'>
                        <a
                          href={ticket.infoUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-3 w-3 mr-1'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          Event details
                        </a>
                      </div>
                    )}
                  </td>
                  <td className='py-3 px-4 text-slate-800 dark:text-slate-200 font-mono'>
                    {formatBalance(ticket.price)}
                  </td>
                  <td className='py-3 px-4 text-slate-800 dark:text-slate-200'>{ticket.maxSellPerPerson.toString()}</td>
                  <td className='py-3 px-4'>
                    <div className='flex items-center space-x-2'>
                      <div className='relative'>
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
                          className='input-modern w-16 text-slate-800 dark:text-slate-200 pr-1'
                        />
                      </div>
                      <button
                        className='btn-primary-modern flex items-center justify-center gap-1'
                        onClick={() => onBuyTicket(ticket.id, ticket.price)}
                        disabled={isBuyLoading || !isConnected}>
                        {isBuyLoading ? (
                          <>
                            <svg
                              className='animate-spin h-4 w-4 text-white'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'>
                              <circle
                                className='opacity-25'
                                cx='12'
                                cy='12'
                                r='10'
                                stroke='currentColor'
                                strokeWidth='4'></circle>
                              <path
                                className='opacity-75'
                                fill='currentColor'
                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                            </svg>
                            <span>Processing</span>
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-4 w-4'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'>
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                              />
                            </svg>
                            <span>Buy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
