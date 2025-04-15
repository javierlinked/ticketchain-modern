import { defineConfig } from '@wagmi/cli'
import { actions, hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/abis.ts',
  contracts: [],
  plugins: [
    actions(),
    hardhat({
      project: '../hardhat',
      deployments: {
        TicketContract: {
          31337: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        },
      },
    }),
  ],
})
