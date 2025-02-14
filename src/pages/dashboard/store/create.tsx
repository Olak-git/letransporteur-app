import StoreForm from '@/components/StoreForm'
import NavThumb from '@/components/navThumb'
import Head from 'next/head'
import React from 'react'

export default function create() {
    return (
        <>
            <Head>
                <title>LeTransporteur | Create Store</title>
            </Head>
            <div>
                <NavThumb
                    data={[
                        {
                            trigger: 'Tableau de bord',
                            link: '/dashboard',
                        },
                        {
                            trigger: 'Boutique',
                            link: '/dashboard/store',
                        },
                        {
                            trigger: 'Créer',
                            link: '#',
                            disabled: true
                        }
                    ]}
                />
                <StoreForm />
            </div>
        </>
    )
}
