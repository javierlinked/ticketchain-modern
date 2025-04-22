'use client'
import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useReadContracts } from 'wagmi'
import { ticketContractAddress, ticketContractAbi } from '@/abis'
import { useNotifications } from '@/context/Notifications'
import { formatBalance } from '@/utils/formatBalance'
import { TicketDetails } from '@/context/TokenContext'

export function bigIntReplacer(_key: string, value: unknown): string | unknown {
    return typeof value === 'bigint' ? value.toString() : value;
}

interface AvailableProps {
    ticketIds: bigint[]
    ticketDetails: Map<bigint, TicketDetails>
    refetchTickets: () => void
    refetchBalances: () => void
}

export default function Available({ ticketIds, ticketDetails, refetchTickets, refetchBalances }: AvailableProps) {
    const [selectedId, setSelectedId] = useState<bigint | null>(null)
    const [amount, setAmount] = useState(1)

    const { address, chain } = useAccount()
    const { Add } = useNotifications()
    const chainId = chain?.id
    const contractAddress = ticketContractAddress[chainId as keyof typeof ticketContractAddress]

    // Write contract hooks for buying tickets
    const { data: txData, writeContract } = useWriteContract()
    const { isLoading: txLoading, error: txError, isSuccess } = useWaitForTransactionReceipt({ hash: txData })

    // Handle ticket purchase
    const handleBuyTicket = (ticketId: bigint) => {
        if (!address || !contractAddress) {
            Add('Unable to buy ticket. Please check your connection.', { type: 'warning' })
            return
        }

        const ticketDetail = ticketDetails.get(ticketId)
        if (!ticketDetail) {
            Add('Ticket details not found', { type: 'error' })
            return
        }
        const totalPrice = ticketDetail.price * BigInt(amount)
        const emptyBytes = '0x'

        writeContract({
            address: contractAddress,
            abi: ticketContractAbi,
            functionName: 'buy',
            args: [ticketId, BigInt(amount), emptyBytes as `0x${string}`],
            value: totalPrice
        })

        // Handle transaction status
        if (isSuccess && txData) {
            Add(`Successfully purchased ticket(s)`, {
                type: 'success',
                href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${txData}` : undefined,
            })

            // Reset amount after successful purchase
            setAmount(1)

            // Refetch ticket data to update available tickets and balances
            refetchTickets()
            refetchBalances()
        } else if (txError) {
            Add(`Failed to buy ticket: ${txError.cause}`, { type: 'error' })
        }
    }

    return (
        <div className="flex-1 bg-base-100 rounded-lg p-4">
            <h2 className="text-lg font-bold text-primary mb-4">Available Tickets</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Show</th>
                            <th>Price (ETH)</th>
                            <th>Available</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticketIds.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center">No tickets available</td>
                            </tr>
                        ) : (
                            Array.from(ticketDetails.entries()).map(([id, detail]) => (
                                <tr key={id.toString()}>
                                    <td>
                                        {detail.name}
                                        {detail.infoUrl && (
                                            <div className="mt-1">
                                                <a href={detail.infoUrl} target="_blank" rel="noopener noreferrer" className="text-xs link link-primary">
                                                    More info
                                                </a>
                                            </div>
                                        )}
                                    </td>
                                    <td>{formatBalance(detail.price)}</td>
                                    <td>{detail.maxSellPerPerson.toString()}</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                className="input input-bordered input-sm w-16"
                                                min={1}
                                                max={Number(detail.maxSellPerPerson)}
                                                value={selectedId === id ? amount : 1}
                                                onClick={() => setSelectedId(id)}
                                                onChange={(e) => {
                                                    const val = parseInt(e.target.value);
                                                    setSelectedId(id);
                                                    if (val > 0 && val <= Number(detail.maxSellPerPerson)) {
                                                        setAmount(val);
                                                    }
                                                }}
                                            />
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => handleBuyTicket(id)}
                                                disabled={txLoading || !address}
                                            >
                                                Buy
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