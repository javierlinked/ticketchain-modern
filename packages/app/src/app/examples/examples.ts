import EtherIcon from '@/assets/icons/ethereum.png'
import NotificationIcon from '@/assets/icons/notification.png'
import TokenIcon from '@/assets/icons/token.png'

export const EXAMPLE_ITEMS = [
  {
    title: 'Send Ether',
    description: 'Sending Ether to another address is the most basic, common transaction that you can do.',
    image: EtherIcon.src,
    url: '/examples/send-ether',
  },
  {
    title: 'Send ERC20 Token',
    description:
      'ERC20 introduces a standard interface for fungible tokens. Use this example to send any ERC20 to another address.',
    image: TokenIcon.src,
    url: '/examples/send-token',
  },
  {
    title: 'Create Ticket',
    description: 'Create a new ticket event using the TicketContract.',
    image: TokenIcon.src,
    url: '/examples/create-ticket',
  },
  {
    title: 'Buy Ticket',
    description: 'Purchase tickets from available events on the TicketContract.',
    image: TokenIcon.src,
    url: '/examples/buy-ticket',
  },
  {
    title: 'Notifications',
    description: 'This example is demonstrates how to use the notification system within Nexth.',
    image: NotificationIcon.src,
    url: '/examples/notifications',
  },
]
