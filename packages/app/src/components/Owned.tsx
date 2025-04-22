'use client'
import { useAccount } from 'wagmi'

interface TicketDetails {
    id: bigint
    name: string
    price: bigint
    maxSellPerPerson: bigint
    infoUrl: string
}

interface OwnedProps {
    ownedTickets: Map<bigint, number>
    ticketDetails: Map<bigint, TicketDetails>
}

export default function Owned({ ownedTickets, ticketDetails }: OwnedProps) {
    const { address } = useAccount()

    return (
        <div className="flex-1 bg-base-100 rounded-lg p-4">
            <h2 className="text-lg font-bold text-primary mb-4">Your Tickets</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Show</th>
                            <th>Qty</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!address ? (
                            <tr>
                                <td colSpan={3} className="text-center">Please connect your wallet</td>
                            </tr>
                        ) : ownedTickets.size === 0 ? (
                            <tr>
                                <td colSpan={3} className="text-center">You don't own any tickets yet</td>
                            </tr>
                        ) : (
                            Array.from(ownedTickets.entries()).map(([id, quantity]) => {
                                const detail = ticketDetails.get(id)
                                return detail ? (
                                    <tr key={id.toString()}>
                                        <td>{detail.name}</td>
                                        <td>{quantity}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button className="btn btn-outline btn-sm">Transfer</button>
                                                <button className="btn btn-outline btn-sm">Burn</button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : null
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}