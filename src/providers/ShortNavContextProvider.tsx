import { PropsWithChildren, createContext, useEffect, useState } from 'react'

export const ShortNavContext = createContext(false)
const ShortNavContextProvider = ({ children }: PropsWithChildren) => {
    const [short, setShort] = useState<boolean>(false)
    return (
        // @ts-ignore
        <ShortNavContext.Provider value={{
            updateShort: (newShortValue: boolean) => setShort(newShortValue),
            short
        }}>
            {children}
        </ShortNavContext.Provider>
    )
}

export default ShortNavContextProvider;