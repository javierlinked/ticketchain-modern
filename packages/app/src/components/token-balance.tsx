'use client'
import { ETHBalance } from './eth-balance'
import { ERC20Balance } from './erc20-balance'

interface TokenBalanceProps {
  readonly address: `0x${string}`
  readonly tokenAddress?: `0x${string}`
  readonly className?: string
  readonly toFixed?: number
  readonly onBalanceChange?: ({ balance, formattedBalance }: { balance: bigint; formattedBalance?: string }) => void
}

/**
 * TokenBalance is a facade that renders either an ETH or ERC20 balance based on the tokenAddress prop
 */
export const TokenBalance = ({ address, tokenAddress, toFixed, onBalanceChange, className }: TokenBalanceProps) => {
  // Render the appropriate balance component based on whether tokenAddress is provided
  if (tokenAddress) {
    return (
      <ERC20Balance
        address={address}
        tokenAddress={tokenAddress}
        toFixed={toFixed}
        onBalanceChange={onBalanceChange}
        className={className}
      />
    )
  }

  return <ETHBalance address={address} toFixed={toFixed} onBalanceChange={onBalanceChange} className={className} />
}
