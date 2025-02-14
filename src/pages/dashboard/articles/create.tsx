import ArticleForm from '@/components/ArticleForm'
import NavThumb from '@/components/navThumb'
import Head from 'next/head'
import React from 'react'

export default function create() {
    return (
        <>
            <Head>
                <title>LeTransporteur | Create Article</title>
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
                            trigger: 'Articles',
                            link: '/dashboard/articles',
                        },
                        {
                            trigger: 'Créer',
                            link: '#',
                            disabled: true
                        }
                    ]}
                />
                <ArticleForm />
            </div>
        </>
    )
}
