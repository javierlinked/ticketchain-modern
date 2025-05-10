'use client'
import React, { useState, useEffect } from 'react'
import { useToken } from '@/context/TokenContext'
import { useAccount, useReadContract } from 'wagmi'
import { sepolia } from 'viem/chains'
import { ticketContractAddress, ticketContractAbi } from '@/abis'
import CreateTicket from '../app/examples/create-ticket/page'
import BuyTicket from '../app/examples/buy-ticket/page'
import { useNotifications } from '@/context/Notifications'

export default function TicketsPage() {
  const { isContractOwner, isLoading } = useToken()
  const [switchingOwner, setSwitchingOwner] = useState(false)
  const { address, chain } = useAccount()
  const { Add } = useNotifications()

  const chainId = chain?.id || sepolia
  const contractAddress = ticketContractAddress[chainId as keyof typeof ticketContractAddress]

  const { data: contractOwner } = useReadContract({
    address: contractAddress,
    abi: ticketContractAbi,
    functionName: 'owner',
  })

  const handleSwitchToOwner = () => {
    setSwitchingOwner(true)

    // Show the owner address for the user to copy and import into their wallet
    if (contractOwner) {
      Add(`To switch to the owner account, please add the contract owner address to your wallet: ${contractOwner}`, {
        type: 'info',
      })

      // Copy the address to clipboard
      navigator.clipboard.writeText(contractOwner as string)
        .then(() => {
          Add('Contract owner address copied to clipboard!', { type: 'success' })
        })
        .catch(err => {
          Add('Failed to copy contract owner address', { type: 'error' })
        });
    }

    setTimeout(() => setSwitchingOwner(false), 1500);
  }

  if (isLoading) return <div className="flex justify-center items-center min-h-[300px]"><div className="loading loading-spinner loading-lg"></div></div>

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ticket Management</h1>

        <button
          className={`btn btn-sm btn-outline ${switchingOwner ? 'loading' : ''}`}
          onClick={handleSwitchToOwner}
          disabled={switchingOwner || isContractOwner}
        >
          {isContractOwner ? 'You are the Owner' : 'Switch to Owner'}
        </button>
      </div>

      {isContractOwner ? (
        <div>
          <div className="alert alert-info mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>You are the contract owner. You can create new tickets.</span>
          </div>
          <CreateTicket />
        </div>
      ) : (
        <div>
          <div className="alert alert-info mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>You can purchase available tickets from events.</span>

            {contractOwner && (
              <div className="mt-2 text-xs">
                To test as contract owner, add this address to your wallet:
                <code className="ml-1 bg-base-300 p-1 rounded">{contractOwner}</code>
              </div>
            )}
          </div>
          <BuyTicket />
        </div>
      )}
    </div>
  )
}
