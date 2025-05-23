import { OwnedTicket } from '@/types/tickets'

interface OwnedTicketsProps {
  tickets: OwnedTicket[]
  isLoading?: boolean
}

export function OwnedTickets({ tickets, isLoading }: OwnedTicketsProps) {
  if (isLoading) {
    return (
      <div className='bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-8 text-center'>
        <div className='flex justify-center'>
          <svg
            className='animate-spin h-8 w-8 text-emerald-500'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'>
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
          </svg>
        </div>
        <p className='mt-4 text-slate-600 dark:text-slate-400'>Loading your tickets...</p>
      </div>
    )
  }

  if (!tickets.length) {
    return (
      <div className='bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 md:col-span-3'>
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
            Your Tickets
          </h2>
        </div>
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
              d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z'
            />
          </svg>
          <p className='text-slate-600 dark:text-slate-400'>You don&apos;t own any tickets yet.</p>
          <div className='mt-6'>
            <a
              href='/tickets'
              className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition-colors'>
              Browse Available Tickets
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 md:col-span-3'>
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
          Your Tickets
        </h2>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-slate-200 dark:border-slate-700'>
              <th className='px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100'>Event</th>
              <th className='px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100'>Quantity</th>
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
                    <span className='text-sm text-slate-500 dark:text-slate-400'>ID: {ticket.id.toString()}</span>
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100'>
                    {ticket.quantity.toString()}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <div className='flex justify-end space-x-2'>
                    <button className='inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition-colors'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 mr-1 text-red-500'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        />
                      </svg>
                      Burn
                    </button>
                    <button className='inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition-colors'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 mr-1 text-emerald-500'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
                        />
                      </svg>
                      Transfer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
