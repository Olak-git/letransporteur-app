import StoreForm from '@/components/StoreForm'
import NavThumb from '@/components/navThumb'
import Head from 'next/head'
import React from 'react'

export default function edit({
    id
}: {
    id: number
}) {
    
    return (
        <>
            <Head>
                <title>LeTransporteur | Edit Store</title>
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
                            trigger: 'Edité',
                            link: '#',
                            disabled: true
                        }
                    ]}
                />
                <StoreForm id={id} />
            </div>
        </>
    )
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}

export async function getStaticProps(context: any) {
    const { id } = context.params
    return {
        props: {
            id
        }
    }
}

