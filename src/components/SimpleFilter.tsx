import React, { useEffect, useState } from 'react'
import InputSearch from './InputSearch'
import Select2 from './select2'
import InputSearch2 from './InputSearch2'
import { DEFAUT_LIMIT, LIMITS } from '@/helpers/constants'
import Icon from './ui/icon'

export default function SimpleFilter({
    sheetRef,
    onChangeLimit,
    onChange
} : {
    sheetRef?: any,
    onChangeLimit: (a:string|number)=>void,
    onChange?: (a:React.ChangeEvent)=>void
}) {

    const [limit, setLimit] = useState(DEFAUT_LIMIT)

    useEffect(()=>{
        onChangeLimit(limit)
    }, [limit])

    return (
        <div className="mb-3 flex flex-row justify-between items-center gap-x-10">
            <div className="flex-1 flex flex-row items-center gap-x-3">
                {/* <button type='button' onClick={() => sheetRef?.current?.open()}> */}
                    <Icon.ListFilterIcon />
                {/* </button> */}
                <InputSearch2
                    onChange={onChange}
                    className='flex-1'
                />
            </div>
            <Select2
                data={[...LIMITS]}
                // defaultValue={limit}
                placeholder={'Select ...'}
                label={'Limite'}
                value={limit}
                onChange={(a) => {
                    setLimit(a)
                }}
                triggerStyles=''
            />
        </div>
    )
}
