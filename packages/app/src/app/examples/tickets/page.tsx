'use client'
import React from 'react';
import CreateTicket from '@/components/CreateTicket';
import BuyTicket from '../../../components/BuyTicket';
import { useToken } from '@/context/TokenContext'

export default function Tickets() {
    const { isContractOwner, isLoading } = useToken()

    if (isLoading) return <div>Loading...</div>
  
    return isContractOwner ? <CreateTicket /> : <BuyTicket />
}