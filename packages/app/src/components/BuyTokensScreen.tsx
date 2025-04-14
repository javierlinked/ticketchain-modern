'use client'
import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatEther, parseEther } from 'viem'
import { TokenBalance } from '@/components/TokenBalance'
import { useNotifications } from '@/context/Notifications'
import { ticketContractAbi } from '@/utils/contractConfig'

interface Ticket {
  id: bigint
  name: string
  price: bigint
  maxSellPerPerson: bigint
  infoUrl: string
  formattedPrice?: string
}

interface BalanceItem {
  id: bigint
  name: string
  amount: bigint
}

export default function BuyTokensScreen() {
  const [availableTokens, setAvailableTokens] = useState<Ticket[]>([])
  const [userBalances, setUserBalances] = useState<BalanceItem[]>([])
  const [amounts, setAmounts] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  
  const { address } = useAccount()
  const { Add } = useNotifications()

  // Contract configuration - replace with your contract address
  const contractAddress = process.env.NEXT_PUBLIC_TICKET_CONTRACT_ADDRESS as `0x${string}`

  // Read token data from contract
  const { data: tokenIdsLength } = useReadContract({
    address: contractAddress,
    abi: ticketContractAbi,
    functionName: 'tokenIdsLength',
  })

  // Buy token function
  const { writeContract } = useWriteContract()
  const { data: hash, isPending, error: writeError } = useWriteContract()
  
  const { 
    isLoading: isConfirming, 
    isSuccess: txSuccess,
    error: txError
  } = useWaitForTransactionReceipt({ 
    hash 
  })

  // Fetch token data
  useEffect(() => {
    if (tokenIdsLength && address) {
      fetchTokens()
    }
  }, [tokenIdsLength, address])

  // Handle transaction results
  useEffect(() => {
    if (txSuccess) {
      Add(`Transaction successful!`, {
        type: 'success',
      })
      // Refresh data after successful transaction
      fetchTokens()
    } else if (txError || writeError) {
      const errorMessage = txError?.message || writeError?.message || 'Transaction failed'
      Add(`Error: ${errorMessage}`, {
        type: 'error',
      })
    }
  }, [txSuccess, txError, writeError, Add])

  // Fetch all tokens and balances
  const fetchTokens = async () => {
    setIsLoading(true)
    try {
      const length = Number(tokenIdsLength)
      if (length > 0) {
        const tokensData = await Promise.all(
          Array.from({ length }, async (_, i) => {
            // Get token ID at index
            const { data: tokenId } = await readContract(contractAddress, 'tokenIds', [BigInt(i)])
            if (!tokenId) return null
            
            // Get ticket details
            const { data: ticket } = await readContract(contractAddress, 'tickets', [tokenId])
            if (!ticket) return null
            
            return {
              id: tokenId,
              name: ticket.name,
              price: ticket.price,
              maxSellPerPerson: ticket.maxSellPerPerson,
              infoUrl: ticket.infoUrl,
              formattedPrice: formatEther(ticket.price)
            } as Ticket
          })
        )
        
        const filteredTokens = tokensData.filter(Boolean) as Ticket[]
        setAvailableTokens(filteredTokens)
        
        // Get user balances
        const balances = await Promise.all(
          filteredTokens.map(async (token) => {
            const { data: balance } = await readContract(
              contractAddress, 
              'balanceOf', 
              [address as `0x${string}`, token.id]
            )
            
            return {
              id: token.id,
              name: token.name,
              amount: balance || BigInt(0)
            } as BalanceItem
          })
        )
        
        // Only show tokens with non-zero balances
        setUserBalances(balances.filter(item => item.amount > BigInt(0)))
      }
    } catch (error) {
      console.error('Error fetching tokens:', error)
      Add('Failed to load tokens', { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function for contract reads
  const readContract = async (address: `0x${string}`, functionName: string, args: unknown[] = []) => {
    return await useReadContract.fetch({
      address,
      abi: ticketContractAbi,
      functionName,
      args
    })
  }

  // Buy token handler
  const handleBuyToken = async (token: Ticket) => {
    const amountStr = amounts[token.id.toString()] || ''
    const amount = Number(amountStr)
    
    if (!amountStr || isNaN(amount) || amount <= 0) {
      Add('Please enter a valid amount', { type: 'warning' })
      return
    }
    
    try {
      // Empty bytes for data parameter
      const emptyData = '0x'
      const totalPrice = BigInt(amount) * token.price
      
      writeContract({
        address: contractAddress,
        abi: ticketContractAbi,
        functionName: 'buy',
        args: [token.id, BigInt(amount), emptyData],
        value: totalPrice
      })
      
      // Clear amount after purchase attempt
      setAmounts(prev => ({
        ...prev,
        [token.id.toString()]: ''
      }))
    } catch (error) {
      console.error('Buy token error:', error)
      Add(`Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`, {
        type: 'error'
      })
    }
  }

  // Burn token handler
  const handleBurnToken = async (token: BalanceItem) => {
    try {
      writeContract({
        address: contractAddress,
        abi: ticketContractAbi,
        functionName: 'burn',
        args: [address, token.id, token.amount]
      })
    } catch (error) {
      console.error('Burn token error:', error)
      Add(`Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`, {
        type: 'error'
      })
    }
  }

  // Transfer token handler (placeholder)
  const handleTransferToken = () => {
    Add('Transfer functionality not yet implemented', { type: 'info' })
  }

  // Update amount for a specific token
  const updateAmount = (tokenId: string, value: string) => {
    setAmounts(prev => ({
      ...prev,
      [tokenId]: value
    }))
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <div className="stats shadow-sm bg-[#282c33] mb-4">
          <div className="stat">
            <div className="stat-title">Your address</div>
            <div className="stat-value text-sm">{address}</div>
          </div>
        </div>
        
        <div className="stats shadow-sm bg-[#282c33] mb-6">
          <div className="stat">
            <div className="stat-title">Your ETH balance</div>
            {address ? <TokenBalance address={address} /> : <p>Please connect your wallet</p>}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Available Tickets</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : availableTokens.length === 0 ? (
          <div className="bg-[#282c33] p-6 rounded-lg text-center">
            No tickets available
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price (ETH)</th>
                  <th>Max Per Person</th>
                  <th>Info URL</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {availableTokens.map(token => (
                  <tr key={token.id.toString()}>
                    <td>{token.id.toString()}</td>
                    <td>{token.name}</td>
                    <td>{token.formattedPrice}</td>
                    <td>{token.maxSellPerPerson.toString()}</td>
                    <td>
                      <a 
                        href={token.infoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="link link-primary"
                      >
                        View Info
                      </a>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input input-bordered w-20"
                        value={amounts[token.id.toString()] || ''}
                        onChange={(e) => updateAmount(token.id.toString(), e.target.value)}
                        min="1"
                        max={token.maxSellPerPerson.toString()}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleBuyToken(token)}
                        disabled={isPending || isConfirming || !amounts[token.id.toString()]}
                      >
                        {isPending || isConfirming ? (
                          <span className="loading loading-dots loading-xs"></span>
                        ) : (
                          'Buy'
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Your Tickets</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : userBalances.length === 0 ? (
          <div className="bg-[#282c33] p-6 rounded-lg text-center">
            You don't own any tickets
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userBalances.map(balance => (
                  <tr key={balance.id.toString()}>
                    <td>{balance.name}</td>
                    <td>{balance.amount.toString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleBurnToken(balance)}
                        disabled={isPending || isConfirming}
                      >
                        {isPending || isConfirming ? (
                          <span className="loading loading-dots loading-xs"></span>
                        ) : (
                          'Burn'
                        )}
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={handleTransferToken}
                      >
                        Transfer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}