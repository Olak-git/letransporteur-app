import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Dropdownb from './dropdownb'
import format from 'date-fns/format'
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';

export type NotifyType = {
    id: string,
    type: string,
    notifiable_id: number,
    data: any,
    read_at: string,
    created_at: string
}

interface NotificationItemProps {
    item: NotifyType,
    showDate?: boolean,
    checkeds: string[],
    updateCheckeds: (a: string, b: boolean) => void,
}

export default function NotificationItem({
    item,
    showDate,
    checkeds,
    updateCheckeds
}: NotificationItemProps) {
    const [checked, setCheckeds] = useState(false)

    const onHandleChecked = (checked: boolean) => {
        updateCheckeds(item.id, checked)
        // setCheckeds(checked)
    }
    return (
        <TableRow className={`border-0 text-xs ${!item.read_at?'font-bold':''} ${checkeds.includes(item.id)?'bg-slate-100':''}`}>
            <TableCell className="pl-1 pl-2 py-1 w-[200px]">
                <div className="flex items-center gap-x-2">
                    <Checkbox
                        // @ts-ignore
                        id={`terms_${item.id}`}
                        // @ts-ignore
                        onCheckedChange={onHandleChecked}
                        checked={checkeds.includes(item.id)}
                        disabled={item.read_at!==null}
                        className={`${item.read_at!==null?'data-[state=unchecked]:bg-gray-800':''}`}
                    />
                    <label
                        // @ts-ignore
                        htmlFor={`terms_${item.id}`}
                        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-x-1"
                    >
                        {showDate && (
                            <>
                                {/* @ts-ignore */}
                                <span className={`${!item.read_at?'text-[12px]':''}`}>{format(new Date(item.created_at), 'dd/MM/yyyy')}</span>
                                {/* <Separator className='w-1 bg-black' /> */}
                                <Separator orientation='vertical' className='h-4' />
                            </>
                        )}
                        <span className={`${!item.read_at?'text-[12px]':''}`}>{format(new Date(item.created_at), 'HH:mm:ss')}</span>
                    </label>
                </div>
            </TableCell>
            <TableCell className="py-1">
                <div className="flex flex-col">
                    {item.data.subject && (
                        <p className='line-clamp-1 text-sm'>[{item.data.subject}]</p>
                    )}
                    <p className='line-clamp-1'>{item.data.message}</p>
                </div>
            </TableCell>
            <TableCell className="pr-0 py-1 w-10">
                <Dropdownb
                    moreOrientation='vertical'
                    menu={[
                        {
                            // label: 'Actions', 
                            items: [
                                {
                                    name: 'Afficher',
                                    link: `/dashboard/notifications/${item.id}`,
                                    // action?: ()=>void|undefined,
                                    // icon: <Icon.ListMinus className='mr-2 h-4 w-4 text-blue-700' />,
                                    separator: false
                                }
                            ]
                        }
                    ]}
                />
            </TableCell>
        </TableRow>
    )
}
