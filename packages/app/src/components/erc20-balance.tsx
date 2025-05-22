'use client'
import { useReadContract } from 'wagmi'
import { useEffect } from 'react'
import { formatBalance } from '@/utils/formatBalance'
import { erc20Abi } from 'viem'

interface ERC20BalanceProps {
  readonly address: `0x${string}`
  readonly tokenAddress: `0x${string}`
  readonly className?: string
  readonly toFixed?: number
  readonly onBalanceChange?: ({ balance, formattedBalance }: { balance: bigint; formattedBalance?: string }) => void
}

export const ERC20Balance = ({ address, tokenAddress, toFixed, onBalanceChange, className }: ERC20BalanceProps) => {
  const tokenBalance = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [address],
  })

  useEffect(() => {
    // pass the value of the balance to the parent component on change
    if (tokenBalance.data && onBalanceChange) {
      onBalanceChange({
        balance: tokenBalance.data,
        formattedBalance: formatBalance(tokenBalance.data, toFixed),
      })
    }
  }, [tokenBalance.data, onBalanceChange, toFixed])

  if (!tokenBalance.data) return null

  return <div className={`stat-value text-lg w-[150px] ${className}`}>{formatBalance(tokenBalance.data, toFixed)}</div>
}
