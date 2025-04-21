'use client'
import React from 'react'
import { useToken } from '@/context/TokenContext'
import CreateTicket from '../app/examples/create-ticket/page'
import BuyTicket from '../app/examples/buy-ticket/page'

export default function TicketsPage() {
  const { isContractOwner, isLoading } = useToken()

  if (isLoading) return <div>Loading...</div>

  return isContractOwner ? <CreateTicket /> : <BuyTicket />
}
