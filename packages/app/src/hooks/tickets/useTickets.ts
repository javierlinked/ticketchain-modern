import { useState, useCallback, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { sepolia } from 'viem/chains'
import { ticketContractAddress, ticketContractAbi } from '@/abis'
import { useNotifications } from '@/context/notifications'
import { readContract } from '@/services/contract/contractService'
import { Ticket, OwnedTicket, TicketDetails } from '@/types/tickets'

export function useTickets() {
  const [availableTickets, setAvailableTickets] = useState<Ticket[]>([])
  const [ownedTickets, setOwnedTickets] = useState<OwnedTicket[]>([])
  const [buyQuantity, setBuyQuantity] = useState<Record<string, number>>({})
  const [isRefreshing, setIsRefreshing] = useState(false)
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

  useEffect(() => {
    if (address && contractOwner) {
      setIsContractOwner(address.toLowerCase() === contractOwner.toLowerCase())
    } else {
      setIsContractOwner(false)
    }
  }, [address, contractOwner])

  const fetchTicketIds = useCallback(async () => {
    if (!ticketIdsLength || !contractAddress || isContractOwner) {
      setTicketIds([]) // Reset ticket IDs when conditions are not met
      setInitialLoad(false) // Make sure to set initial load to false
      return
    }

    setLoadingError(null)
    try {
      const ids: bigint[] = []
      const safeLength = Math.min(Number(ticketIdsLength), 100)

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
          }
        } catch (error) {
          console.error(`Error fetching token ID ${i}:`, error)
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

  const fetchTickets = useCallback(async () => {
    if (!address || !contractAddress || ticketIds.length === 0 || isContractOwner) return

    setIsRefreshing(true)
    setLoadingError(null)
    try {
      const available: Ticket[] = []
      const owned: OwnedTicket[] = []

      for (const id of ticketIds) {
        try {
          const details = await readContract<TicketDetails>({
            address: contractAddress,
            abi: ticketContractAbi,
            functionName: 'tickets',
            args: [id],
          })

          const balance = await readContract<bigint>({
            address: contractAddress,
            abi: ticketContractAbi,
            functionName: 'balanceOf',
            args: [address as `0x${string}`, id],
          })

          if (details) {
            const ticket: Ticket = {
              id,
              name: details[1] || 'Unknown Ticket',
              price: details[2] || BigInt(0),
              available: BigInt(0),
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

  // Handle buying tickets
  const handleBuyTicket = useCallback(
    (ticketId: bigint, price: bigint) => {
      if (!address) {
        Add('Please connect your wallet', { type: 'warning' })
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
    [address, contractAddress, writeBuyContract, buyQuantity, Add]
  )

  // Initial load
  useEffect(() => {
    if (initialLoad) {
      fetchTicketIds()
    }
  }, [initialLoad, fetchTicketIds])

  // Fetch tickets when IDs change
  useEffect(() => {
    if (ticketIds.length > 0) {
      fetchTickets()
    }
  }, [ticketIds, fetchTickets])

  // Handle transaction notifications
  useEffect(() => {
    if (buyTxSuccess) {
      Add('Successfully purchased ticket!', { type: 'success' })
      fetchTickets()
    }
    if (buyTxError) {
      Add('Failed to purchase ticket', { type: 'error' })
    }
  }, [buyTxSuccess, buyTxError, Add, fetchTickets])

  return {
    availableTickets,
    ownedTickets,
    buyQuantity,
    isRefreshing,
    isBuyLoading,
    loadingError,
    isContractOwner,
    setBuyQuantity,
    fetchTickets,
    handleBuyTicket,
  }
}
