'use client'
import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { TokenBalance } from '@/components/TokenBalance'
import { useNotifications } from '@/context/Notifications'
import { ticketContractAbi } from '@/abis'

export default function CreateScreen() {
  const [showName, setShowName] = useState('')
  const [showPrice, setShowPrice] = useState('')
  const [initialSupply, setInitialSupply] = useState('')
  const [maxSellPerPerson, setMaxSellPerPerson] = useState('')
  const [infoUrl, setInfoUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { address } = useAccount()
  const { Add } = useNotifications()

  // Contract configuration - replace with your contract address
  const contractAddress = process.env.NEXT_PUBLIC_TICKET_CONTRACT_ADDRESS as `0x${string}`

  // Create token function
  const { writeContract } = useWriteContract()
  const { data: hash, isPending, error: writeError, isSuccess: writeSuccess } = useWriteContract()

  const {
    isLoading: isConfirming,
    isSuccess: txSuccess,
    error: txError
  } = useWaitForTransactionReceipt({
    hash
  })

  const handleCreateToken = async () => {
    if (!isFormValid()) {
      Add('Please fill in all fields correctly', { type: 'error' })
      return
    }

    try {
      setIsSubmitting(true)

      // Empty bytes for data parameter
      const emptyData = '0x'

      writeContract({
        address: contractAddress,
        abi: ticketContractAbi,
        functionName: 'create',
        args: [
          showName,
          parseEther(showPrice),
          BigInt(initialSupply),
          BigInt(maxSellPerPerson),
          infoUrl,
          emptyData
        ]
      })
    } catch (error) {
      console.error('Create token error:', error)
      Add(`Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`, {
        type: 'error'
      })
      setIsSubmitting(false)
    }
  }

  // Form validation
  const isFormValid = () => {
    return (
      showName.trim() !== '' &&
      showPrice.trim() !== '' &&
      !isNaN(Number(showPrice)) &&
      initialSupply.trim() !== '' &&
      !isNaN(Number(initialSupply)) &&
      maxSellPerPerson.trim() !== '' &&
      !isNaN(Number(maxSellPerPerson)) &&
      infoUrl.trim() !== ''
    )
  }

  // Reset form
  const resetForm = () => {
    setShowName('')
    setShowPrice('')
    setInitialSupply('')
    setMaxSellPerPerson('')
    setInfoUrl('')
    setIsSubmitting(false)
  }

  // Handle transaction results
  useEffect(() => {
    if (txSuccess) {
      Add(`Show created successfully!`, {
        type: 'success',
      })
      resetForm()
    } else if (txError || writeError) {
      const errorMessage = txError?.message || writeError?.message || 'Transaction failed'
      Add(`Error: ${errorMessage}`, {
        type: 'error',
      })
      setIsSubmitting(false)
    }
  }, [txSuccess, txError, writeError, Add])

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create Show Token</h2>

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

      <div className="bg-[#282c33] p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Show name</label>
          <input
            type="text"
            value={showName}
            onChange={(e) => setShowName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Concert name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Show price (ETH)</label>
          <input
            type="text"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            className="input input-bordered w-full"
            placeholder="0.01"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Initial supply</label>
          <input
            type="number"
            value={initialSupply}
            onChange={(e) => setInitialSupply(e.target.value)}
            className="input input-bordered w-full"
            placeholder="100"
            min="1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Maximum sell per person</label>
          <input
            type="number"
            value={maxSellPerPerson}
            onChange={(e) => setMaxSellPerPerson(e.target.value)}
            className="input input-bordered w-full"
            placeholder="2"
            min="1"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Info URL</label>
          <input
            type="text"
            value={infoUrl}
            onChange={(e) => setInfoUrl(e.target.value)}
            className="input input-bordered w-full"
            placeholder="https://example.com/event-info"
          />
        </div>

        <button
          className="btn btn-primary w-full"
          onClick={handleCreateToken}
          disabled={isSubmitting || !isFormValid() || !address}>
          {isSubmitting ? <span className="loading loading-dots loading-sm"></span> : 'Create Show'}
        </button>
      </div>
    </div>
  )
}