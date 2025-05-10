'use client'
import { useState, useEffect, useCallback } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { useNotifications } from '@/context/Notifications'
import { ticketContractAddress, ticketContractAbi } from '@/abis'
import { formatBalance } from '@/utils/formatBalance'
import { sepolia } from 'viem/chains'
import { AddressInput } from '@/components/AddressInput'

interface Ticket {
  id: bigint
  name: string
  price: bigint
  available: bigint
  maxSellPerPerson: bigint
  infoUrl: string
}

interface OwnedTicket {
  id: bigint
  name: string
  quantity: bigint
}

export default function BuyTicket() {
  const [availableTickets, setAvailableTickets] = useState<Ticket[]>([])
  const [ownedTickets, setOwnedTickets] = useState<OwnedTicket[]>([])
  const [buyQuantity, setBuyQuantity] = useState<Record<string, number>>({})
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [transferTo, setTransferTo] = useState<`0x${string}` | undefined>()
  const [selectedTicketToTransfer, setSelectedTicketToTransfer] = useState<bigint | null>(null)
  const [showOwnerView, setShowOwnerView] = useState(false)
  const [ticketIds, setTicketIds] = useState<bigint[]>([])

  const { address, chain } = useAccount()
  const { Add } = useNotifications()

  const chainId = chain?.id || sepolia
  const contractAddress = ticketContractAddress[chainId as keyof typeof ticketContractAddress]

  // Get ETH balance
  const { data: ethBalance } = useBalance({
    address,
  })

  // Contract read hooks
  const { data: ticketIdsLength } = useReadContract({
    address: contractAddress,
    abi: ticketContractAbi,
    functionName: 'tokenIdsLength',
  })

  // Check owner status
  const { data: contractOwner } = useReadContract({
    address: contractAddress,
    abi: ticketContractAbi,
    functionName: 'owner',
  })

  // Buy ticket contract hooks
  const { data: buyTxData, writeContract: writeBuyContract } = useWriteContract()
  const {
    isLoading: isBuyLoading,
    error: buyTxError,
    isSuccess: buyTxSuccess,
  } = useWaitForTransactionReceipt({
    hash: buyTxData,
  })

  // Transfer ticket contract hooks
  const { data: transferTxData, writeContract: writeTransferContract } = useWriteContract()
  const {
    isLoading: isTransferLoading,
    error: transferTxError,
    isSuccess: transferTxSuccess,
  } = useWaitForTransactionReceipt({
    hash: transferTxData,
  })

  // Fetch ticket IDs based on length
  useEffect(() => {
    const fetchTicketIds = async () => {
      if (!ticketIdsLength || !contractAddress) return;

      const ids: bigint[] = [];
      for (let i = 0; i < Number(ticketIdsLength); i++) {
        // Create a new instance of useReadContract for each ID
        const { data: id } = useReadContract({
          address: contractAddress,
          abi: ticketContractAbi,
          functionName: 'tokenIds',
          args: [BigInt(i)],
        });
        if (id) ids.push(id as bigint);
      }
      setTicketIds(ids);
    };

    fetchTicketIds();
  }, [contractAddress, ticketIdsLength]);

  // Fetch ticket details for each ID
  const fetchTickets = useCallback(async () => {
    if (!address || !contractAddress || ticketIds.length === 0) return;

    setIsRefreshing(true);
    try {
      const available: Ticket[] = [];
      const owned: OwnedTicket[] = [];

      // Process tickets one by one (could optimize with Promise.all if needed)
      for (const id of ticketIds) {
        try {
          // Get ticket details using separate hooks
          const { data: details } = useReadContract({
            address: contractAddress,
            abi: ticketContractAbi,
            functionName: 'tickets',
            args: [id],
          });

          const { data: supply } = useReadContract({
            address: contractAddress,
            abi: ticketContractAbi,
            functionName: 'totalSupply',
            args: [id],
          });

          const { data: balance } = useReadContract({
            address: contractAddress,
            abi: ticketContractAbi,
            functionName: 'balanceOf',
            args: [address, id],
          });

          if (details && supply) {
            const detailsTuple = details as [string, bigint, bigint, string];
            const ticket: Ticket = {
              id,
              name: detailsTuple[0],
              price: detailsTuple[1],
              available: supply as bigint,
              maxSellPerPerson: detailsTuple[2],
              infoUrl: detailsTuple[3],
            };

            available.push(ticket);

            // Set default buy quantity
            setBuyQuantity((prev) => ({
              ...prev,
              [id.toString()]: 1,
            }));

            // If user owns some tickets
            if (balance && (balance as bigint) > BigInt(0)) {
              owned.push({
                id,
                name: detailsTuple[0],
                quantity: balance as bigint,
              });
            }
          }
        } catch (error) {
          console.error(`Error fetching data for ticket ${id}:`, error);
        }
      }

      setAvailableTickets(available);
      setOwnedTickets(owned);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      Add('Failed to load tickets', { type: 'error' });
    } finally {
      setIsRefreshing(false);
    }
  }, [address, contractAddress, ticketIds, Add]);

  // Load tickets when ticket IDs are available or address changes
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets, ticketIds]);

  // Check if current user is contract owner
  useEffect(() => {
    if (contractOwner && address && contractOwner === address) {
      setShowOwnerView(true);
    } else {
      setShowOwnerView(false);
    }
  }, [address, contractOwner]);

  // Handle ticket purchase
  const handleBuyTicket = (ticketId: bigint, price: bigint) => {
    if (!address) {
      Add('Please connect your wallet first', { type: 'warning' })
      return
    }

    const quantity = buyQuantity[ticketId.toString()] || 1
    const totalPrice = price * BigInt(quantity)
    const emptyBytes = '0x'

    writeBuyContract({
      address: contractAddress,
      abi: ticketContractAbi,
      functionName: 'buy',
      args: [ticketId, BigInt(quantity), emptyBytes as `0x${string}`],
      value: totalPrice
    })
  }

  // Handle ticket transfer
  const handleTransferTicket = (ticketId: bigint) => {
    if (!address || !transferTo) {
      Add('Please connect your wallet and enter a valid recipient address', { type: 'warning' })
      return
    }

    const emptyBytes = '0x'

    writeTransferContract({
      address: contractAddress,
      abi: ticketContractAbi,
      functionName: 'safeTransferFrom',
      args: [address, transferTo, ticketId, BigInt(1), emptyBytes as `0x${string}`],
    })
  }

  // Handle transaction notifications
  useEffect(() => {
    if (buyTxSuccess) {
      Add(`Tickets purchased successfully`, {
        type: 'success',
        href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${buyTxData}` : undefined,
      })
      fetchTickets() // Refresh tickets after successful purchase
    } else if (buyTxError) {
      Add(`Transaction failed: ${buyTxError.cause}`, {
        type: 'error',
      })
    }
  }, [buyTxSuccess, buyTxError, buyTxData, Add, chain?.blockExplorers?.default.url, fetchTickets])

  useEffect(() => {
    if (transferTxSuccess) {
      Add(`Ticket transferred successfully`, {
        type: 'success',
        href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${transferTxData}` : undefined,
      })
      setTransferTo(undefined)
      setSelectedTicketToTransfer(null)
      fetchTickets() // Refresh tickets after successful transfer
    } else if (transferTxError) {
      Add(`Transfer failed: ${transferTxError.cause}`, {
        type: 'error',
      })
    }
  }, [transferTxSuccess, transferTxError, transferTxData, Add, chain?.blockExplorers?.default.url, fetchTickets])

  return (
    <div className="container mx-auto">
      <div className="bg-[#24272D] p-6">
        {address && (
          <div className="bg-white text-black p-4 rounded-md mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">Account: {address}</p>
                <p className="text-sm">ETH Balance: {ethBalance ? formatBalance(ethBalance.value) : '0'}</p>
              </div>
              <button
                onClick={fetchTickets}
                className="btn btn-sm"
                disabled={isRefreshing}
              >
                {isRefreshing ? <span className="loading loading-spinner loading-sm"></span> : 'Refresh'}
              </button>
            </div>
          </div>
        )}

        {/* Main content section with two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Available Tickets */}
          <div className="bg-white text-black p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-600">Available Tickets</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="text-black">Show</th>
                    <th className="text-black">Price (ETH)</th>
                    <th className="text-black">Available</th>
                    <th className="text-black">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {availableTickets.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">No tickets available</td>
                    </tr>
                  ) : (
                    availableTickets.map(ticket => (
                      <tr key={ticket.id.toString()}>
                        <td>
                          {ticket.name}
                          {ticket.infoUrl && (
                            <div>
                              <a href={ticket.infoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                                More info
                              </a>
                            </div>
                          )}
                        </td>
                        <td>{formatBalance(ticket.price)}</td>
                        <td>{ticket.available.toString()}</td>
                        <td>
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              min="1"
                              max={ticket.maxSellPerPerson.toString()}
                              value={buyQuantity[ticket.id.toString()] || 1}
                              onChange={(e) => setBuyQuantity({
                                ...buyQuantity,
                                [ticket.id.toString()]: Math.max(1, Math.min(Number(ticket.maxSellPerPerson), parseInt(e.target.value) || 1))
                              })}
                              className="input input-xs input-bordered w-16 text-black"
                            />
                            <button
                              className="btn btn-sm bg-blue-600 text-white"
                              onClick={() => handleBuyTicket(ticket.id, ticket.price)}
                              disabled={isBuyLoading || !address}
                            >
                              {isBuyLoading ? <span className="loading loading-spinner loading-xs"></span> : 'Buy'}
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

          {/* Your Tickets */}
          <div className="bg-white text-black p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-green-700">Your Tickets</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="text-black">Show</th>
                    <th className="text-black">Qty</th>
                    <th className="text-black">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ownedTickets.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center">You don&apos;t own any tickets</td>
                    </tr>
                  ) : (
                    ownedTickets.map(ticket => (
                      <tr key={ticket.id.toString()}>
                        <td>{ticket.name}</td>
                        <td>{ticket.quantity.toString()}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline"
                            onClick={() => setSelectedTicketToTransfer(ticket.id)}
                          >
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
              <div className="mt-6 bg-gray-100 p-4 rounded-md">
                <h3 className="text-lg font-medium mb-4">Transfer Ticket</h3>
                <div className="form-control w-full mb-4">
                  <label className="label">
                    <span className="label-text text-black">Recipient Address</span>
                  </label>
                  <AddressInput
                    onRecipientChange={(address) => setTransferTo(address as `0x${string}`)}
                    placeholder="0x..."
                    className="input input-bordered w-full text-black"
                    value={transferTo || ''}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => setSelectedTicketToTransfer(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm bg-blue-600 text-white"
                    onClick={() => handleTransferTicket(selectedTicketToTransfer)}
                    disabled={isTransferLoading || !transferTo}
                  >
                    {isTransferLoading ? <span className="loading loading-spinner loading-xs"></span> : 'Confirm Transfer'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}