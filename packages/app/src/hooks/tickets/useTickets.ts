import { useState, useCallback, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { sepolia } from 'viem/chains'
import { ticketContractAddress, ticketContractAbi } from '@/abis'
import { useNotifications } from '@/context/Notifications'
import { readContract } from '@/services/contract/contractService'
import { Ticket, OwnedTicket, TicketDetails } from '@/types/tickets'

export function useTickets() {
  const [availableTickets, setAvailableTickets] = useState<Ticket[]>([])
  const [ownedTickets, setOwnedTickets] = useState<OwnedTicket[]>([])
  const [buyQuantity, setBuyQuantity] = useState<Record<string, number>>({})
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [transferTo, setTransferTo] = useState<`0x${string}` | undefined>()
  const [selectedTicketToTransfer, setSelectedTicketToTransfer] = useState<bigint | null>(null)
  const [isContractOwner, setIsContractOwner] = useState(false)
  const [ticketIds, setTicketIds] = useState<bigint[]>([])
  const [loadingError, setLoadingError] = useState<string | null>(null)
  const [initialLoad, setInitialLoad] = useState(true)

  const { address, chain } = useAccount()
  const { Add } = useNotifications()

  const chainId = chain?.id || sepolia.id
  const contractAddress = ticketContractAddress[chainId as keyof typeof ticketContractAddress]

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

  // Update owner status
  useEffect(() => {
    if (address && contractOwner) {
      setIsContractOwner(address.toLowerCase() === contractOwner.toLowerCase())
    } else {
      setIsContractOwner(false)
    }
  }, [address, contractOwner])

  // Transfer ticket contract hooks
  const { data: transferTxData, writeContract: writeTransferContract } = useWriteContract()
  const {
    isLoading: isTransferLoading,
    error: transferTxError,
    isSuccess: transferTxSuccess,
  } = useWaitForTransactionReceipt({
    hash: transferTxData,
  })

  // Function to fetch ticket IDs with retry logic
  const fetchTicketIds = useCallback(async () => {
    if (!ticketIdsLength || !contractAddress || isContractOwner) {
      setTicketIds([]) // Reset ticket IDs when conditions are not met
      setInitialLoad(false) // Make sure to set initial load to false
      return
    }

    setLoadingError(null)
    try {
      const ids: bigint[] = []
      // Only try to fetch up to a reasonable limit
      const safeLength = Math.min(Number(ticketIdsLength), 100)

      let successCount = 0
      let failureCount = 0

      // Use our service with retry logic
      for (let i = 0; i < safeLength; i++) {
        try {
          const id = await readContract<bigint>({
            address: contractAddress,
            abi: ticketContractAbi,
            functionName: 'tokenIds',
            args: [BigInt(i)],
          })
          if (id) {
            ids.push(id)
            successCount++
          }
        } catch (error) {
          console.error(`Error fetching token ID ${i}:`, error)
          failureCount++
          // Continue to the next ID
        }

        // If we've had too many consecutive failures, break to avoid excessive API calls
        if (failureCount > 5 && successCount === 0) {
          console.warn('Too many consecutive failures, stopping token ID fetch')
          break
        }
      }

      setTicketIds(ids)

      if (ids.length === 0) {
        const errorMsg = 'Unable to fetch ticket information. Please check your network connection or try again later.'
        setLoadingError(errorMsg)
        Add(errorMsg, { type: 'warning' })
      }
    } catch (error) {
      const errorMsg = 'Failed to load ticket information'
      console.error(errorMsg, error)
      setLoadingError(errorMsg)
      Add(errorMsg, { type: 'error' })
    } finally {
      setInitialLoad(false)
    }
  }, [contractAddress, ticketIdsLength, Add, isContractOwner])

  // Fetch ticket details for each ID with error handling
  const fetchTickets = useCallback(async () => {
    if (!address || !contractAddress || ticketIds.length === 0 || isContractOwner) return

    setIsRefreshing(true)
    setLoadingError(null)
    try {
      const available: Ticket[] = []
      const owned: OwnedTicket[] = []

      for (const id of ticketIds) {
        try {
          // Get ticket details with our service
          const details = await readContract<TicketDetails>({
            address: contractAddress,
            abi: ticketContractAbi,
            functionName: 'tickets',
            args: [id],
          })

          // Get total supply
          const supply = await readContract<bigint>({
            address: contractAddress,
            abi: ticketContractAbi,
            functionName: 'totalSupply',
            args: [id],
          })

          // Get user balance
          const balance = await readContract<bigint>({
            address: contractAddress,
            abi: ticketContractAbi,
            functionName: 'balanceOf',
            args: [address as `0x${string}`, id],
          })

          if (details) {
            // Create ticket object using typed details
            const ticket: Ticket = {
              id,
              name: details[1] || 'Unknown Ticket',
              price: details[2] || BigInt(0),
              available: supply,
              maxSellPerPerson: details[3] || BigInt(1),
              infoUrl: details[4] || '',
            }

            available.push(ticket)

            // Set default buy quantity
            setBuyQuantity((prev) => ({
              ...prev,
              [id.toString()]: 1,
            }))

            // If user owns some tickets
            if (balance > BigInt(0)) {
              owned.push({
                id,
                name: details[1] || 'Unknown Ticket',
                quantity: balance,
              })
            }
          }
        } catch (error) {
          console.error(`Error processing ticket ${id}:`, error)
          // Continue to next ticket
        }
      }

      setAvailableTickets(available)
      setOwnedTickets(owned)

      if (available.length === 0 && owned.length === 0) {
        const errorMsg = 'No tickets found or there was an error loading ticket data.'
        setLoadingError(errorMsg)
        Add(errorMsg, { type: 'info' })
      }
    } catch (error) {
      const errorMsg = 'Failed to load tickets'
      console.error(errorMsg, error)
      setLoadingError(errorMsg)
      Add(errorMsg, { type: 'error' })
    } finally {
      setIsRefreshing(false)
      setInitialLoad(false)
    }
  }, [address, contractAddress, ticketIds, isContractOwner, Add])

  // Load ticket IDs when length is available
  useEffect(() => {
    if (ticketIdsLength && !isContractOwner) {
      fetchTicketIds()
    }
  }, [fetchTicketIds, ticketIdsLength, isContractOwner])

  // Load tickets when ticket IDs are available or address changes
  useEffect(() => {
    if (ticketIds.length > 0 && address && !isContractOwner) {
      fetchTickets()
    }
  }, [fetchTickets, ticketIds, address, isContractOwner])

  // Handle ticket purchase
  const handleBuyTicket = useCallback(
    (ticketId: bigint, price: bigint) => {
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
        value: totalPrice,
      })
    },
    [address, buyQuantity, contractAddress, writeBuyContract, Add]
  )

  // Handle ticket transfer
  const handleTransferTicket = useCallback(
    (ticketId: bigint) => {
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
    },
    [address, transferTo, contractAddress, writeTransferContract, Add]
  )

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
        href: chain?.blockExplorers?.default.url
          ? `${chain.blockExplorers.default.url}/tx/${transferTxData}`
          : undefined,
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

  return {
    // State
    availableTickets,
    ownedTickets,
    buyQuantity,
    isRefreshing,
    transferTo,
    selectedTicketToTransfer,
    isContractOwner,
    loadingError,
    initialLoad,
    isBuyLoading,
    isTransferLoading,

    // Actions
    setBuyQuantity,
    setTransferTo,
    setSelectedTicketToTransfer,
    fetchTickets,
    handleBuyTicket,
    handleTransferTicket,
  }
}
