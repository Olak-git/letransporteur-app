import React, { Fragment, PropsWithChildren, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/Menu.module.css'
import styles2 from '@/styles/HeaderView.module.css'

import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'

import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import { Separator } from './ui/separator'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import Switche from './switche'
import useUser from '@/hooks/useUser'
import Icon, { NotificationIcon } from './ui/icon'
import useDisconnect from '@/hooks/useDisconnect'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import useMode from '@/hooks/useMode'
import useShortNav from '@/hooks/useShortNav'
import useSheet from '@/hooks/useSheet'
import useNotification from '@/hooks/useNotification'
import useSocketServices from '@/hooks/useSocketServices'
import NotificationService from './NotificationService'
import useOrders from '@/hooks/useOrders'

type NavigationMenubarProps = PropsWithChildren<{
    _d?: boolean,
    mainContainerClasses?: string
}>
export default function NavigationMenubar({ _d, mainContainerClasses }: NavigationMenubarProps) {

    const { user, userImage, updateUser, token, updateToken } = useUser()

    const router = useRouter()

    const { socketServices } = useSocketServices()
    const { toggleIncrement } = useOrders()

    const isAuthenticated = getCookie('isAuthenticated')

    const { getUnreadNotifications, notifications, unreadTotal, updateUnreadTotal } = useNotification()
    
    const { openSheet, updateOpenSheet } = useSheet()
    const { mode, updateMode } = useMode()
    const { short, updateShort } = useShortNav()
    const { onLogOut } = useDisconnect()

    useEffect(()=>{
        // console.log({ isAuthenticated, user });
        if(isAuthenticated) {
            getUnreadNotifications()
        }
    }, [isAuthenticated, unreadTotal])

    // useEffect(()=>{
    //     socketServices.on('receive_message', (data: any) => {
    //         // console.log("DATA received: ", data);
    //         if(data.hasOwnProperty('new-notification')) {
    //             getUnreadNotifications()
    //         }
    //     })
    // },[])

    useEffect(() => {
        socketServices.on('receive_order', (data: any) => {
          if(data.sender=='customer' && data.order?.store?.professional_id==user?.id) {
            toggleIncrement()
            NotificationService.alert({
              type: 'warning',
              autoHide: true,
              variant: 'ghost',
              title: 'Commande',
              message: "Vous avez reçu une nouvelle commande. Veuillez la traiter au plus vite.",
            })
          }
        })
      }, [user])

    // shadow-[#eee] dark:shadow-sm dark:shadow-gray-700
    return (
        <nav className={`fixed left-0 top-0 w-full h-[60px] bg-white dark:bg-[#020817] shadow-3xl border-b-0 z-20 pl-[20px] ${_d?'pl-[20px]':(short?'sm:pl-[160px]':'sm:pl-[260px]')} pr-[10px] flex justify-between items-center gap-y-8 gap-x-4 md:gap-x-8 transition-spacing transition-shadow duration-300 ${mainContainerClasses}`}>
            <div className="flex gap-x-6 items-center">
                {!_d && (
                    <>
                    <Icon.Menu size={30} onClick={()=>{
                        updateShort(!short)
                    }} className='border hidden sm:block min-w-[25px]' />
                    <Icon.Menu size={30} onClick={()=>{
                        updateOpenSheet(!openSheet)
                    }} className='border block sm:hidden min-w-[25px]' />
                    </>
                )}
                <Link href="/dashboard" className='block sm:hidden'>
                    <Image 
                        src="/logo/Logo_transporteur_NOIR.png" alt={'Logo'}
                        loading='lazy'
                        width={100}
                        height={90}
                        className='min-w-[60px] min-h-[50px]'
                    />
                </Link>
            </div>
            
            {/* <ul className='hidden md:flex md:flex-1 gap-x-4 justify-end sm:text-xs md:text-sm lg:text-base'>
                <li>
                    <Link href="/dashboard/contact-us" className={`${styles.nav__link} dark:text-white`}>
                        Nous contacter
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/faqs" className={`${styles.nav__link} dark:text-white`}>
                        Faqs
                    </Link>
                </li>
            </ul> */}

            <Separator orientation='vertical' className='hidden sm:block h-8' />

            <div className="flex gap-x-2 items-center">

                <Switche />

                {user!==undefined && (
                    <div className={`${styles.notifications_hidden}`}>
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant="link" className='hover:no-underline relative'>
                                    <NotificationIcon size={30} />
                                    {unreadTotal>0 && (
                                        <Badge variant="destructive" className='px-1 absolute top-[1px] left-[25px]'>{unreadTotal.toString().padStart(2, '0')}</Badge>
                                    )}
                                </Button>
                            </HoverCardTrigger>
                            {unreadTotal>0 && (
                            <HoverCardContent className="w-80">
                                {notifications.map((e, i) => (
                                    <Fragment key={i.toString()}>
                                        <Link href={`/dashboard/notifications/${e.id}`} className={`flex ${!e.data.subject?'items-center':''} space-x-4 overflow-hidden rounded-lg border px-2 hover:border-muted hover:bg-muted transition-color duration-300`}>
                                            {/* <Avatar>
                                                <AvatarImage src="https://github.com/vercel.png" />
                                                <AvatarFallback>VC</AvatarFallback>
                                            </Avatar> */}
                                            <div className="space-y-1">
                                                {e.data.subject && (
                                                    <h4 className="text-sm font-semibold line-clamp-1">
                                                        {e.data.subject}
                                                    </h4>
                                                )}
                                                <p className="text-sm line-clamp-2">
                                                    {e.data.message}
                                                </p>
                                            </div>
                                        </Link>
                                        <Separator className='my-1' />
                                    </Fragment>
                                ))}
                                
                                <Link href="/dashboard/notifications" className='flex justify-between items-center text-sm text-muted-foreground opacity-60 hover:text-blue-600 hover:opacity-100'>
                                    Tout afficher
                                    <Icon.ChevronRight size={20} />
                                </Link>
                            </HoverCardContent>
                            )}
                        </HoverCard>
                    </div>
                )}

                <Separator orientation='vertical' className='h-8 mr-4' />

                {user==undefined?(
                    <>
                        <Link href="/auth/signup" className='text-sm text-white py-2 px-3 rounded-full bg-[#1A8917] hover:bg-[#156D12]' style={{ fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                            S&apos;inscrire
                        </Link>
                        <Link 
                            href="/auth/signin" 
                            // className='text-sm text-muted-foreground hover:text-black dark:hover:text-white'
                            // className={`dark:text-white   px-2 py-2 text-green-700 hover:px-[0.768rem] hover:rounded-full hover:bg-white hover:shadow-lg hover:text-sm dark:hover:text-gray-700`}
                            className={`dark:text-white   px-2 py-2 ${styles2.btn_signin} hover:shadow-lg hover:text-sm dark:hover:text-red-300`}
                        >
                            Connexion
                        </Link>
                    </>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='link' className='hover:no-underline'>
                                <Avatar>
                                    <AvatarImage src={userImage} alt="@shadcn" />
                                    <AvatarFallback>{user?.username?.slice(0,1).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {_d && (<>
                                <DropdownMenuGroup>
                                    <Link href="/dashboard" className='block'>
                                        <DropdownMenuItem>
                                            <Icon.LayoutDashboard className="mr-2 h-4 w-4" />
                                            <span>Espace de travail</span>
                                            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                            </>)}
                            <DropdownMenuGroup>
                                <Link href="/dashboard/profile" className='block'>
                                    <DropdownMenuItem>
                                        <Icon.User className="mr-2 h-4 w-4" />
                                        <span>Profil</span>
                                        {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                                    </DropdownMenuItem>
                                </Link>
                                <Link href="/dashboard/wallet" className='block'>
                                    <DropdownMenuItem>
                                        <Icon.WalletIcon className="mr-2 h-4 w-4" />
                                        <span>Portefeuille</span>
                                        {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                                    </DropdownMenuItem>
                                </Link>
                                {/* <Link href="/dashboard/settings" className='block'>
                                    <DropdownMenuItem>
                                        <Icon.Settings className="mr-2 h-4 w-4" />
                                        <span>Paramètre</span>
                                    </DropdownMenuItem>
                                </Link> */}
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            <DropdownMenuGroup className={`hidden ${styles.notifications_visible}`}>
                                <Link href="/dashboard/notifications" className='block'>
                                    <DropdownMenuItem className='relative'>
                                        <NotificationIcon className='h-4 w-4' />
                                        <NotificationIcon className='mr-2 h-4 w-4' />
                                        {unreadTotal>0 && (
                                            <Badge variant="destructive" className='absolute top-[2px] left-[20px] text-xs p-0 h-2 w-2'></Badge>
                                        )}
                                        <span>Notifications</span> 
                                        {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator className={`hidden ${styles.notifications_visible}`} />
                            
                            <DropdownMenuItem onClick={onLogOut}>
                                <Icon.LogOut className="mr-2 h-4 w-4" />
                                <span>Déconnexion</span>
                                {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </nav>
    )
}
