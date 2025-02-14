import { NotifyType } from '@/components/notification.item'
import { request_api } from '@/helpers/request'
import useUser from '@/hooks/useUser'
import { PropsWithChildren, createContext, useEffect, useState } from 'react'

export const OrdersContext = createContext(0)
const OrdersContextProvider = ({ children }: PropsWithChildren) => {

    const [count, setCount] = useState(0)
    const [increment, setIncrement] = useState(0)

    const updateCount = (n:number) => {
        setCount(n)
    }

    const toggleIncrement = () => {
        setIncrement(increment+1)
    }

    return (
        <OrdersContext.Provider
            // @ts-ignore
            value={{
                count,
                updateCount,
                increment,
                toggleIncrement
            }}
        >
            {children}
        </OrdersContext.Provider>
    )
}

export default OrdersContextProvider;