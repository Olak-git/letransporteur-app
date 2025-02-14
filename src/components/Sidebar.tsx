import styles from '@/styles/Menu.module.css'
import React, { Fragment, PropsWithChildren, useContext, useEffect, useState } from 'react'
import Link from 'next/link'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Tooltip2 from './tooltip2'
import Icon from './ui/icon'
import useShortNav from '@/hooks/useShortNav'
import useSheet from '@/hooks/useSheet'
import useUser from '@/hooks/useUser'
import useOrders from '@/hooks/useOrders'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'
import { Button } from './ui/button'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Badge } from './ui/badge'

const tags = Array.from({ length: 10 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
type ItemLinkType = {
    link: string,
    icon: any,
    trigger: string,
    tag?: number,
    visible?: boolean
}
interface ItemLinkProps {
    items: Array<ItemLinkType>
}
const ItemLink = ({ items }: ItemLinkProps) => {
    const router = useRouter()

    return (
        <div className='space-y-1'>
            {items.map((a: any, i: number) => a.visible && (
                // className={`flex justify-between items-center text-sm font-light mb-2 p-3 rounded-md hover:bg-slate-100 dark:hover:text-black break-all ${router.pathname == a.link ? styles.active : undefined}`}
                <Link href={a.link} className={`flex justify-between items-center text-sm text-white font-light hover:font-semibold hover:pl-5 px-3 py-2 break-all transition-spacing duration-300 ${router.pathname == a.link ? styles.active : ''}`} key={'link-' + i.toString()}>
                    <span className='flex items-center gap-x-2'>
                        {a.icon}
                        {a.trigger}
                    </span>
                    <span className="flex flex-row items-center gap-x-1">
                        {(a.tag != undefined && a.tag > 0) && (
                            <Badge variant='secondary' className='text-xs underline'>{a.tag?.toString().padStart(2, '0')}</Badge>
                        )}
                        <Icon.ChevronRight size={15} />
                    </span>
                </Link>
            ))}
        </div>
    )
}

type ContentType = {
    label: string,
    link: string,
    tag?: number,
    disabled?: boolean
}
type ItemType = {
    trigger: string,
    icon: any,
    contents: ContentType[],
    tag?: number,
    disabled?: boolean
}
interface AccordionItemLinkProps {
    items: ItemType[]
}
const AccordionItemLink = ({ items }: AccordionItemLinkProps) => {
    const router = useRouter()

    return (
        <div className='space-y-1'>
            {items.map((a, i: Number) => !a.disabled && (
                <AccordionItem key={'accordion-item-' + i.toString()} value={`item-${i}`} className='border-0 space-y-0'>
                    <AccordionTrigger className='relative w-fit break-all text-sm text-white font-light hover:no-underline hover:font-semibold hover:pl-5 px-3 py-2 break-all transition-spacing duration-300'>
                        <span className='flex items-center gap-x-2'>
                            {a.icon}
                            {a.trigger}
                        </span>
                        {(a.tag != undefined && a.tag > 0) && (
                            // <small>{a.tag.toString().padStart(2, '0')}</small>
                            <Badge variant='secondary' className='text-xs'>{a.tag.toString().padStart(2, '0')}</Badge>
                        )}
                    </AccordionTrigger>
                    <AccordionContent className='p-0 pl-3'>
                        {a.contents.map((b, k: number) => (
                            !b.disabled && (
                                <Fragment key={'accordion-content-link-' + k.toString()}>
                                    <Link href={b.link} className={`flex break-all gap-2 items-center text-sm text-white/80 font-light hover:underline px-3 py-2 break-all transition-spacing duration-300 group ${router.pathname == b.link ? styles.active : ''}`} style={{ textDecoration: 'none' }}>
                                        <Icon.ChevronRight size={15} />
                                        <span className="group-hover:underline">{b.label}</span>
                                        {(b.tag != undefined && b.tag > 0) && (
                                            // <small>{b.tag.toString().padStart(2, '0')}</small>
                                            <Badge variant='default' className='text-xs ml-auto group-hover:'>{b.tag.toString().padStart(2, '0')}</Badge>
                                        )}
                                    </Link>
                                    {/* {k < a.contents.length - 1 && (
                                        <Separator className='my-1' />
                                    )} */}
                                </Fragment>
                            )
                        ))}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </div>
    )
}


// type ItemLinkType = {
//     link: string,
//     icon: any,
//     trigger: string
// }
// interface ItemLinkProps {
//     items: any
// }
// const ItemLink = ({items}: ItemLinkProps) => {
//     const router = useRouter()
//     const { short } = useShortNav()

//     return (
//         items.map((a: any, i: number) => (
//             <Link href={a.link} className={`flex justify-between items-center text-sm font-light mb-5 p-3 rounded-md hover:bg-slate-100 dark:hover:text-black break-all ${router.pathname==a.link?styles.active:undefined}`} key={'link-'+i.toString()}>
//                 <span className='flex items-center gap-x-2'>
//                     {a.icon}
//                     {a.trigger}
//                 </span>
//                 <Icon.ChevronRight size={15} />
//             </Link>
//         ))
//     )
// }

// type ContentType = {
//     label: string, 
//     link: string,
//     disabled?: boolean
// }
// type ItemType = {
//     trigger: string,
//     icon: any,
//     contents: ContentType[],
//     disabled?: boolean
// }
// interface AccordionItemLinkProps {
//     items: ItemType[]
// }
// const AccordionItemLink = ({items}: AccordionItemLinkProps) => {
//     const router = useRouter()

//     return (
//         <>
//             {items.map((a, i: number) => !a.disabled && (
//                 <AccordionItem value={`item-${i}`} className={`mb-3 ${i>=items.length-1?'border-b-0':''}`} key={'accordion-item-' + i.toString()}>
//                     <AccordionTrigger className='w-fit break-all text-sm font-light hover:no-underline mb-2 p-3 rounded-md hover:bg-slate-100 dark:hover:text-black'>
//                         <span className='flex items-center gap-x-2'>
//                             {a.icon}
//                             {a.trigger}
//                         </span>
//                     </AccordionTrigger>
//                     <AccordionContentList data={a.contents} />
//                 </AccordionItem>
//             ))}
//         </>
//     )
// }

// const AccordionContentList = ({
//     data
// } : {
//     data: Array<ContentType>
// }) => {
//     const router = useRouter()
//     const [items, setItems] = useState<Array<ContentType>>([])

//     useEffect(()=>{
//         const DATA = data.filter((item) => !item.disabled)
//         setItems(DATA)
//     }, [data])

//     return (
//         <AccordionContent className='pl-3'>
//             {items.map((b, k: number) => (
//                 <Fragment key={'accordion-content-link-' + k.toString()}>
//                     <Link href={b.link} className={`flex break-all gap-2 items-center text-sm font-light p-3 rounded-md hover:bg-slate-100 dark:hover:text-black ${router.pathname == b.link ? styles.active : undefined}`}>
//                         <Icon.ChevronRight size={15} />
//                         {b.label}
//                     </Link>
//                     {k < items.length - 1 && (
//                         <Separator className='my-2' />
//                     )}
//                 </Fragment>
//             ))}
//         </AccordionContent>
//     )
// }

type SidebarMenuProps = PropsWithChildren<{
    withSeparator?: boolean
}>
const SidebarMenu = ({ withSeparator }: SidebarMenuProps) => {

    const { user, userImage, updateUser, token } = useUser()
    const { getCountOrdersInPending, count } = useOrders()

    const data_links = [
        {
            trigger: 'Notifications',
            icon: <Icon.Bell size={15} />,
            contents: [
                { label: 'Tout', link: '/dashboard/notifications' },
                { label: 'Non lues', link: '/dashboard/notifications/unread' },
                // { label: 'Archive', link: '/dashboard/notifications/archive' }
            ],
            disabled: false
        },
        {
            trigger: 'Commandes',
            icon: <Icon.ListOrderedIcon size={15} />,
            contents: [
                { label: 'Tout', link: '/dashboard/orders', tag: count },
                { label: 'En attente', link: '/dashboard/orders/unread', disabled: true },
            ],
            tag: count,
            disabled: false
        },
        {
            trigger: 'Utilisateurs',
            icon: <Icon.Users2Icon size={15} />,
            contents: [
                { label: 'Liste', link: '/dashboard/users' },
                { label: 'Créer', link: '/dashboard/users/add' }
            ],
            disabled: true,
        }
    ]

    useEffect(() => {
        getCountOrdersInPending()
    }, [])

    return (
        <>
            <ItemLink items={[
                {
                    trigger: 'Accueil',
                    icon: <Icon.Home size={15} />,
                    link: 'https://letrans-porteur.com',
                    visible: true
                },
                {
                    trigger: 'Espace de travail',
                    icon: <Icon.Slash size={15} />,
                    link: '/dashboard',
                    visible: true
                },
                {
                    trigger: 'Boutique',
                    icon: <Icon.Store size={15} />,
                    link: '/dashboard/store',
                    visible: true
                },
                {
                    trigger: 'Articles',
                    icon: <Icon.Armchair size={15} />,
                    link: '/dashboard/articles',
                    visible: true
                }
            ]} />

            {withSeparator && (
                <Separator className='my-4' />
            )}

            <Accordion type="single" collapsible className="w-full">
                <AccordionItemLink items={[...data_links]} />
            </Accordion>
        </>
    )
}

type SidebarProps = PropsWithChildren<{

}>
export default function Sidebar({ }: SidebarProps) {
    const { short } = useShortNav()
    const { openSheet, updateOpenSheet } = useSheet()

    return (
        <>
            <Sheet open={openSheet}>
                {/* @ts-ignore */}
                <SheetContent side='left' className='w-[90%] bg-black [&[data-state=open]>button>svg]:text-white' onClose={() => updateOpenSheet(false)}>
                    <SheetHeader>
                        <Link href="https://letrans-porteur.com" target='_blank' className='flex'>
                            <Image
                                src="/logo/Logo_transporteur_BLANC2.png" alt={'Logo'}
                                width={5000}
                                height={5000}
                                className='w-[180px] h-[80px] mx-auto'
                            />
                        </Link>
                        {/* <SheetTitle>Menu</SheetTitle> */}
                    </SheetHeader>
                    <Separator className='mt-1 mb-2' />
                    <ScrollArea className='h-full w-full'>
                        <div className="">
                            <SidebarMenu />
                        </div>
                    </ScrollArea>
                    {/* <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter> */}
                </SheetContent>
            </Sheet>

            <div className={`hidden sm:block fixed left-0 top-0 ${short ? 'w-[150px]' : 'w-[250px]'} h-full bg-black dark:bg-slate-900 shadow-lg z-30 transition-width duration-300`}>
                <ScrollArea className='h-full w-full'>
                    <div className="p-4">
                        {/* <h4 className="py-5 mb-10 text-sm font-medium leading-none">Tags</h4> */}
                        <Link href="https://letrans-porteur.com" target="_blank" className='hidden sm:flex mb-10 border-b'>
                            <Image
                                src="/logo/Logo_transporteur_BLANC.png" alt={'Logo'}
                                loading='lazy'
                                width={100}
                                height={90}
                                className='w-auto min-h-[50px] h-[80px] m-auto'
                            />
                        </Link>

                        <SidebarMenu withSeparator={false} />

                        <div className="mt-10 hidden">
                            <Button variant='destructive' className='w-full rounded-full hover:bg-blue-500 transition-background duration-500'>
                                Déconnexion
                            </Button>
                        </div>

                    </div>
                </ScrollArea>
            </div>
        </>
    )
}
