import { PropsWithChildren, createContext, useEffect, useState } from 'react'
import socketServices from '@/helpers/utils/socketServices'

export const SocketServicesContext = createContext(0)
const SocketServicesContextProvider = ({ children }: PropsWithChildren) => {

    useEffect(()=>{
        socketServices.initializeSocket()
        return ()=>{
            socketServices.disconnect()
        }
    },[])

    return (
        <SocketServicesContext.Provider
            // @ts-ignore
            value={{
                socketServices
            }}
        >
            {children}
        </SocketServicesContext.Provider>
    )
}

export default SocketServicesContextProvider;