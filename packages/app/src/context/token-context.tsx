'use client'

import React, { createContext, PropsWithChildren, useContext } from 'react'
import { useAccount } from 'wagmi'
import { sepolia } from 'viem/chains'
import { ticketContractAddress } from '@/abis'
import { useContractOwnership } from '@/hooks/web3/useContractOwnership'
import { useTicketData, TicketDetails } from '@/hooks/tickets/useTicketData'
import { useTicketOperations } from '@/hooks/tickets/useTicketOperations'
import { useTokenOperations } from '@/hooks/web3/useTokenOperations'

interface TokenContextType {
  isContractOwner: boolean
  isLoading: boolean

  ticketIds: bigint[]
  selectedTicketId: bigint | null
  ticketDetails: TicketDetails | null
  ticketAmount: number

  sendERC20Token: (tokenAddress: `0x${string}`, to: `0x${string}`, amount: string) => void

  createTicket: (name: string, price: string, amount: string, maxSellPerPerson: string, infoUrl: string) => void
  buyTicket: (ticketId: bigint, amount: number) => void
  selectTicket: (ticketId: bigint | null) => void
  setTicketAmount: (amount: number) => void

  isTransactionLoading: boolean
  isTransactionSuccess: boolean
  transactionError: Error | null
  transactionHash?: `0x${string}`
}

const TokenContext = createContext<TokenContextType | undefined>(undefined)

export function TokenProvider({ children }: PropsWithChildren) {
  // User account
  const { address, chain } = useAccount()

  const chainId = chain?.id || sepolia.id
  const contractAddress = ticketContractAddress[chainId as keyof typeof ticketContractAddress]

  // Use our custom hooks that implement SRP
  const { isContractOwner, isLoading } = useContractOwnership(contractAddress)
  const { ticketIds, selectedTicketId, ticketDetails, ticketAmount, selectTicket, setTicketAmount } =
    useTicketData(contractAddress)

  const {
    createTicket,
    buyTicket,
    isTransactionLoading: ticketTxLoading,
    isTransactionSuccess: ticketTxSuccess,
    transactionError: ticketTxError,
    transactionHash: ticketTxHash,
  } = useTicketOperations(contractAddress, chain)

  const {
    sendERC20Token,
    isTransactionLoading: tokenTxLoading,
    isTransactionSuccess: tokenTxSuccess,
    transactionError: tokenTxError,
    transactionHash: tokenTxHash,
  } = useTokenOperations(chain)

  // Combine transaction states from both operations
  const isTransactionLoading = ticketTxLoading || tokenTxLoading
  const isTransactionSuccess = ticketTxSuccess || tokenTxSuccess
  const transactionError = ticketTxError || tokenTxError
  const transactionHash = ticketTxHash || tokenTxHash

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
        transactionHash,
      }}>
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
