import React, { useState } from 'react'
import { Input } from './ui/input'
import * as Icon from 'lucide-react'
import ErrorInput from './error'

interface InputPasswordProps {
    name?: string,
    placeholder?: string,
    onChange: (a:any)=>void,
    value: string,
    error: string|null,
    lineAction?: boolean
}
export default function InputPassword({
    name,
    placeholder,
    onChange,
    value,
    error,
    lineAction
}: InputPasswordProps) {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <div className="relative">
                {value ? lineAction ? (
                    <div className="text-right">
                        <small className='cursor-pointer font-bold hover:font-thin' onClick={()=>setVisible(!visible)}>{visible?'cacher':'afficher'}</small>
                    </div>
                ) : (
                    visible ? (
                        <Icon.EyeOff className='absolute right-0 border-l h-full w-[35px] px-1' onClick={()=>setVisible(!visible)} />
                    ) : (
                        <Icon.Eye className='absolute right-0 border-l h-full w-[35px] px-1' onClick={()=>setVisible(!visible)} />
                    )
                ) : null}
                <Input name={name||'password'} type={visible?'text':'password'} placeholder={placeholder||'Mot de passe *'} onChange={onChange} value={value} className={`${value?lineAction?'':'pr-11':''} ${error?'border-red-500':''}`} />
            </div>
            {error && (
                <ErrorInput error_message={error} />
            )}
        </>
    )
}
