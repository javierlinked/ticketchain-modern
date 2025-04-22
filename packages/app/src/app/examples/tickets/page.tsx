'use client'
import React from 'react';
import CreateTicket from '@/components/CreateTicket';
import TicketList from '@/components/TicketList';
import { useToken } from '@/context/TokenContext'
import { useNotifications } from '@/context/Notifications';
// import { useWaitForTransactionReceipt } from 'wagmi';

export default function Tickets() {
    const { Add } = useNotifications()

    // const {
    //     isLoading,
    //     error: txError,
    //     isSuccess: txSuccess,
    // } = useWaitForTransactionReceipt({
    //     hash: data,
    // })
    const { isContractOwner, isLoading } = useToken()

    if (isLoading) return <div>Loading...</div>

    return isContractOwner ? <CreateTicket /> : <TicketList />
}