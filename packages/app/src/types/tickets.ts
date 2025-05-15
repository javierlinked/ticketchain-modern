export interface Ticket {
  id: bigint
  name: string
  price: bigint
  available: bigint
  maxSellPerPerson: bigint
  infoUrl: string
}

export interface OwnedTicket {
  id: bigint
  name: string
  quantity: bigint
}

// Tuple type from contract return
export type TicketDetails = [
  bigint, // id
  string, // name
  bigint, // price
  bigint, // maxSellPerPerson
  string // infoUrl
]

export type TicketContractFunction =
  | 'tickets'
  | 'balanceOf'
  | 'tokenIds'
  | 'tokenIdsLength'
  | 'owner'
  | 'buy'
  | 'safeTransferFrom'
