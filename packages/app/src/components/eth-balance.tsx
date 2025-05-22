'use client'
import { useBalance } from 'wagmi'
import { useEffect } from 'react'
import { formatBalance } from '@/utils/formatBalance'

interface ETHBalanceProps {
  readonly address: `0x${string}`
  readonly className?: string
  readonly toFixed?: number
  readonly onBalanceChange?: ({ balance, formattedBalance }: { balance: bigint; formattedBalance?: string }) => void
}

export const ETHBalance = ({ address, toFixed, onBalanceChange, className }: ETHBalanceProps) => {
  const ETHBalance = useBalance({ address })

  useEffect(() => {
    // pass the value of the balance to the parent component on change
    if (ETHBalance.data && onBalanceChange) {
      onBalanceChange({
        balance: ETHBalance.data.value,
        formattedBalance: formatBalance(ETHBalance.data.value, toFixed),
      })
    }
  }, [ETHBalance.data, onBalanceChange, toFixed])

  if (!ETHBalance.data) return null

  return (
    <div className={`stat-value text-lg w-[150px] ${className}`}>
      {formatBalance(ETHBalance.data?.value ?? BigInt(0), toFixed)}
    </div>
  )
}
