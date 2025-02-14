import React, { PropsWithoutRef, useContext, useEffect, useState } from 'react'
import Head from 'next/head';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Separator } from '@/components/ui/separator';
import * as Icon from 'lucide-react'
import Pagination from '@/components/pagination';
import NotificationItem, { NotifyType } from '@/components/notification.item';
import { Button } from '@/components/ui/button';
import Select2 from '@/components/select2';
import NavThumb from '@/components/navThumb';
import { NotificationsContext } from '@/providers/NotificationsContextProvider';
import { format } from 'date-fns';
import useUser from '@/hooks/useUser';
import { API_URI, catchError, request_api } from '@/helpers/request';
import { LIMITS } from '@/helpers/constants';
import Helper from '@/components/Helper';

export default function UnreadNotifications() {

    const { token } = useUser();

    // @ts-ignore
    const { unreadTotal, updateUnreadTotal } = useContext(NotificationsContext)

    const [notifications, setNotifications] = useState<NotifyType[]>([]);

    const [checkeds, setCheckeds] = useState<string[]>([]);

    const [loading, setLoading] = useState(true)

    const [loader2, setLoader2] = useState(false)

    // For pagination
    const [loader, setLoader] = useState(false)
    const [total, setTotal] = useState(0)
    const [current_page, setCurrentPage] = useState<string|null>(null)
    const [next_page_url, setNextPageUrl] = useState<string|null>(null)
    const [prev_page_url, setPrevPageUrl] = useState<string|null>(null)
    const [itemsFrom, setItemsFrom] = useState(0)
    const [itemsTo, setItemsTo] = useState(0)
    const [limit, setLimit] = useState<string|number|null>(10)

    const updateCheckeds = (id: string, checked: boolean) => {
        if (!checked) {
            const cks = checkeds.filter(e => e != id)
            setCheckeds([...cks])
        } else if (!checkeds.includes(id)) {
            checkeds.push(id)
            setCheckeds([...checkeds])
        }
    }

    const getNotifications = async (a:string|undefined) => {

        let api = !a ?
                        '/notifications/unread' :
                            a=='prev' ?
                                (prev_page_url ? 
                                    prev_page_url.replace(API_URI, '') : '/notifications/unread'
                                ) :
                                a=='next' ?
                                    (next_page_url ? 
                                        next_page_url.replace(API_URI, '') : '/notifications/unread'
                                    ) : 
                                    a=='current_page' ?
                                        `/notifications/unread?page=${current_page}` : '/notifications/unread'
        api += api.includes('?')?`&limit=${limit}`:`?limit=${limit}`
        // api = `${api}?limit=${limit}`

        console.log({ api });
                    
        const response = await request_api(api, 'GET', null, { Authorization: `Bearer ${token}` })

        console.log({ response });

        if(response.hasOwnProperty('success')) {
            if(response?.success) {
                const { notifications, total, current_page, next_page_url, prev_page_url, from, to } = response.data

                setNotifications([...notifications])
                setTotal(total)
                setCurrentPage(current_page)
                setNextPageUrl(next_page_url)
                setPrevPageUrl(prev_page_url)
                setItemsFrom(from)
                setItemsTo(to)
            } else {
                if(response?.errors) {
        
                } else {
        
                }
            }
        } else {
            catchError(response, ()=>{
                setLoading(false)
                setLoader(false)
            })
        }

        setLoading(false)
        setLoader(false)
    }

    const getPreviousNotification = () => {
        setLoader(true)
        getNotifications('prev')
    }
    
    const getNextNotification = () => {
        setLoader(true)
        getNotifications('next')
    }

    const onHandleMarkAsRead = async () => {
        setLoader2(true)

        const response = await request_api('/notifications/markasread', 'PUT', {checkeds}, { Authorization: `Bearer ${token}` })

        console.log({ response });

        if(response.hasOwnProperty('success')) {
            if(response?.success) {
                const { notifications, total, current_page, next_page_url, prev_page_url, from, to } = response.data
                // Mettre à jour le nombre de notifications non lues
                updateUnreadTotal(unreadTotal-checkeds.length)
                await getNotifications('current_page')
                setCheckeds([])
            } else {
                if(response?.errors) {
        
                } else {
        
                }
            }
        } else {
            catchError(response, ()=>setLoader2(false))
        }

        setLoader2(false)
    }

    useEffect(() => {
        setCheckeds([])
        getNotifications(undefined)
    }, [limit])

    useEffect(()=>{
        getNotifications('current_page')
    },[unreadTotal])

    return (
        <>
            <Head>
                <title>Unread Notifications</title>
            </Head>

            <div>

                <NavThumb 
                    data={[
                        {
                            trigger: 'Tableau de bord',
                            link: '/dashboard'
                        },
                        {
                            trigger: 'Notifications non lues',
                            link: '#',
                            disabled: true
                        }
                    ]}
                />

                <div className="grid gap-y-5">

                    <Card2 title={`Aujourd'hui - ${format(new Date(), 'dd/MM/yyyy')}`} items={[...notifications]} loading={loading} checkeds={checkeds} updateCheckeds={updateCheckeds} showDate limit={limit} setLimit={setLimit} onHandleMarkAsRead={onHandleMarkAsRead} loader2={loader2} />

                    <Pagination totalItems={total} nbItems={itemsTo} prev_page_url={prev_page_url} next_page_url={next_page_url} previousAction={getPreviousNotification} nextAction={getNextNotification} loader={loader} useIcon />

                </div>

                {checkeds.length > 0 && (
                    <div className="">
                        <Button onClick={onHandleMarkAsRead}>
                            {loader2 ? (
                                <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Icon.Check className="mr-2 h-4 w-4" /> 
                            )}
                            Marquer comme lu
                        </Button>
                    </div>
                )}
            </div>
        </>
    )
}

type Card2Props = PropsWithoutRef<{
    title: string,
    items: NotifyType[],
    loading: boolean,
    checkeds: string[],
    showDate?: boolean
    updateCheckeds: (a: string, b: boolean) => void,
    limit: string|number|null,
    setLimit: (a:string|number|null)=>void,
    loader2: boolean,
    onHandleMarkAsRead: ()=>void
}>
const Card2 = ({
    title,
    items,
    loading,
    checkeds,
    updateCheckeds,
    showDate,
    limit,
    setLimit,
    loader2,
    onHandleMarkAsRead
}: Card2Props) => {

    const [readed, setReaded] = useState(false)
    const [unreaded, setUnreaded] = useState(false)
    const [notifs, setNotifs] = useState<NotifyType[]>([...items])

    const onFilterReaded = () => {
        const data = items.filter(e => e.read_at!==null)
        setNotifs([...data])
    }
    const onFilterUnreaded = () => {
        const data = items.filter(e => e.read_at==null)
        setNotifs([...data])
    }

    useEffect(()=>{
        if(readed) {
            onFilterReaded()
        } else if(unreaded) {
            onFilterUnreaded()
        } else {
            setNotifs([...items])
        }
    }, [items, readed, unreaded])

    return (
        <Card className="w-full">
            <CardHeader className='p-3'>
                <CardTitle className='text-base'>
                    {/* {title} */}
                    <div className="flex flex-wrap justify-between gap-y-5 gap-x-10">
                        {/* <label htmlFor="items_readed" className="space-x-2 flex items-center">
                            <Checkbox
                                id={`items_readed`}
                                onCheckedChange={(checked) => {
                                    if(checked) {
                                        setUnreaded(false)
                                        setReaded(true)
                                    } else {
                                        setReaded(false)
                                    }
                                }}
                                checked={readed}
                            />
                            <span>Tout sélectionné</span>
                        </label> */}

                        <div className="flex flex-wrap justify-between gap-y-5 gap-x-5">
                        <Select2 
                            data={[...LIMITS]} 
                            defaultValue={limit}
                            placeholder={'Select ...'} 
                            label={'Limite'} 
                            onChange={(a)=>{
                                setLimit(a)
                            }} 
                        />

                        {checkeds.length > 0 && (
                            <div className="">
                                <Button onClick={onHandleMarkAsRead}>
                                    {loader2 ? (
                                        <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Icon.Check className="mr-2 h-4 w-4" /> 
                                    )}
                                    Marquer comme lu
                                </Button>
                            </div>
                        )}
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className='p-3 break-all'>
                <Table className=''>
                    <TableBody className=''>
                        {loading ? (
                            <TableRow className='border-0 text-xs'>
                                <TableCell className="pl-0">
                                    <Icon.Loader2 className="h-4 w-4 animate-spin mx-auto" />
                                </TableCell>
                            </TableRow>
                        ) : (
                            notifs.length > 0 ? (
                                notifs.map((e, i) => (
                                    <NotificationItem key={i.toString()} item={e} checkeds={checkeds} updateCheckeds={updateCheckeds} showDate={showDate} />
                                ))
                            ) : (
                                <TableRow className='border-0 text-xs'>
                                    <TableCell className="m-0 p-0">
                                        <Helper content="Aucune donnée disponible." />
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex justify-between p-3 p-0">
                {/* Footer */}
            </CardFooter>
        </Card>
    )
}
