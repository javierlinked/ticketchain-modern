// Import the TicketContract ABI from abis.ts instead of trying to import the JSON directly
import { ticketContractAbi } from '@/abis'

// Contract address will be set in the .env file or environment variables
// For local development, you can set a default here
export const ticketContractAddress = process.env.NEXT_PUBLIC_TICKET_CONTRACT_ADDRESS as `0x${string}`

// Helper to check if an address is the contract owner
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function isContractOwner(contractAddress: `0x${string}`, ownerAddress: `0x${string}`, readContract: any) {
  try {
    const owner = await readContract({
      address: contractAddress,
      abi: ticketContractAbi,
      functionName: 'owner',
    })

    return owner?.toLowerCase() === ownerAddress.toLowerCase()
  } catch (error) {
    console.error('Error checking contract owner:', error)
    return false
  }
}
