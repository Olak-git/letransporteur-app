import React, { useEffect, useState } from 'react'
// @ts-ignore
import { GetCountries } from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";
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
import { characters_exists } from '@/helpers/funcs';
import { catchError, request_api } from '@/helpers/request';
import { CountryType } from '@/helpers/type.models';
import useUser from '@/hooks/useUser';
import InputSearch2 from './InputSearch2';

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
    onChange:({name, country_code, phone_code, emoji}:{name:string, country_code:string, phone_code:string, emoji:any})=>void,
    disabled?: boolean,
    showCallingCode?: boolean
}
export default function SelectAuthCountry({
    placeholder='Select Country',
    label,
    defaultValue,
    value,
    triggerClass,
    onChange,
    disabled,
    showCallingCode
  }: SelectProps) {

    const { token } = useUser()

    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState<Array<CountryType>>([]);
    const [master, setMaster] = useState<Array<CountryType>>([]);
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
                const ctext = `${e.country_code} ${e.country_name} ${e.country_name_en} ${e.calling_code}`;
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
        const V: CountryType = JSON.parse(e)
        console.log({ V })
        onChange({name:V.country_name, country_code: V.country_code, phone_code: V.calling_code, emoji: V.emoji})
        // setCountries([...master])
        setSearch('')
        setCts([...masterCts])
    }

    const getCountries = async () => {

        const response = await request_api('/countries?active=1', 'GET', null, { })

        console.log({ response });

        if(response.hasOwnProperty('success')) {
            if(response?.success) {
                setCountries(response.data.countries)
                setMaster(response.data.countries);
                const DATA: number[] = []
                response.data.countries.map((r:CountryType) => {
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
    }

    useEffect(() => {
        getCountries()
    }, []);

    useEffect(() => {
        if(value) {
            const country = countries.filter(c => {
                const ctext = `${c.country_code} ${c.country_name} ${c.country_name_en} ${c.calling_code}`;
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
    }, [value, countries])

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
                    style={{ outlineStyle: 'none', boxShadow: 'none' }}
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
                        {countries.map((a, i) => (
                            <SelectItem
                                // disabled={a.value === value}
                                key={i.toString()}
                                value={JSON.stringify(a)}
                                className={`${!cts.includes(a.id)?'hidden':''}`}
                            >
                                {a.emoji} 
                                {showCallingCode ? (
                                    `+${a.calling_code}`
                                ) : (
                                    `${a.country_name}`
                                )}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}
