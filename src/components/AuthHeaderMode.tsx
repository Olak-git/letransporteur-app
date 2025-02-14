import React, { useEffect, useContext } from 'react'
import { Button } from './ui/button'
import * as Icon from 'lucide-react'
import Switche from './switche'
import useMode from '@/hooks/useMode'
// import { ModeContext } from '@/pages/providers/ModeContextProvider'

export default function AuthHeaderMode() {
    
    const { updateMode, mode } = useMode()

    return (
        <>
            <Switche containerStyles='ml-3 mt-3' />
        </>
  )
}
