import { ModeContext } from '@/providers/ModeContextProvider'
import React, { useContext } from 'react'

type ModeType = 'dark'|'light'

export default function useMode() {
    // @ts-ignore
    const { mode, updateMode } = useContext(ModeContext)

    const toggle = () => {
        updateMode(mode=='dark'?'light':'dark')
    }

    const DATA : {
        mode: ModeType,
        updateMode: (a: ModeType) => void,
        toggle: ()=>void
    } = {
        mode,
        updateMode,
        toggle
    }

    return { ...DATA }
}
