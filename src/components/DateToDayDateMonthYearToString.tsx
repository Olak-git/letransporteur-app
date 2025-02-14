import { capitalizeFirstLetter, getDateToString, getMonthToString } from '@/helpers/funcs'
import { getDate, getDay, getMonth, getYear } from 'date-fns'
import React, { PropsWithChildren } from 'react'

type DateToDayDateMonthYearToStringProps = PropsWithChildren<{
    date: string,
    containerClass?: string
}>
export default function DateToDayDateMonthYearToString({
    date,
    containerClass
}: DateToDayDateMonthYearToStringProps) {
  return (
    <span className={`${containerClass}`}>
        <span className="">{ capitalizeFirstLetter(getDateToString(getDay(new Date(date)))) }, </span>
        <span className="">
            { getDate(new Date(date)).toString().padStart(2, '0') }&nbsp;
            { capitalizeFirstLetter(getMonthToString(getMonth(new Date(date)))) }&nbsp;
            { getYear(new Date(date)) }
        </span>
    </span>
  )
}
