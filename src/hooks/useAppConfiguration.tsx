import { SERVER_NOT_RESPONSE } from '@/helpers/constants'
import { catchError, request_api } from '@/helpers/request'
import React, { useEffect, useState } from 'react'
import { AdminConfigsType } from '@/helpers/type.models'

export default function useAppConfiguration() {

    const [loader, setLoader] = useState(false)
    
    const [config, setConfig] = useState<AdminConfigsType | null>(null)

    const getConfig = async () => {

        setLoader(true)

        const response = await request_api(`/payment-configuration`, 'GET', null, {})

        // console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                setConfig(response.data.config)
            } else {
            }
        } else {
            catchError(response, ()=>setLoader(false))
        }

        setLoader(false)
    }

    useEffect(() => {
        getConfig()
    }, [])

    const DATA: {
        loader: boolean,
        config: AdminConfigsType | null,
        getConfig: ()=>void
    } = {
        loader,
        config,
        getConfig
    }

    return { ...DATA }
}

