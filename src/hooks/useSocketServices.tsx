import React, { useContext, useEffect, useLayoutEffect } from 'react'
import socketServices, { WSService } from '@/helpers/utils/socketServices'
import { SocketContext } from '@/providers/SocketProvider'

export default function useSocketServices() {

    const { socket: socketServices } = useContext(SocketContext)

    // useLayoutEffect(()=>{
    //     socketServices.initializeSocket()
    //     socketServices.on('disconnect', () => {
    //         socketServices.initializeSocket()
    //     })
    // }, [])

    const data: {
        socketServices: WSService
    } = {
        // @ts-ignore
        socketServices
    }
    return { ...data }
}