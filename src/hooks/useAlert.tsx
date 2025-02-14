import React, { ReactNode, useState } from 'react'

export default function useAlert() {
    const init_alert = {
        type: undefined,
        message: '',
        title: undefined,
        hideCloseButton: false,
        loader: false        
    }
    const [alerts, setAlerts] = useState({
        ...init_alert
    })

    const hydrateAlerts = (type: undefined|'destructive', message: string|ReactNode, title?: string, hideCloseButton?: boolean, loader?: boolean) => {
        setAlerts((prev:any) => ({
            ...prev,
            type,
            message,
            title,
            hideCloseButton,
            loader
        }))
    }

    const setHideCloseButton = (V:boolean) => {
        setAlerts((prev:any) => ({
            ...prev,
            hideCloseButton: V
        }))
    }

    const setLoader = (V:boolean) => {
        setAlerts((prev:any) => ({
            ...prev,
            loader: V
        }))
    }

    const resetAlerts = () => {
        setAlerts((prev:any) => ({
            ...prev,
            ...init_alert
        }))
    }

    const activeLoader = () => {
        setAlerts((prev:any) => ({
            ...prev,
            loader: true
        }))
    }

    const stopLoader = () => {
        setAlerts((prev:any) => ({
            ...prev,
            loader: false
        }))
    }
    
    return {
        alerts,
        hydrateAlerts,
        resetAlerts,
        setHideCloseButton,
        setLoader
    }
}
