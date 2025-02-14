import socketServices from "@/helpers/utils/socketServices";
import { PropsWithChildren, createContext, useEffect, useRef, useState } from "react"

export const SocketContext = createContext({socket: null})

/**
 * connectionConfig
 */
const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  transports: ['websocket'],

//optional
  query: {
    source: 'auction:mobile',
    // platform: isIOS() ? IOS : ANDROID,
  },

};

export const SocketProvider = ({children}: PropsWithChildren) => {
  
  const socket = useRef(socketServices)

  useEffect(()=>{
    socket.current.initializeSocket()
    socket.current.on('disconnect', (msg:any) => {
      socket.current = socketServices
    })

    return ()=>{
      if(socket && socket.current) {
        socket?.current?.removeListeners()
        socket?.current?.close()
      }
    }
  }, [])

  return (
    // @ts-ignore
    <SocketContext.Provider value={{ socket: socket.current }}
    >
      { children }
    </SocketContext.Provider>
  )
}