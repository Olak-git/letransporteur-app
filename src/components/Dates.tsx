import { capitalizeFirstLetter, getMonthToString } from '@/helpers/funcs'
import { format, getDate, getHours, getMinutes, getMonth } from 'date-fns'
import * as Icon from 'lucide-react'

interface DatesProps {
    date: string,
    time: string,
    index: number,
    length: number,
    dateStyles?: string
}
export default function Dates({
    date,
    time,
    index,
    length,
    dateStyles
}: DatesProps) {
    return (
        <>
            <span className={`${date<format(new Date(), 'yyyy-MM-dd')?'line-through decoration-red-700 decoration-2 cursor-not-allowed':''} ${dateStyles}`}>
                {/* {format(new Date(date), 'dd-MM-yyyy')} */}
                { getDate(new Date(date)).toString().padStart(2, '0') } { capitalizeFirstLetter(getMonthToString(getMonth(new Date(date)))) }
                {' à '}
                { getHours(new Date(date+' '+time)).toString().padStart(2, '0') }H{ getMinutes(new Date(date+' '+time)).toString().padStart(2, '0') }
            </span>
            { index < length - 1 && (
                <Icon.Dot size={20} className='' />
            )}
        </>
    )
}