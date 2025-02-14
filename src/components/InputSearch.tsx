import React from 'react'
import * as Icon from 'lucide-react'
import { Input } from './ui/input'

interface InputSearchProps {
    onChange: (a:any)=>void,
    containerStyle?: string,
    inputStyle?: string,
    filter?: (a:any)=>void,
    placeholder?: string,
    value?: string
}
export default function InputSearch({
    onChange,
    containerStyle,
    inputStyle,
    filter,
    placeholder,
    value
}: InputSearchProps) {
    return (
        <div className={`flex items-center w-full sm:flex-1 gap-2 rounded-md relative ${containerStyle}`}>
            <Icon.Search className='text-gray-500 absolute left-4' />
            <Input 
                value={value}
                onChange={onChange}
                className={`focus-visible:outline-gray-200 dark:focus-visible:outline-black outline-none outline-offset-0 pl-[50px] ${inputStyle}`}
                placeholder={placeholder||'Rechercher...'}
            />
        </div>
    )
}
