import { NotifyType } from '@/components/notification.item'
import { request_api } from '@/helpers/request'
import useUser from '@/hooks/useUser'
import { PropsWithChildren, createContext, useEffect, useState } from 'react'

export const NotificationsContext = createContext(0)
const NotificationsContextProvider = ({ children }: PropsWithChildren) => {

    const { token } = useUser()

    const [notifications, setNotifications] = useState<NotifyType[]>([])
    const [unreadTotal, setUnreadTotal] = useState(0)

    const getUnreadNotifications = async () => {
        const response = await request_api('/notifications/unread?limit=5', 'GET', null, { Authorization: `Bearer ${token}` })

        if (response?.success) {
            const { notifications, total } = response?.data
            setUnreadTotal(total)
            setNotifications([...notifications])
        }
    }

    return (
        <NotificationsContext.Provider
            // @ts-ignore
            value={{
                getUnreadNotifications,
                notifications,
                unreadTotal,
                updateUnreadTotal: (nb: number) => setUnreadTotal(nb),
            }}
        >
            {children}
        </NotificationsContext.Provider>
    )
}

export default NotificationsContextProvider;