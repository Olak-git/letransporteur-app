import { PropsWithChildren, createContext, useEffect, useState } from 'react'

export const SheetContext = createContext(false)
const SheetContextProvider = ({ children }: PropsWithChildren) => {
    const [openSheet, setOpenSheet] = useState(false)
    useEffect(() => {
        // console.log({ openSheet });
    }, [openSheet])
    return (
        // @ts-ignore
        <SheetContext.Provider value={{
            updateOpenSheet: (open: boolean) => setOpenSheet(open),
            openSheet
        }}>
            {children}
        </SheetContext.Provider>
    )
}

export default SheetContextProvider;