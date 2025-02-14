import { request_api, catchError } from '@/helpers/request'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from '@/components/ui/skeleton'
import Helper from '@/components/Helper'
import { FaqType } from '@/helpers/type.models'
import styles2 from '@/styles/Accordion.module.css'
import dynamic from 'next/dynamic';
import useSocketServices from '@/hooks/useSocketServices'
import NavThumb from '@/components/navThumb'

const Layout = dynamic(() => import('react-masonry-list'), {
    ssr: false,
});

export default function Faqs() {

    const { socketServices } = useSocketServices();

    const [faqs, setFaqs] = useState<FaqType[]>([])

    const [loading, setLoading] = useState(true)

    const getFaqs = async () => {

        const response = await request_api('/faqs', 'GET', null)

        console.log({ response })

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                setFaqs(response?.data.faqs)
            } else {
                if (response?.errors) {

                } else {

                }
            }
        } else {
            catchError(response, () => setLoading(false))
        }

        setLoading(false)
    }

    useEffect(() => {
        getFaqs()
    }, [])

    // useEffect(() => {
    //     socketServices.on('receive_new_faq', (data: any) => {
    //         // console.log("DATA received: ", data);
    //         const FAQS = [...faqs] 
    //         FAQS.push(data.faq)
    //         setFaqs([...FAQS])
    //     })
    //     socketServices.on('edit_faq', (data: any) => {
    //         // console.log("DATA received: ", data);
    //         faqs.map((item, i) => {
    //             if (item.id == data.faq.id) {
    //                 faqs[i] = data.faq
    //             }
    //         })
    //         setFaqs([...faqs])
    //     })
    //     socketServices.on('delete_faq', (data: any) => {
    //         // console.log("DATA received: ", data);
    //         const FAQS = faqs.filter(m => m.id!=data.faq_id)
    //         setFaqs([...FAQS])
    //     })
    // }, [faqs])

    return (
        <>
            <Head>
                <title>LeTransporteur | FAQ</title>
            </Head>

            <div>
                <NavThumb
                    data={[
                        {
                            trigger: 'Tableau de bord',
                            link: '/dashboard'
                        },
                        {
                            trigger: 'Faqs',
                            link: '#',
                            disabled: true
                        }
                    ]}
                />

                <div className="">
                    <h1 className="text-center font-bold text-xl mb-4">Foire aux Questions</h1>
                    <div className="px-[10px]">
                        {loading ? (
                            <div className="flex flex-col">
                                <div className="grid gap-y-6 p-4 mx-auto w-full sm:w-3/4">
                                    {Array.from({ length: 6 }).map((e, i) => (
                                        <PreLoader key={i.toString()} />
                                    ))}
                                    <Helper content='Chargement en cours...' containerClass='' />
                                </div>
                            </div>
                        ) : (
                            faqs.length > 0 ? (
                                <div className="flex">
                                    <Accordion type='multiple' className='grid grid-cols-1 mx-auto w-full sm:w-3/4'>
                                        <Layout
                                            minWidth={100}
                                            className=""
                                            colCount={2}
                                            gap={12}
                                            items={faqs.map((e, i) => (
                                                <AccordionItem value={`item-${i}`} key={i.toString()} className={`border-0 ${styles2.accordion_item}`}>
                                                    <AccordionTrigger className='font-thin rounded-lg bg-gray-200 dark:bg-muted px-2 mb-2'>
                                                        {e.asking}
                                                    </AccordionTrigger>
                                                    <AccordionContent className='' style={{}}>
                                                        {e.response}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        ></Layout>
                                    </Accordion>
                                </div>
                            ) : (
                                <p className="">Aucune donnée disponible.</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

const PreLoader = () => {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-full sm:w-1/2 mb-3" />
            <Skeleton className="h-3 w-full rounded-none" />
            <Skeleton className="h-3 w-full rounded-none" />
            <Skeleton className="h-3 w-3/4 rounded-l-none" />
        </div>
    )
}