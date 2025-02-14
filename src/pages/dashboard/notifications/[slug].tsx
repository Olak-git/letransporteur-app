import Head from 'next/head'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { capitalizeFirstLetter, format_address, getDateToString, getMonthToString } from '@/helpers/funcs'
import AlertLog, { DialogFetchCatch } from '@/components/alert'
import { format, getDate, getDay, getMonth, getYear } from 'date-fns'
import { NotifyType } from '@/components/notification.item'
import { Skeleton } from '@/components/ui/skeleton'
import NavThumb from '@/components/navThumb'
import useUser from '@/hooks/useUser'
import { catchError, request_api } from '@/helpers/request'
import { useDialog } from '@/hooks/useDialog'

type DetailsProps = PropsWithChildren<{
    slug: string
}>
export default function Details({ slug }: DetailsProps) {
    const { user, token } = useUser()
    const { open, openDialog, closeDialog, dialogTitle, editDialogTitle, dialogDescription, editDialogDescription: editDialogDescription, alertType, editAlertType, openCatch, setOpenCatch } = useDialog()

    const [loading, setLoading] = useState(true)
    const [notification, setNotification] = useState<NotifyType|null>(null)

    const getNotification = async () => {

        const response = await request_api(`/notifications/${slug}/read`, 'GET', null, { Authorization: `Bearer ${token}` })

        console.log({ response });

        if(response.hasOwnProperty('success')) {
            if(response?.success) {
                setNotification({...response?.data.notification})
            } else {
                if(response?.errors) {
            
                } else {
            
                }
            }
        } else {
            catchError(response, ()=>setLoading(false))
            // setOpenCatch(true)
        }
    
        setLoading(false)
    }

    useEffect(() => {
        if(slug) {
          getNotification()
        }
    }, [slug])

    return (
        <>
            <Head>
                <title>LeTransporteur | Notifications</title>
            </Head>

            <DialogFetchCatch visible={openCatch} closeDialog={()=>setOpenCatch(false)} />

            <AlertLog visible={open} close={closeDialog} title={dialogTitle} description={dialogDescription} type={alertType} />
            
            <div>
                <NavThumb 
                    data={[
                        {
                            trigger: 'Tableau de bord',
                            link: '/dashboard'
                        },
                        {
                            trigger: 'Notifications',
                            link: '/dashboard/notifications',
                        },
                        {
                            trigger: '',
                            link: '#',
                            disabled: true
                        }
                    ]}
                />
                {loading ? (
                    <div className="space-y-2">
                        <Skeleton className='h-5 w-3/4' />
                        <Skeleton className='h-3' />
                        <Skeleton className='h-3' />
                        <Skeleton className='h-3 w-1/2' />
                    </div>
                ) : (
                    <div className="">
                        <div className="flex flex-wrap justify-between items-end mb-4">
                            <div className="text-sm text-muted-foreground">
                                <span className="">
                                    {
                                        // @ts-ignore
                                        capitalizeFirstLetter(getDateToString(getDay(new Date(notification?.created_at)))) + ' ' + getDate(new Date(notification?.created_at)) + ' ' + capitalizeFirstLetter(getMonthToString(getMonth(new Date(notification?.created_at)))) + ' ' + getYear(new Date(notification?.created_at)) + ' à ' + format(new Date(notification?.created_at||null), 'H:ii')
                                    }
                                </span>
                                {/* {
                                    // @ts-ignore
                                    format(new Date(notification?.created_at), 'dd-mm-Y H:ii')
                                } */}
                            </div>
                        </div>
                        <div className='bg-[#f2f2f2] dark:bg-gray-950 border border-[#f4f4f4] p-3 rounded-lg'>
                            {notification?.data.subject && (
                                <div className="border-b border-[#e4e4e4] mb-3 pb-2">  
                                    <h3 className='line-clamp-1 text-base font-semibold'>[{notification?.data.subject}]</h3>
                                </div>
                            )}
                            <p className="font-extralight">{ notification?.data.message }</p>
                        </div>
                    </div>
                )}
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
    const { slug } = context.params
    return {
        props: {
            slug
        }
    }
}
