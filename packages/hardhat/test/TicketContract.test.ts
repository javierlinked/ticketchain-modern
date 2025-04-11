// packages/hardhat/test/TicketContract.test.ts
import { expect } from 'chai'
import { ethers } from 'hardhat'
import type { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import type { TicketContract } from '../typechain-types'

describe('TicketContract', function () {
  let contract: TicketContract
  let owner: SignerWithAddress
  let buyer: SignerWithAddress

  before(async () => {
    ;[owner, buyer] = await ethers.getSigners()
    const Contract = await ethers.getContractFactory('TicketContract')
    contract = (await Contract.deploy()) as TicketContract
    await contract.waitForDeployment()
  })

  it('Should create new ticket', async () => {
    await contract.connect(owner).create('Test Event', ethers.parseEther('0.1'), 100, 5, 'http://example.com', '0x')

    expect(await contract.tokenIdsLength()).to.equal(1)
  })

  it('Should fail when non-owner creates ticket', async () => {
    await expect(
      contract.connect(buyer).create('Unauthorized Event', ethers.parseEther('0.1'), 100, 5, 'http://example.com', '0x')
    ).to.be.revertedWith('Ownable: caller is not the owner')
  })

  it('Should handle ticket purchases correctly', async () => {
    const ticketId = 1
    const purchaseAmount = 2
    const totalPrice = ethers.parseEther('0.2')

    // Create ticket first
    await contract.connect(owner).create('Concert', ethers.parseEther('0.1'), 100, 5, 'http://concert.com', '0x')

    // Test purchase
    await expect(
      contract.connect(buyer).buy(ticketId, purchaseAmount, '0x', { value: totalPrice })
    ).to.changeTokenBalance(contract, buyer.address, purchaseAmount)
  })
})
