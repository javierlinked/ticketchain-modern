import { OwnedTicket } from '@/types/tickets'

interface OwnedTicketsProps {
  tickets: OwnedTicket[]
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
    <div className='bg-white text-black p-4 rounded-lg'>
      <h2 className='text-xl font-bold mb-4 text-green-700'>Your Tickets</h2>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th className='text-black'>Name</th>
              <th className='text-black'>Amount</th>
              <th className='text-black'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id.toString()}>
                <td>{ticket.name}</td>
                <td>{ticket.quantity.toString()}</td>
                <td>
                  <button className='btn btn-xs btn-outline btn-neutral mr-2'>Burn</button>
                  <button className='btn btn-xs btn-outline btn-neutral'>Transfer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
