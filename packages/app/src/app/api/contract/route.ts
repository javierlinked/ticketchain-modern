import { NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'
import { ticketContractAbi } from '@/abis'

// Create a public client
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const method = searchParams.get('method')
  const address = searchParams.get('address') as `0x${string}`
  const param = searchParams.get('param')
  const param1 = searchParams.get('param1')
  const param2 = searchParams.get('param2')

  if (!method || !address) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    let result

    // Handle different contract methods
    switch (method) {
      case 'tokenIds':
        result = await publicClient.readContract({
          address,
          abi: ticketContractAbi,
          functionName: 'tokenIds',
          args: [BigInt(param || '0')],
        })
        break

      case 'tickets':
        result = await publicClient.readContract({
          address,
          abi: ticketContractAbi,
          functionName: 'tickets',
          args: [BigInt(param || '0')],
        })
        break

      case 'totalSupply':
        result = await publicClient.readContract({
          address,
          abi: ticketContractAbi,
          functionName: 'totalSupply',
          args: [BigInt(param || '0')],
        })
        break

      case 'balanceOf':
        if (!param1 || !param2) {
          return NextResponse.json({ error: 'Missing parameters for balanceOf' }, { status: 400 })
        }
        result = await publicClient.readContract({
          address,
          abi: ticketContractAbi,
          functionName: 'balanceOf',
          args: [param1 as `0x${string}`, BigInt(param2 || '0')],
        })
        break

      default:
        return NextResponse.json({ error: 'Unsupported method' }, { status: 400 })
    }

    return NextResponse.json({ result })
  } catch (error) {
    console.error('Contract read error:', error)
    return NextResponse.json({ error: 'Failed to read contract' }, { status: 500 })
  }
}
