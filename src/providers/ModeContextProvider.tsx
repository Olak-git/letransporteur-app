import { PropsWithChildren, createContext, useEffect, useState } from 'react'

export const defaultModeValue = 'light'
export const ModeContext = createContext(defaultModeValue)
const ModeContextProvider = ({ children }: PropsWithChildren) => {
    const [mode, setMode] = useState(defaultModeValue)
    return (
        // @ts-ignore
        <ModeContext.Provider value={{
            updateMode: (newMode: string) => setMode(newMode),
            mode
        }}>
            {children}
        </ModeContext.Provider>
    )
}

export default ModeContextProvider