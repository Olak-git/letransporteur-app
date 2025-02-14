import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import InputSearch from './InputSearch';
import useUser from '@/hooks/useUser'
import { characters_exists } from '@/helpers/funcs';
import { catchError, request_api } from '@/helpers/request';
import { CountryType, FedapayModeType, FeexpayModeType } from '@/helpers/type.models';
import InputSearch2 from './InputSearch2';
import Icon from './ui/icon';

export type CMType = FeexpayModeType | FedapayModeType
// {
//     id: number, 
//     mobile_service:string, 
//     service:string,
//     mode: string
// }
export type DataType = {
    label: string|number,
    value: any,
    id?: number,
    slug?: number,
  }
export interface SelectProps {
    placeholder?: string,
    label?: string,
    defaultValue?: string|number|null,
    value?: string|number|null,
    triggerClass?: string,
    onChange:(a: CMType)=>void,
    disabled?: boolean,
    country_id?: number | null,
    onRefresh?: (a:boolean)=>void,
    query?: string
}
export default function SelectAuthMobileService({
    placeholder='Select Service',
    label,
    defaultValue,
    value,
    triggerClass,
    onChange,
    disabled,
    country_id,
    onRefresh,
    query
  }: SelectProps) {

    const { token } = useUser()
    const [loading, setLoading] = useState(false);
    const [mobile_services, setMobileServices] = useState<Array<FeexpayModeType|FedapayModeType>>([]);
    const [master, setMaster] = useState<Array<FeexpayModeType|FedapayModeType>>([]);
    const [cts, setCts] = useState<number[]>([]);
    const [masterCts, setMasterCts] = useState<number[]>([]);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<string|undefined>(undefined)

    const filterItem = (s: any) => {
        const text = s.target.value;
        if (s) {
            setSearch(text)

            const DATA: number[] = []
            master.map(e => {
                const ctext = `${e.mobile_service}`;
                const itemData = ctext.trim()
                    ? ctext.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                if(characters_exists(textData, itemData)) {
                    DATA.push(e.id) 
                }
            })
            setCts(DATA)
        } else {
            setSearch('')
            setCts([...masterCts])
        }
    }

    const onChangeSelect = (e: string) => {
        const V: CMType = JSON.parse(e)
        console.log({ V })
        onChange(V)
        // onChange({id:V.id, mobile_service:V.mobile_service, mode: V.mode, service: ''})
        setSearch('')
        setCts([...masterCts])
    }

    const getMobileServices = async () => {

        setLoading(true)
        if(onRefresh!=undefined) 
            onRefresh(true)

        // let API = `/countries/${country_id}/modes?collection=payout`

        let API = '/modes';
        if(query) {
            API += (!query.startsWith('?') ? '?' : '');
            API += query
        } else {
            API += '?collection=payout'
        }

        const response = await request_api(API, 'GET', null, { Authorization: `Bearer ${token}` })

        console.log({ response });

        if(response.hasOwnProperty('success')) {
            if(response?.success) {
                setSelected(undefined)
                setMobileServices(response.data.modes)
                setMaster(response.data.modes);
                const DATA: number[] = []
                response.data.modes.map((r:CountryType) => {
                    DATA.push(r.id)
                })
                setCts(DATA)
                setMasterCts(DATA)
            } else {
                if(response?.errors) {
        
                } else {
        
                }
            }
        } else {
            catchError(response, ()=>setLoading(false))
        }

        setLoading(false)
        if(onRefresh!=undefined) 
            onRefresh(true)
    }

    useEffect(() => {
        getMobileServices()
    }, [country_id, query]);

    useEffect(() => {
        if(value) {
            const country = mobile_services.filter(c => {
                const ctext = `${c.mobile_service} ${c.mode} ${c.id}`;
                const itemData = ctext.trim()
                    ? ctext.toUpperCase()
                    : ''.toUpperCase();
                const textData = value?.toString().toUpperCase();
                return characters_exists(textData, itemData);
            })
            if(country.length!=0) {
                setSelected(JSON.stringify(country[0]))
            }
        }
    }, [value, mobile_services])

    if(loading) {
        return (
            <div className="mt-2">
                <Icon.Loader2 size={20} className='animate-spin' />
            </div>
        )
    }

    return (
        <>
            <Select
                onValueChange={onChangeSelect}
                defaultValue={defaultValue ? defaultValue.toString() : ''}
                // value={value ? value.toString() : undefined}
                value={selected}
                disabled={disabled}
            >
                <SelectTrigger className={`w-full ${triggerClass}`}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent 
                    className="" 
                    style={{ outlineStyle: 'none' }}
                >
                    <div className="p-1 border-b fixed top-0 left-0 w-full bg-white dark:bg-gray-900" style={{ zIndex: 2 }}>
                        <InputSearch2 
                            value={search}
                            onChange={filterItem}
                            className='dark:border-0'
                        />
                    </div>
                    <SelectGroup className='mt-12'>
                        {label && (
                            <SelectLabel>{label}</SelectLabel>
                        )}
                        {cts.length==0 && (
                            <SelectItem
                                // disabled={a.value === value}
                                value='--'
                                disabled
                            >
                                Not Found
                            </SelectItem>
                        )}
                        {mobile_services.map((a, i) => (
                            <SelectItem
                                // disabled={a.value === value}
                                key={i.toString()}
                                value={JSON.stringify(a)}
                                className={`${!cts.includes(a.id)?'hidden':''}`}
                            >
                                {a.mobile_service}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}
