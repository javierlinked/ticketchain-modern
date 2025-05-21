import { useAccount, useSwitchChain } from 'wagmi'
import { useNotifications } from '@/context/Notifications'
import { sepolia } from 'viem/chains'
import React, { useEffect, useRef } from 'react'

export function NetworkGuard({ children }: { children: React.ReactNode }) {
  const { chain } = useAccount()
  const { switchChain, isPending, error } = useSwitchChain()
  const { Add } = useNotifications()
  const notifiedRef = useRef<number | null>(null)

  useEffect(() => {
    if (chain && chain.id !== sepolia.id) {
      if (notifiedRef.current !== chain.id) {
        Add('You are connected to the wrong network. Please switch to Sepolia.', { type: 'warning' })
        notifiedRef.current = chain.id
      }
    } else {
      notifiedRef.current = null // Reset if on correct network
    }
  }, [chain, Add])

  if (chain && chain.id !== sepolia.id) {
    return (
      <div className='alert alert-warning flex flex-col gap-2 items-start'>
        <span>Contract is not deployed on the current network. Please switch to Sepolia.</span>
        <button
          className='btn btn-sm btn-primary'
          disabled={isPending}
          onClick={() => switchChain({ chainId: sepolia.id })}>
          {isPending ? 'Switching...' : 'Switch to Sepolia'}
        </button>
        {error && <span className='text-error text-xs'>{error.message}</span>}
      </div>
    )
  }

  return <>{children}</>
}
