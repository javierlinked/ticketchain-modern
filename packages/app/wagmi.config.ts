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
          11155111: '0x833aD49Ac85E3A6Dae64F21fa088401B6d5E07d6',
        },
      },
    }),
  ],
})
