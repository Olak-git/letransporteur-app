import ArticleForm from '@/components/ArticleForm'
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
                            trigger: 'Edition',
                            link: '#',
                            disabled: true
                        }
                    ]}
                />
                <ArticleForm id={id} />
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
