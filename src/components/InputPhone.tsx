import React from 'react'
import SelectCountry from './SelectCountry'
import SelectAuthCountry from './SelectAuthCountry'
import { Input } from './ui/input'
import { isNumber } from '@/helpers/funcs'

export default function InputPhone({
    name,
    onChange,
    id,
    value,
    onCountryChange,
    countryCode,
    placeholder
} : {
    name: string,
    onChange: (a:React.FormEvent)=>void,
    id?: string,
    value: string,
    onCountryChange:({name, country_code, phone_code, emoji}:{name:string, country_code:string, phone_code:string, emoji:any})=>void,
    countryCode: string,
    placeholder?: string
}) {
    // h-[39px]
    return (
        <div className={`flex flex-row items-start rounded-md border hover:drop-shadow-md`}>
            {/* <SelectCountry 
                onChange={function (a): void {
                    onCountryChange({
                        name: a.name,
                        country_code: a.country_code,
                        // @ts-ignore
                        phone_code: a.phone_code,
                        emoji: a.emoji 
                    })
                }} 
                value={countryCode}
                triggerClass='__YXxNm__ w-[100px] border-0 border-r rounded-none'
                showCallingCode
            /> */}
            <SelectCountry 
                onChange={function (a): void {
                    onCountryChange({
                        name: a.name,
                        country_code: a.country_code,
                        // @ts-ignore
                        phone_code: a.phone_code,
                        emoji: a.emoji
                    })
                } } 
                value={countryCode}
                triggerClass='__YXxNm__ w-[100px] border-0 border-r rounded-none rounded-l-md'
                showCallingCode
            />
            {/* <Input 
                placeholder='00000000'
                type='tel'
                inputMode='tel'
                onInput={isNumber}
                name={name}
                id={id}
                onChange={onChange}
                value={value}
                className='__YXxNm__ border-0 flex-1'
            /> */}
            <input
                placeholder={placeholder||'00000000'}
                type='tel'
                inputMode='tel'
                onInput={isNumber}
                name={name}
                id={id}
                onChange={onChange}
                value={value}
                className='__YXxNm__ flex-1 h-[40px] px-2 rounded-r-md text-sm'
                style={{ outlineStyle: 'none' }}
            />
        </div>
    )
}
