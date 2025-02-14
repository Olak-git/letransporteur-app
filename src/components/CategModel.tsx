import Link from "next/link"
import { Checkbox } from "./ui/checkbox"
import * as Icon from 'lucide-react'

interface CategoryProps {
    url: string,
    label: string,
    updateCatCheckeds?: (a: string, b: boolean) => void,
    hiddenCheckbox?: boolean,
    active?: boolean
}
export const Category = ({
    url,
    label,
    updateCatCheckeds,
    hiddenCheckbox,
    active
}: CategoryProps) => {
    return (
        <div className={`flex gap-x-2 items-center p-3 rounded-md dark:hover:text-black ${active?'bg-[#481c4b] hover:bg-[#481c4b]/90 text-white hover:font-bold':'hover:bg-slate-100'}`}>
            {!hiddenCheckbox && (
                <Checkbox
                    // @ts-ignore
                    onCheckedChange={(checked) => updateCatCheckeds(label, checked)}
                    className='data-[state=checked]:border-[#481c4b] data-[state=checked]:bg-[#481c4b]'
                />
            )}
            <Link href={url} className={`flex-1 flex justify-between items-center text-sm font-light dark:hover:text-black break-all`}>
                <span className='flex items-center gap-x-2'>
                    {label}
                </span>
                <Icon.ChevronRight size={15} />
            </Link>
        </div>
    )
}