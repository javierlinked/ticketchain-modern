# TicketChain User Interface (Non-Owner) — Implementation Tasks

- [x] Display connected wallet address and ETH balance at the top of the page
- [x] Create an "Available Tickets" grid with columns: Id, Name, Price (ETH), maxSellPerPerson, infoUrl (as "More info" link), input[number] for amount, and [Buy] button
- [x] Fetch and display all tickets stored in the contract in the available tickets grid
- [x] Implement the "More info" link to open the infoUrl in a new tab
- [x] Allow user to specify amount to buy (default 1, up to maxSellPerPerson)
- [x] Implement the [Buy] button to purchase the specified amount of tickets using contract call (wagmi, wallet hooks)
- [x] Show toast notifications for transaction results (success/error), as in create-ticket
- [x] Create an "Owned Tickets" grid with columns: Name, Amount, [Burn] button (disabled), [Transfer] button (disabled)
- [x] Fetch and display all tickets owned by the connected address in the owned tickets grid
- [x] Ensure "Burn" and "Transfer" buttons are present but disabled (placeholders)
- [x] Use hooks for ticket logic in `/src/hooks/tickets/` as needed
- [x] Place new or updated components in `/src/components/tickets/`
- [x] Follow encapsulation and usage patterns from `/app/examples`
- [x] No additional validation, filtering, or accessibility changes at this stage
- [x] No changes to wallet provider logic or responsiveness
