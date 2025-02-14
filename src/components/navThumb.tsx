import Link from 'next/link'
import React, { Fragment } from 'react'

type ItemType = {
    trigger: string,
    link: string,
    disabled?: boolean
}
interface NavThumbProps {
    data: ItemType[]
}
export default function NavThumb({
    data
}: NavThumbProps) {
    return (
        <div className='flex mb-6'>
            <ul className="flex flex-wrap items-center gap-x-2 ml-auto">
                {data.map((item, i:number) => (
                    <Fragment key={i.toString()}>
                        {i>0 && (
                            <li className='text-gray-300'>
                                /
                            </li>
                        )}
                        <li className="">
                            {item.disabled ? (
                                <span className='font-light text-sm cursor-default text-muted-foreground'>
                                    {item.trigger}
                                </span>
                            ) : (
                                <Link href={item.link} className={`font-light text-sm text-blue-600 hover:text-blue-500`}>
                                    {item.trigger}
                                </Link>
                            )}
                        </li>
                    </Fragment>
                ))}
            </ul>
        </div>
    )
}
