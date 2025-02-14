import { StoreType } from '@/helpers/type.models';
import React, { useState } from 'react'
import useUser from './useUser';
import { catchError, request_api } from '@/helpers/request';

export default function useStore() {

    const { token } = useUser()

    const [loading, setLoading] = useState(false)
    const [store, setStore] = useState<StoreType | null>(null)

    const getStore = async () => {

        setLoading(true)

        const response = await request_api('/seller/store/read', 'GET', null, { 'Authorization': `Bearer ${token}` })

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                setStore(response.data.store)
            } else {
                if (response?.errors) {
                    const { errors: _errors } = response
                } else {

                }
            }
        } else {
            catchError(response, () => setLoading(false))
        }

        setLoading(false)
    }

    const DATA: {
        loading: boolean,
        store: StoreType | null,
        getStore: ()=>void
    } = {
        loading,
        store,
        getStore
    }

    return { ...DATA }
}
