import { useBalance } from 'wagmi'
import { formatBalance } from '@/utils/formatBalance'
import { useState, useEffect } from 'react'

interface WalletInfoProps {
  address: `0x${string}` | undefined
  isRefreshing?: boolean
  onRefresh?: () => void
  showFullAddress?: boolean
}

export const WalletInfo = ({ address, isRefreshing = false, onRefresh, showFullAddress = false }: WalletInfoProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const [isBalanceLoading, setIsBalanceLoading] = useState(true)

  const {
    data: ethBalance,
    isError: isBalanceError,
    isLoading: wagmiBalanceLoading,
    refetch: refetchBalance,
  } = useBalance({
    address,
  })

  // Update loading state based on wagmi loading state
  useEffect(() => {
    if (!wagmiBalanceLoading) {
      setIsBalanceLoading(false)
    }
  }, [wagmiBalanceLoading])

  // Reset copy status after 2 seconds
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isCopied) {
      timeout = setTimeout(() => setIsCopied(false), 2000)
    }
    return () => clearTimeout(timeout)
  }, [isCopied])

  // Function to copy address to clipboard
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setIsCopied(true)
    }
  }

  // Format address for display
  const formatAddress = (addr: string) => {
    if (showFullAddress) return addr
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  if (!address) return null

  return (
    <div className='bg-white text-black p-4 rounded-md mb-6 shadow-sm'>
      <div className='flex justify-between items-center'>
        <div>
          <div className='flex items-center gap-2'>
            <p className='text-sm font-medium'>Account: {formatAddress(address)}</p>
            <button
              onClick={copyAddress}
              className='text-xs bg-gray-100 hover:bg-gray-200 rounded-md px-2 py-1 transition-colors'
              title='Copy address'>
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className='mt-1'>
            {isBalanceLoading || wagmiBalanceLoading ? (
              <div className='flex items-center gap-2'>
                <p className='text-sm'>ETH Balance: </p>
                <span className='loading loading-spinner loading-xs'></span>
              </div>
            ) : isBalanceError ? (
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-red-500'>Unable to load balance. Please check your network connection.</p>
                <button
                  onClick={() => {
                    setIsBalanceLoading(true)
                    refetchBalance().finally(() => setIsBalanceLoading(false))
                  }}
                  className='text-sm text-blue-500 hover:underline flex items-center gap-1'
                  disabled={isBalanceLoading}>
                  {isBalanceLoading ? (
                    <>
                      <span className='loading loading-spinner loading-xs'></span>
                      Retrying...
                    </>
                  ) : (
                    'Retry'
                  )}
                </button>
              </div>
            ) : (
              <p className='text-sm'>ETH Balance: {ethBalance ? formatBalance(ethBalance.value) : '0'}</p>
            )}
          </div>
        </div>

        {onRefresh && (
          <button
            onClick={() => {
              onRefresh()
              refetchBalance()
            }}
            className='btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none'
            disabled={isRefreshing}>
            {isRefreshing ? <span className='loading loading-spinner loading-sm'></span> : 'Refresh'}
          </button>
        )}
      </div>
    </div>
  )
}
