'use client'
import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useReadContracts } from 'wagmi'
import { useNotifications } from '@/context/Notifications'
import { ticketContractAddress, ticketContractAbi } from '@/abis'
import { formatBalance } from '@/utils/formatBalance'
import { TicketDetails } from '@/context/TokenContext'


export default function BuyTicket() {
  const [ticketIds, setTicketIds] = useState<bigint[]>([])
  const [selectedId, setSelectedId] = useState<bigint | null>(null)
  const [ticketDetails, setTicketDetails] = useState<TicketDetails | null>(null)
  const [amount, setAmount] = useState(1)

  const { address, chain } = useAccount()
  const { Add } = useNotifications()

  const chainId = chain?.id
  const contractAddress = ticketContractAddress[chainId as keyof typeof ticketContractAddress]

  // Get the list of ticket IDs
  const { data: ticketIdsLength } = useReadContract({
    address: contractAddress,
    abi: ticketContractAbi,
    functionName: 'tokenIdsLength',
    enabled: !!contractAddress,
  })

  // Get ticket details
  const { data: selectedTicketDetails, refetch: refetchTicketDetails } = useReadContract({
    address: selectedId ? contractAddress : undefined,
    abi: ticketContractAbi,
    functionName: 'tickets',
    args: selectedId ? [selectedId] : undefined,
    enabled: !!selectedId && !!contractAddress,
  })

  // Write contract hooks for buying tickets
  const { data, writeContract } = useWriteContract()
  const { isLoading, error: txError, isSuccess } = useWaitForTransactionReceipt({ hash: data })

  // Load ticket IDs
  const { data: tokenIds } = useReadContracts({
    contracts: Array.from({ length: Number(ticketIdsLength) }, (_, i) => ({
      address: contractAddress,
      abi: ticketContractAbi,
      functionName: 'tokenIds',
      args: [BigInt(i)]
    })),
    query: {
      enabled: !!contractAddress && !!ticketIdsLength,
      select: (data) => data.map(({ result }) => result).filter(Boolean) as bigint[]
    }
  })

  useEffect(() => {
    if (tokenIds) {
      setTicketIds(tokenIds)
      if (!selectedId && tokenIds.length > 0) {
        setSelectedId(tokenIds[0])
      }
    }
  }, [tokenIds, selectedId])

  // Update ticket details when selected ID changes
  useEffect(() => {
    if (selectedTicketDetails && selectedId) {
      setTicketDetails({
        id: selectedId,
        name: selectedTicketDetails[1],
        price: selectedTicketDetails[2],
        amount: selectedTicketDetails[3],
        maxSellPerPerson: selectedTicketDetails[4],
        infoUrl: selectedTicketDetails[4]
      })
    }
  }, [selectedTicketDetails, selectedId])

  // Handle ticket purchase
  const handleBuyTicket = () => {
    if (!address || !selectedId || !ticketDetails || !contractAddress) {
      Add('Unable to buy ticket. Please check your connection and selected ticket.', { type: 'warning' })
      return
    }

    const totalPrice = ticketDetails.price * BigInt(amount)
    const emptyBytes = '0x'

    writeContract({
      address: contractAddress,
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

  if (!contractAddress) {
    return (
      <div className="flex-column align-center">
        <h1 className="text-xl mb-6">Buy Tickets</h1>
        <div className="alert alert-warning">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>Contract is not deployed on the current network. Please switch to a supported network.</span>
        </div>
      </div>
    )
  }

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
                max={Number(ticketDetails.maxSellPerPerson)}
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
              <p>Total: {formatBalance(BigInt(ticketDetails.price) * BigInt(amount))} ETH</p>
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