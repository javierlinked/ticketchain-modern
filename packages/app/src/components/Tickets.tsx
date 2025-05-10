'use client'
import React from 'react'
import { useToken } from '@/context/TokenContext'
import { useAccount } from 'wagmi'
import CreateTicket from '../app/examples/create-ticket/page'
import BuyTicket from '../app/examples/buy-ticket/page'
import { WalletInfo } from './WalletInfo'

export default function TicketsPage() {
  const { isContractOwner, isLoading } = useToken()
  const { address } = useAccount()

  if (isLoading)
    return (
      <div className='flex justify-center items-center min-h-[300px]'>
        <div className='loading loading-spinner loading-lg'></div>
      </div>
    )

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-2xl font-bold mb-6'>Ticket Management</h1>

      {isContractOwner ? (
        <div>
          <div className='alert alert-info mb-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='stroke-current shrink-0 w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
            </svg>
            <span>You are the contract owner. You can create new tickets.</span>
          </div>
          <WalletInfo address={address} />
          <CreateTicket />
        </div>
      ) : (
        <div>
          <div className='alert alert-info mb-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='stroke-current shrink-0 w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
            </svg>
            <span>You can purchase available tickets from events.</span>
          </div>
          <WalletInfo address={address} />
          <BuyTicket />
        </div>
      )}
    </div>
  )
}
