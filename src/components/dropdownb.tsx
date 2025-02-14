import React, { Fragment, PropsWithChildren } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import * as Icon from 'lucide-react'
import Link from 'next/link'

type Items = {
    name: string,
    link?: string,
    action?: ((a?:any)=>Promise<void>)|((a?:any)=>void),
    icon?: any,
    disabled?: boolean,
    separator?: boolean,
    containerClasses?: string,
    contentClasses?: string,
    visible?: boolean
}
type Menu = {
    label?: string|undefined,
    items: Items[]
}
type DropdownbProps = PropsWithChildren<{
    menu?: Menu[],
    moreOrientation?: 'vertical'|'horizontal',
    disabled?: boolean
}>
export default function Dropdownb({
    menu,
    moreOrientation,
    disabled
}: DropdownbProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={disabled}>
                <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                    <span className="sr-only">Open menu</span>
                    {moreOrientation=='vertical' ? (
                        <Icon.MoreVertical className="h-4 w-4" />
                    ) : (
                        <Icon.MoreHorizontal className="h-4 w-4" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className=''>
                {menu?.map((m,i)=>(
                    <Fragment key={`menu_${i}`}>
                        {m.label && (
                        <Fragment key={`menu_label_${i}`}>
                            <DropdownMenuLabel>{m.label}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </Fragment>
                        )}
                        <DropdownMenuGroup>
                            {m.items.map((item, k) => (item.visible==undefined || item.visible) && (
                                <Fragment key={`menu_link_${i}_${k}`}>
                                    {item.link ? (
                                        <Link href={item.link} className='block'>
                                            <DropdownMenuItem className={`${item.containerClasses}`}>
                                                {item.icon}
                                                <span className={`${item.contentClasses}`}>{item.name}</span>
                                            </DropdownMenuItem>
                                        </Link>
                                    ) : (
                                        <DropdownMenuItem
                                            onClick={item.action}
                                            className={`${item.containerClasses}`}
                                            disabled={item.disabled}
                                        >
                                            {item.icon}
                                            <span className={`${item.contentClasses}`}>{item.name}</span>
                                        </DropdownMenuItem>
                                    )}
                                    {/* (item.separator && k<m.items.length-1) */}
                                    {(item.separator) && (
                                        <DropdownMenuSeparator />
                                    )}
                                </Fragment>
                            ))}
                        </DropdownMenuGroup>
                        {i<menu.length-1 && (
                            <DropdownMenuSeparator />
                        )}
                    </Fragment>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
