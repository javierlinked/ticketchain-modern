'use client'
import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useNotifications } from '@/context/Notifications'
import { parseEther } from 'viem'
import { ticketContractAddress, ticketContractAbi } from '@/abis'

export default function CreateTicket() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('0.01')
  const [amount, setAmount] = useState('100')
  const [maxSellPerPerson, setMaxSellPerPerson] = useState('5')
  const [infoUrl, setInfoUrl] = useState('')

  const { address, chain } = useAccount()
  const { Add } = useNotifications()
  
  const chainId = chain?.id
  const contractAddress = ticketContractAddress[chainId as keyof typeof ticketContractAddress]
  
  const { data, writeContract } = useWriteContract()
  const { isLoading, error: txError, isSuccess } = useWaitForTransactionReceipt({ hash: data })

  const handleCreateTicket = () => {
    if (!address) {
      Add('Please connect your wallet first', { type: 'warning' })
      return
    }
    
    if (!contractAddress) {
      Add('Contract is not deployed on the current network', { type: 'error' })
      return
    }
    
    const emptyBytes = '0x'
    
    writeContract({
      address: contractAddress,
      abi: ticketContractAbi,
      functionName: 'create',
      args: [
        name,
        parseEther(price),
        BigInt(amount),
        BigInt(maxSellPerPerson),
        infoUrl,
        emptyBytes as `0x${string}`
      ],
    })
  }

  // Handle transaction status notifications
  useEffect(() => {
    if (isSuccess && data) {
      Add(`Ticket created successfully`, {
        type: 'success',
        href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${data}` : undefined,
      })
    } else if (txError) {
      Add(`Failed to create ticket: ${txError.cause}`, { type: 'error' })
    }
  }, [isSuccess, txError, data, chain, Add])

  if (!contractAddress) {
    return (
      <div className="flex-column align-center">
        <h1 className="text-xl mb-6">Create Ticket</h1>
        <div className="alert alert-warning">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>Contract is not deployed on the current network. Please switch to a supported network.</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-column align-center">
      <h1 className="text-xl mb-6">Create Ticket</h1>
      
      <div className="flex flex-col gap-4 max-w-md">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Event Name</span>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter event name"
            className="input input-bordered w-full"
          />
        </label>
        
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Ticket Price (ETH)</span>
          </div>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.01"
            className="input input-bordered w-full"
            step="0.01"
            min="0"
          />
        </label>
        
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Total Supply</span>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100"
            className="input input-bordered w-full"
            min="1"
          />
        </label>
        
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Max Tickets Per Person</span>
          </div>
          <input
            type="number"
            value={maxSellPerPerson}
            onChange={(e) => setMaxSellPerPerson(e.target.value)}
            placeholder="5"
            className="input input-bordered w-full"
            min="1"
          />
        </label>
        
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Event Info URL</span>
          </div>
          <input
            type="text"
            value={infoUrl}
            onChange={(e) => setInfoUrl(e.target.value)}
            placeholder="https://example.com/event-info"
            className="input input-bordered w-full"
          />
        </label>
        
        <button 
          className="btn btn-primary mt-4" 
          onClick={handleCreateTicket}
          disabled={isLoading || !name || !address}
        >
          {isLoading ? <span className="loading loading-dots loading-sm"></span> : 'Create Ticket'}
        </button>
      </div>
    </div>
  )
}