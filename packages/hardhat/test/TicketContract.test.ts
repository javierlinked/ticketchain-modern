import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'

describe('TicketContract', function () {
  async function deployMessageFixture() {
    const ethers = hre.ethers
    const [contractOwner, alice, bob] = await ethers.getSigners()

    const TicketContract = await ethers.getContractFactory('TicketContract')
    const ticketContract = await TicketContract.deploy()

    return { ticketContract, contractOwner, alice, bob }
  }

  describe('Deployment', function () {
    it('Should have correct default owner', async function () {
      const { ticketContract, contractOwner } = await loadFixture(deployMessageFixture)

      const owner = await ticketContract.owner()
      expect(owner).to.equal(contractOwner.address)
    })
  })
})
