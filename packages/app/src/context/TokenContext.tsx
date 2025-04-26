'use client'

import React, { createContext, PropsWithChildren, useContext, useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { erc20Abi, parseEther } from 'viem'
import { useNotifications } from '@/context/Notifications'
import { ticketContractAddress, ticketContractAbi } from '@/abis'
import { sepolia } from 'viem/chains'

interface TicketDetails {
  id: bigint
  name: string
  price: bigint
  maxSellPerPerson: bigint
  infoUrl: string
}

interface TokenContextType {
  // Contract state
  isContractOwner: boolean
  isLoading: boolean

  // Ticket related state
  ticketIds: bigint[]
  selectedTicketId: bigint | null
  ticketDetails: TicketDetails | null
  ticketAmount: number

  // ERC20 token operations
  sendERC20Token: (tokenAddress: `0x${string}`, to: `0x${string}`, amount: string) => void

  // Ticket operations
  createTicket: (name: string, price: string, amount: string, maxSellPerPerson: string, infoUrl: string) => void
  buyTicket: (ticketId: bigint, amount: number) => void
  selectTicket: (ticketId: bigint | null) => void
  setTicketAmount: (amount: number) => void

  // Transaction state
  isTransactionLoading: boolean
  isTransactionSuccess: boolean
  transactionError: Error | null
  transactionHash?: `0x${string}`
}

const TokenContext = createContext<TokenContextType | undefined>(undefined)

export function TokenProvider({ children }: PropsWithChildren) {
  // User account
  const { address, chain } = useAccount()
  const { Add } = useNotifications()

  const chainId = chain?.id || sepolia
  const contractAddress = ticketContractAddress[chainId as keyof typeof ticketContractAddress]

  // Contract state
  const [isContractOwner, setIsContractOwner] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Ticket state
  const [ticketIds, setTicketIds] = useState<bigint[]>([])
  const [selectedTicketId, setSelectedTicketId] = useState<bigint | null>(null)
  const [ticketDetails, setTicketDetails] = useState<TicketDetails | null>(null)
  const [ticketAmount, setTicketAmountState] = useState(1) // Renamed this from setTicketAmount

  // Transaction state
  const [isTransactionLoading, setIsTransactionLoading] = useState(false)
  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false)
  const [transactionError, setTransactionError] = useState<Error | null>(null)
  const [transactionHash, setTransactionHash] = useState<`0x${string}` | undefined>()

  // Contract interaction hooks
  const { data: contractOwner } = useReadContract({
    address: contractAddress,
    abi: ticketContractAbi,
    functionName: 'owner',
  })

  const { data: ticketIdsLength } = useReadContract({
    address: contractAddress,
    abi: ticketContractAbi,
    functionName: 'tokenIdsLength',
  })

  const { data: selectedTicketData, refetch: refetchTicketDetails } = useReadContract({
    address: selectedTicketId ? contractAddress : undefined,
    abi: ticketContractAbi,
    functionName: 'tickets',
    args: selectedTicketId ? [selectedTicketId] : undefined,
  })

  const { data: txData, writeContract } = useWriteContract()
  const { isLoading: txLoading, error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash: txData })

  // Check if connected wallet is contract owner
  useEffect(() => {
    if (address && contractOwner) {
      setIsContractOwner(address.toLowerCase() === contractOwner.toLowerCase())
    } else {
      setIsContractOwner(false)
    }
    setIsLoading(false)
  }, [address, contractOwner])

  // Load ticket IDs
  useEffect(() => {
    const loadTicketIds = async () => {
      if (!ticketIdsLength || Number(ticketIdsLength) === 0) {
        setTicketIds([])
        return
      }

      const ids: bigint[] = []
      for (let i = 0; i < Number(ticketIdsLength); i++) {
        // Fetch ticket IDs logic here
      }
      setTicketIds(ids)
    }
    loadTicketIds()
  }, [ticketIdsLength])

  // Fetch selected ticket details
  useEffect(() => {
    if (selectedTicketData) {
      setTicketDetails({
        id: selectedTicketId!,
        name: selectedTicketData.name,
        price: selectedTicketData.price,
        maxSellPerPerson: selectedTicketData.maxSellPerPerson,
        infoUrl: selectedTicketData.infoUrl,
      })
    } else {
      setTicketDetails(null)
    }
  }, [selectedTicketData, selectedTicketId])

  // Handle transaction state
  useEffect(() => {
    setIsTransactionLoading(txLoading)
    if (txSuccess) {
      setIsTransactionSuccess(true)
      setTransactionHash(txData)
      Add(`Transaction successful`, {
        type: 'success',
        href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${txData}` : undefined,
      })
    } else if (txError) {
      setTransactionError(txError)
      Add(`Transaction failed: ${txError.cause}`, {
        type: 'error',
      })
    }
  }, [txSuccess, txError, txLoading, txData, Add, chain])

  // Send ERC20 token to another address
  const sendERC20Token = (tokenAddress: `0x${string}`, to: `0x${string}`, amount: string) => {
    setIsTransactionLoading(true)
    setTransactionError(null)
    setIsTransactionSuccess(false)

    try {
      writeContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [to, parseEther(amount)],
      })
    } catch (e) {
      setTransactionError(e as Error)
      setIsTransactionLoading(false)
      Add(`Error preparing transaction: ${(e as Error).message}`, {
        type: 'error',
      })
    }
  }

  // Create a new ticket
  const createTicket = (name: string, price: string, amount: string, maxSellPerPerson: string, infoUrl: string) => {
    setIsTransactionLoading(true)
    setTransactionError(null)
    setIsTransactionSuccess(false)

    try {
      writeContract({
        address: contractAddress,
        abi: ticketContractAbi,
        functionName: 'createTicket',
        args: [name, parseEther(price), BigInt(amount), BigInt(maxSellPerPerson), infoUrl],
      })
    } catch (e) {
      setTransactionError(e as Error)
      setIsTransactionLoading(false)
      Add(`Error preparing transaction: ${(e as Error).message}`, {
        type: 'error',
      })
    }
  }

  // Buy a ticket
  const buyTicket = (ticketId: bigint, amount: number) => {
    setIsTransactionLoading(true)
    setTransactionError(null)
    setIsTransactionSuccess(false)

    try {
      writeContract({
        address: contractAddress,
        abi: ticketContractAbi,
        functionName: 'buyTicket',
        args: [ticketId, BigInt(amount)],
      })
    } catch (e) {
      setTransactionError(e as Error)
      setIsTransactionLoading(false)
      Add(`Error preparing transaction: ${(e as Error).message}`, {
        type: 'error',
      })
    }
  }

  // Select a ticket
  const selectTicket = (ticketId: bigint | null) => {
    setSelectedTicketId(ticketId)
    if (ticketId) {
      refetchTicketDetails()
    }
  }

  // Set ticket amount - Function exposed in context
  const setTicketAmount = (amount: number) => {
    setTicketAmountState(amount)
  }

  return (
    <TokenContext.Provider
      value={{
        isContractOwner,
        isLoading,
        ticketIds,
        selectedTicketId,
        ticketDetails,
        ticketAmount,
        sendERC20Token,
        createTicket,
        buyTicket,
        selectTicket,
        setTicketAmount,
        isTransactionLoading,
        isTransactionSuccess,
        transactionError,
        transactionHash
      }}
    >
      {children}
    </TokenContext.Provider>
  )
}

export function useToken() {
  const context = useContext(TokenContext)
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider')
  }
  return context
}