import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useUser from './useUser'
import { request_api } from '@/helpers/request'
import NotificationService from '@/components/NotificationService'
import { SERVER_NOT_RESPONSE } from '@/helpers/constants'

export default function useDisconnect() {

    const router = useRouter()
    
    const { updateUser, updateToken, token } = useUser()

    const [loading, setLoading] = useState(false)

    const onLogOut = async () => {

        setLoading(true)

        const response = await request_api('/logout', 'PUT', null, { Authorization: `Bearer ${token}` })

        if (response?.success) {
            updateUser(undefined)
            updateToken(undefined)
            NotificationService.alert({
                type: 'info',
                title: 'Déconnexion',
                message: 'Utilisateur déconnecté. Redirection en cours...'
            })
            router.push('/')
        } else {
            updateUser(undefined)
            updateToken(undefined)
            if (response?.message && response.message == "Unauthenticated.") {

            } else {
                NotificationService.alert({
                    type: 'error',
                    variant: 'ghost',
                    title: 'SERVER RESPONSE',
                    message: SERVER_NOT_RESPONSE
                })
            }
        }

        setLoading(false)
    }

    const DATA : {
        loading: boolean,
        onLogOut: ()=>void
    } = {
        loading,
        onLogOut
    }

    return { ...DATA }
}
