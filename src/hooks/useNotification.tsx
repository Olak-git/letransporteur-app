import { NotifyType } from '@/components/notification.item'
import { NotificationsContext } from '@/providers/NotificationsContextProvider'
import React, { useContext } from 'react'

export default function useNotification() {

    // @ts-ignore
    const { getUnreadNotifications, notifications, unreadTotal, updateUnreadTotal } = useContext(NotificationsContext)

    const DATA : {
        getUnreadNotifications: ()=>void,
        notifications: Array<NotifyType>,
        unreadTotal: number,
        updateUnreadTotal: (a:number)=>void,
    } = {
        getUnreadNotifications,
        notifications,
        unreadTotal,
        updateUnreadTotal,
    }
    
    return { ...DATA }
}
