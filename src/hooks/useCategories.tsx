import { StoreType } from '@/helpers/type.models';
import React, { useState } from 'react'
import useUser from './useUser';
import { catchError, request_api } from '@/helpers/request';

export default function useCategories() {

    const { token } = useUser()

    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState<Array<any>>([])

    const getCategories = async () => {

        // setLoading(true)

        const response = await request_api('/categories', 'GET', null, { 'Authorization': `Bearer ${token}` })

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                setCategories(response.data.categories)
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
        categories: Array<any>,
        getCategories: ()=>void
    } = {
        loading,
        categories,
        getCategories
    }

    return { ...DATA }
}
