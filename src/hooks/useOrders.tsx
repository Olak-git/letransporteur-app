import { request_api } from '@/helpers/request'
import React, { useContext, useState } from 'react'
import useUser from './useUser'
import { OrdersContext } from '@/providers/OrdersContextProvider'

export default function useOrders() {

    const { token } = useUser()

    // @ts-ignore
    const { count, updateCount, increment, toggleIncrement } = useContext(OrdersContext)

    const getCountOrdersInPending = async () => {

        const response = await request_api('/seller/orders/pending', 'GET', null, { Authorization: `Bearer ${token}` })

        if (response?.success) {
            updateCount(response?.data?.count||0)
        }
    }

    const DATA : {
        getCountOrdersInPending: ()=>void,
        count: number,
        updateCount: (a:number)=>void,
        increment: number,
        toggleIncrement: ()=>void
    } = {
        getCountOrdersInPending,
        count,
        updateCount,
        increment,
        toggleIncrement
    }
    
    return { ...DATA }
}
