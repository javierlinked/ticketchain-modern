import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const TicketContractModule = buildModule('TicketContractModule', (m) => {
  const ticketContract = m.contract('TicketContract')

  return { ticketContract }
})

export default TicketContractModule
