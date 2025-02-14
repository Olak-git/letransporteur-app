import React from 'react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import Icon from './ui/icon'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

type OptionType = {
    label: string|number,
    value: string|number
}
export interface SearchFormProps {
    editSearchText: (a:string)=>void,
    editCountry: (a:string)=>void,
    editCity?: (a:string)=>void,
    editAddress?: (a:string)=>void,
    onPress: (e:any)=>void,
    loader: boolean,
    placeholder?: string,
    showOptions?: boolean,
    options?: OptionType[],
    onOptionChanged?: (a:string|number|null)=>void,
    optionValue?: string|number|null,
    table?: 'transports'|'cinemas'|'events'
}
export default function SearchForm({
    editSearchText,
    editCountry,
    editCity,
    editAddress,
    onPress,
    loader,
    placeholder,
    showOptions,
    options,
    onOptionChanged,
    optionValue,
    table
} : SearchFormProps) {
    return (
        <div className="block w-full">
            <div className={`flex flex-row flex-wrap sc:flex-nowrap gap-y-2 gap-x-4 shadow rounded-lg ${table=='transports'?'sc:rounded-[10px]':'sc:rounded-[50px]'} ${table=='transports'?'sc:h-[128px]':'sc:h-[64px]'} py-2 pl-6 pr-4 bg-white dark:bg-gray-700`}>

                {(showOptions) && (
                    <div className="">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='outline' className='hover:no-underline w-[40px] px-1' style={{ outline: 'none' }}>
                                    {/* <Icon.MaximizeIcon /> */}
                                    <Icon.ListMinus />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-fit ml-[70px] ml-[55px]">
                                <DropdownMenuLabel>Catégorie</DropdownMenuLabel>
                                {options?.map((option, i:number) => (
                                    <React.Fragment key={i.toString()}>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={()=>{
                                            if(onOptionChanged!==undefined) {
                                                if(optionValue===option.value) {
                                                    onOptionChanged(null)
                                                } else {
                                                    onOptionChanged(option.value)
                                                }
                                            }
                                        }} className='justify-between'>
                                            <span>{option.label}</span>
                                            {optionValue===option.value && (
                                                <Icon.CheckIcon className='w-4 h-4' />
                                            )}
                                        </DropdownMenuItem>
                                    </React.Fragment>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}

                <div className="basis-full sc:flex-1 sc:h-full">
                    {(table=='transports' && editCity!==undefined && editAddress!==undefined) ? (
                        <>
                            <div className="sc:h-1/2 flex flex-row items-center flex-wrap sd:flex-nowrap gap-y-2 gap-x-4">
                                <InputText 
                                    label='Quoi ?' 
                                    placeholder={placeholder||'Évènement, Cinéma, Compagnie de transport...'} 
                                    onHandleChange={editSearchText} 
                                    id='search'
                                />
                                <Separator orientation='vertical' className='h-[64px] hidden sd:block' />

                                <Separator className='h-[1px] sd:hidden' />

                                <InputText 
                                    label='Où ?'
                                    placeholder={'Pays, Ville...'} 
                                    onHandleChange={editCountry} 
                                    id='country'
                                />
                            </div>

                            <Separator className='my-2 sc:my-0 h-[1px]' />

                            <div className="sc:h-1/2 flex flex-row items-center flex-wrap sd:flex-nowrap gap-y-2 gap-x-4">
                                <InputText 
                                    label='Point de départ ?' 
                                    placeholder='Ville...' 
                                    onHandleChange={editCity} 
                                    id='city'
                                />
                                <Separator orientation='vertical' className='h-[64px] hidden sd:block' />

                                <Separator className='h-[1px] sd:hidden' />

                                <InputText 
                                    label='Adresse de départ ?'
                                    placeholder='Quartier, Rue...' 
                                    onHandleChange={editAddress} 
                                    id='address'
                                />
                            </div>
                        </>
                    ) : (
                        <div className="sc:h-full flex flex-row items-center flex-wrap sd:flex-nowrap gap-y-2 gap-x-4">
                            <InputText 
                                label='Quoi ?' 
                                placeholder={placeholder||'Évènement, Cinéma, Compagnie de transport...'} 
                                onHandleChange={editSearchText} 
                                id='search'
                            />
                            <Separator orientation='vertical' className='h-[64px] hidden sd:block' />

                            <Separator className='h-[1px] sd:hidden' />

                            <InputText 
                                label='Où ?'
                                placeholder={'Pays, Ville...'} 
                                onHandleChange={editCountry} 
                                id='country'
                            />
                        </div>
                    )}
                </div>

                <Separator className='h-[1px] sc:hidden' />
                <div className="shrink-0 flex items-center justify-center w-full sc:w-fit mt-2 sc:mt-0">
                    <Button variant='secondary' onClick={onPress} className='text-sm font-bold bg-yellow-400 hover:bg-yellow-500 rounded-[50px] text-[#2d3748] nowrap w-full'>
                        {loader && (
                            <Icon.Loader2 className='w-4 h-4 animate-spin mr-1' />
                        )}
                        Rechercher
                    </Button>
                </div>
            </div>
        </div>
    )
}


const InputText = ({
    label,
    placeholder,
    onHandleChange,
    id
} : {
    label: string,
    placeholder: string,
    onHandleChange: (a:string)=>void,
    id: string
}) => {
    return (
        <div className="basis-full sd:flex-1 h-full flex flex-col">
            <label htmlFor={id} className='font-bold text-[1rem] text-gray-800 dark:text-slate-100'>{label}</label>
            <input id={id} placeholder={placeholder} onChange={(e) => onHandleChange(e.target.value)} className='outline-none text-sm text-gray-800 dark:text-slate-100 placeholder:text-gray-800 dark:placeholder:text-slate-100 placeholder:opacity-50 h-[20px] w-full bg-transparent block' style={{ outline: 'none' }} />
        </div>
    )
}