import React, { useState } from 'react'
import InputSearch from './InputSearch'
import Select2 from './select2'
import Icon from './ui/icon'

export interface FilterFormProps {
    filter: (a:any)=>void,
    setCategorySelected: (a:string)=>void,
    hiddenCategory?: boolean,
    searchContentClass?: string,
    onHandleSubmit?: (a:any)=>void
}
export default function FilterForm({
    filter,
    setCategorySelected,
    hiddenCategory,
    searchContentClass,
    onHandleSubmit
}: FilterFormProps) {

    const [loading, setLoading] = useState(false)

    const onHandlePressSubmit = async (e:any) => {
        setLoading(true)
        if(onHandleSubmit!=undefined)
            await onHandleSubmit(e)
        setLoading(false)
    }

    return (
        <form action="" className='w-full' onSubmit={onHandlePressSubmit}>
            <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-wrap items-center gap-4 flex-1">
                    <InputSearch onChange={filter} inputStyle={`focus-visible:outline-white focus-visible:shadow-none focus-visible:ring-none focus-visible:bg-slate-100/10 dark:focus-visible:bg-slate-900/10 ${searchContentClass}`} />
                    {!hiddenCategory && (
                        <Select2
                            data={[
                                { label: 'Evènements', value: 'évènements' },
                                { label: 'Transports', value: 'transports' },
                                { label: 'Cinémas', value: 'cinémas' },
                                { label: 'Tout', value: '0' },
                            ]}
                            placeholder={'Catégorie ...'}
                            onChange={(a) => {
                                setCategorySelected(a)
                                // if(a=='all') {
                                //   setCategorySelected(null)
                                // } else {
                                //   setCategorySelected(a)
                                // }
                            }}
                            triggerStyles='w-full sm:w-[180px]'
                        />
                    )}
                </div>
                {loading && (
                    <Icon.Loader2Icon className='animate-spin text-neutral-300 dark:text-muted-foreground' />
                )}
            </div>
        </form>
    )
}
