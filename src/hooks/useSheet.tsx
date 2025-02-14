import { SheetContext } from '@/providers/SheetContextProvider'
import React, { useContext } from 'react'

export default function useSheet() {

    // @ts-ignore
    const { openSheet, updateOpenSheet } = useContext(SheetContext)

    const DATA : {
        openSheet: boolean,
        updateOpenSheet: (a: boolean) => void,
    } = {
        openSheet,
        updateOpenSheet,
    }

    return { ...DATA }
}
