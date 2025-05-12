import { createPublicClient, http, PublicClient, Abi } from 'viem'
import { sepolia } from 'viem/chains'

export const createClient = (): PublicClient => {
  return createPublicClient({
    chain: sepolia,
    transport: http(),
  })
}

export async function readContract<T>({
  address,
  abi,
  functionName,
  args = [],
}: {
  address: `0x${string}`
  abi: Abi
  functionName: string
  args?: unknown[]
}): Promise<T> {
  const client = createPublicClient({
    chain: sepolia,
    transport: http(),
  })

  try {
    return (await client.readContract({
      address,
      abi,
      functionName,
      args,
    })) as T
  } catch (error) {
    return readContract({
      address,
      abi,
      functionName,
      args,
    })
  }
}
