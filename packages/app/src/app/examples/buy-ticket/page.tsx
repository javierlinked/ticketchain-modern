'use client'
import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { useNotifications } from '@/context/Notifications'
import { ticketContractAddress, ticketContractAbi } from '@/abis'
import { formatBalance } from '@/utils/formatBalance'

interface TicketDetails {
  id: bigint
  name: string
  price: bigint
  maxSellPerPerson: bigint
  infoUrl: string
}

export default function BuyTicket() {
  const [ticketIds, setTicketIds] = useState<bigint[]>([])
  const [selectedId, setSelectedId] = useState<bigint | null>(null)
  const [ticketDetails, setTicketDetails] = useState<TicketDetails | null>(null)
  const [amount, setAmount] = useState(1)

  const { address, chain } = useAccount()
  const { Add } = useNotifications()

  // Get the list of ticket IDs
  const { data: ticketIdsLength } = useReadContract({
    address: ticketContractAddress[11155111],
    abi: ticketContractAbi,
    functionName: 'tokenIdsLength',
  })

  // Get individual ticket ID
  const getTokenId = (index: number) => {
    return useReadContract({
      address: ticketContractAddress[11155111],
      abi: ticketContractAbi,
      functionName: 'tokenIds',
      args: [BigInt(index)],
    })
  }

  // Get ticket details
  const { data: selectedTicketDetails, refetch: refetchTicketDetails } = useReadContract({
    address: selectedId ? ticketContractAddress[11155111] : undefined,
    abi: ticketContractAbi,
    functionName: 'tickets',
    args: selectedId ? [selectedId] : undefined,
  })

  // Write contract hooks for buying tickets
  const { data, writeContract } = useWriteContract()
  const { isLoading, error: txError, isSuccess } = useWaitForTransactionReceipt({ hash: data })

  // Load ticket IDs
  useEffect(() => {
    const loadTicketIds = async () => {
      if (!ticketIdsLength) return

      const ids: bigint[] = []
      for (let i = 0; i < Number(ticketIdsLength); i++) {
        const { data: id } = getTokenId(i)
        if (id) ids.push(id)
      }

      setTicketIds(ids)
      if (ids.length > 0 && !selectedId) {
        setSelectedId(ids[0])
      }
    }

    loadTicketIds()
  }, [selectedId, ticketIdsLength])

  // Update ticket details when selected ID changes
  useEffect(() => {
    if (selectedTicketDetails && selectedId) {
      setTicketDetails({
        id: selectedId,
        name: selectedTicketDetails[0],
        price: selectedTicketDetails[1],
        maxSellPerPerson: selectedTicketDetails[2],
        infoUrl: selectedTicketDetails[3]
      })
    }
  }, [selectedTicketDetails, selectedId])

  // Handle ticket purchase
  const handleBuyTicket = () => {
    if (!address || !selectedId || !ticketDetails) {
      Add('Unable to buy ticket. Please check your connection and selected ticket.', { type: 'warning' })
      return
    }

    const totalPrice = ticketDetails.price * BigInt(amount)
    const emptyBytes = '0x'

    writeContract({
      address: ticketContractAddress[11155111],
      abi: ticketContractAbi,
      functionName: 'buy',
      args: [selectedId, BigInt(amount), emptyBytes as `0x${string}`],
      value: totalPrice
    })
  }

  // Handle transaction status
  useEffect(() => {
    if (isSuccess && data) {
      Add(`Successfully purchased ${amount} ticket(s)`, {
        type: 'success',
        href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${data}` : undefined,
      })

      // Reset amount after successful purchase
      setAmount(1)

      // Refetch ticket details to update availability
      refetchTicketDetails()
    } else if (txError) {
      Add(`Failed to buy ticket: ${txError.cause}`, { type: 'error' })
    }
  }, [isSuccess, txError, data, chain, Add, amount, refetchTicketDetails])

  return (
    <div className="flex-column align-center">
      <h1 className="text-xl mb-6">Buy Tickets</h1>

      <div className="flex flex-col gap-6 max-w-md">
        <div className="form-control">
          <div className="label">
            <span className="label-text">Select Event</span>
          </div>
          <select
            className="select select-bordered w-full"
            value={selectedId?.toString() || ""}
            onChange={(e) => setSelectedId(e.target.value ? BigInt(e.target.value) : null)}
            disabled={ticketIds.length === 0}
          >
            {ticketIds.length === 0 && <option value="">No tickets available</option>}
            {ticketIds.map((id) => (
              <option key={id.toString()} value={id.toString()}>
                Ticket #{id.toString()}
              </option>
            ))}
          </select>
        </div>

        {ticketDetails && (
          <>
            <div className="stats shadow bg-base-200">
              <div className="stat">
                <div className="stat-title">Event</div>
                <div className="stat-value text-lg">{ticketDetails.name}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Price</div>
                <div className="stat-value text-lg">{formatBalance(ticketDetails.price)} ETH</div>
              </div>
            </div>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Quantity</span>
                <span className="label-text-alt">Max: {ticketDetails.maxSellPerPerson.toString()}</span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  if (val > 0 && val <= Number(ticketDetails.maxSellPerPerson)) {
                    setAmount(val)
                  }
                }}
                min="1"
                max={ticketDetails.maxSellPerPerson.toString()}
                className="input input-bordered w-full"
              />
            </label>

            {ticketDetails.infoUrl && (
              <div className="mt-2">
                <a
                  href={ticketDetails.infoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary"
                >
                  View Event Information
                </a>
              </div>
            )}

            <div className="mt-2">
              <p>Total: {formatBalance(ticketDetails.price * BigInt(amount))} ETH</p>
            </div>

            <button
              className="btn btn-primary mt-4"
              onClick={handleBuyTicket}
              disabled={isLoading || !address || !selectedId}
            >
              {isLoading ? <span className="loading loading-dots loading-sm"></span> : 'Buy Tickets'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}