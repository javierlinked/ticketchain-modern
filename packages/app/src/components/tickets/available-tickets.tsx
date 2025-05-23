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
    <div className='bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 md:col-span-4'>
      <div className='p-6 border-b border-slate-200 dark:border-slate-700'>
        <h2 className='text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 mr-2 text-emerald-500'
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
        <div className='p-8 text-center'>
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
          <p className='text-slate-600 dark:text-slate-400'>No tickets available at the moment.</p>
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-slate-200 dark:border-slate-700'>
                <th className='px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100'>Event</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100'>Price</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100'>
                  Max/Person
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100'>
                  Quantity
                </th>
                <th className='px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-slate-100'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr
                  key={ticket.id.toString()}
                  className='border-b border-slate-200 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors'>
                  <td className='px-6 py-4'>
                    <div className='flex flex-col'>
                      <span className='font-medium text-slate-900 dark:text-slate-100'>{ticket.name}</span>
                      {ticket.infoUrl && (
                        <a
                          href={ticket.infoUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='mt-1 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 inline-flex items-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-4 w-4 mr-1'
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
                      )}
                    </div>
                  </td>
                  <td className='px-6 py-4 font-mono text-slate-900 dark:text-slate-100'>
                    {formatBalance(ticket.price)}
                  </td>
                  <td className='px-6 py-4 text-slate-900 dark:text-slate-100'>{ticket.maxSellPerPerson.toString()}</td>
                  <td className='px-6 py-4 text-slate-900 dark:text-slate-100'>
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
                      className='w-16 px-2 py-1 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400'
                    />
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center justify-end space-x-3'>
                      <button
                        className='inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                        onClick={() => onBuyTicket(ticket.id, ticket.price)}
                        disabled={isBuyLoading || !isConnected}>
                        {isBuyLoading ? (
                          <div className='flex items-center'>
                            <svg
                              className='animate-spin h-4 w-4 mr-1'
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
                            Processing
                          </div>
                        ) : (
                          <div className='flex items-center'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-4 w-4 mr-1'
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
                            Buy
                          </div>
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
