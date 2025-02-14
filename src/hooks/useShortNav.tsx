import { ShortNavContext } from '@/providers/ShortNavContextProvider'
import React, { useContext } from 'react'

export default function useShortNav() {

    // @ts-ignore
    const { short, updateShort } = useContext(ShortNavContext)

    const DATA : {
        short: boolean,
        updateShort: (a: boolean) => void,
    } = {
        short,
        updateShort,
    }

    return { ...DATA }
}
