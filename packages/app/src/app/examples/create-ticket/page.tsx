'use client'
import { useEffect, useRef, useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useNotifications } from '@/context/Notifications'
import { parseEther } from 'viem'
import { ticketContractAddress, ticketContractAbi } from '@/abis'
import { sepolia } from 'viem/chains'

export default function CreateTicket() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('0.01')
  const [amount, setAmount] = useState('100')
  const [maxSellPerPerson, setMaxSellPerPerson] = useState('5')
  const [infoUrl, setInfoUrl] = useState('')

  const { address, chain } = useAccount()
  const { Add } = useNotifications()

  const chainId = chain?.id || sepolia
  const contractAddress = ticketContractAddress[chainId as keyof typeof ticketContractAddress]

  const { data, writeContract } = useWriteContract()

  const {
    isLoading,
    error: txError,
    isSuccess: txSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  })

  const notifiedTxRef = useRef<string | undefined>(undefined)

  const handleCreateTicket = () => {
    if (!address) {
      Add('Please connect your wallet first', { type: 'warning' })
      return
    }

    const emptyBytes = '0x'

    writeContract({
      address: contractAddress,
      abi: ticketContractAbi,
      functionName: 'create',
      args: [name, parseEther(price), BigInt(amount), BigInt(maxSellPerPerson), infoUrl, emptyBytes as `0x${string}`],
    })
  }

  useEffect(() => {
    if (txSuccess && data && notifiedTxRef.current !== data) {
      Add(`Transaction successful`, {
        type: 'success',
        href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${data}` : undefined,
      })
      notifiedTxRef.current = data
    } else if (txError && notifiedTxRef.current !== 'error') {
      Add(`Transaction failed: ${txError.cause}`, {
        type: 'error',
      })
      notifiedTxRef.current = 'error'
    }
  }, [txSuccess, txError, Add, chain?.blockExplorers?.default.url, data])

  return (
    <div className='flex-column align-center'>
      <h1 className='text-xl mb-6'>Create Ticket</h1>

      <div className='flex flex-col gap-4 max-w-md'>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text'>Event Name</span>
          </div>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter event name'
            className='input input-bordered w-full'
          />
        </label>

        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text'>Ticket Price (ETH)</span>
          </div>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='0.01'
            className='input input-bordered w-full'
            step='0.01'
            min='0'
          />
        </label>

        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text'>Total Supply</span>
          </div>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='100'
            className='input input-bordered w-full'
            min='1'
          />
        </label>

        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text'>Max Tickets Per Person</span>
          </div>
          <input
            type='number'
            value={maxSellPerPerson}
            onChange={(e) => setMaxSellPerPerson(e.target.value)}
            placeholder='5'
            className='input input-bordered w-full'
            min='1'
          />
        </label>

        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text'>Event Info URL</span>
          </div>
          <input
            type='text'
            value={infoUrl}
            onChange={(e) => setInfoUrl(e.target.value)}
            placeholder='https://example.com/event-info'
            className='input input-bordered w-full'
          />
        </label>

        <button className='btn btn-primary mt-4' onClick={handleCreateTicket} disabled={isLoading || !name || !address}>
          {isLoading ? <span className='loading loading-dots loading-sm'></span> : 'Create Ticket'}
        </button>
      </div>
    </div>
  )
}
