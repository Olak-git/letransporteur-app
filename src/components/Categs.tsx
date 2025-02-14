import React, { PropsWithChildren } from 'react'
import { Category } from './CategModel'
import { Separator } from './ui/separator'
import { useRouter } from 'next/router'

type CategsType = PropsWithChildren<{
    updateCatCheckeds?: (cat:string, checked:boolean)=>void,
    hiddenCheckbox?: boolean,
    label?: 'evens'|'transports'|'cinemas'
}>
export default function Categs({
    updateCatCheckeds,
    hiddenCheckbox,
    label
} : CategsType) {
    const router = useRouter()

    return (
        <div className="w-full md:w-[340px]">
            <div className="bg-slate-50 dark:bg-slate-900 sticky top-[100px] text-sm p-2 rounded-md grid gap-y-1">
            <span className='font-bold uppercase block mb-3'>Catégories</span>
            <Category url='/events' label='Évènements' active={label=='evens'} hiddenCheckbox={hiddenCheckbox} updateCatCheckeds={updateCatCheckeds} />
            <Separator />
            <Category url='/transports' label='Transports' active={label=='transports'} hiddenCheckbox={hiddenCheckbox} updateCatCheckeds={updateCatCheckeds} />
            <Separator />
            <Category url='/cinemas' label='Cinémas' active={label=='cinemas'} hiddenCheckbox={hiddenCheckbox} updateCatCheckeds={updateCatCheckeds} />
            </div>
        </div>
    )
}
