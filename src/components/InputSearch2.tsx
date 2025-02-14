import React from 'react'
import Icon from './ui/icon'

export default function InputSearch({
    className,
    onChange,
    value
} : {
    className?: string,
    onChange?: (a:React.ChangeEvent)=>void,
    value?: string
}) {
    return (
        <div className={`flex flex-row items-center gap-x-2 rounded-md border h-[39px] px-2 ${className}`}>
            <Icon.SearchIcon />
            <input 
                type='search' 
                placeholder='search'
                onChange={onChange}
                value={value}
                className='flex-1 h-full bg-transparent text-sm font-light' 
                style={{ outlineStyle: 'none' }} 
            />
        </div>
    )
}
