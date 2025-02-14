import React, { useCallback, useEffect, useState } from 'react'
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
import InputSearch2 from './InputSearch2';
import { CountryType as ModelCountryType } from '@/helpers/type.models';

type CountryType = {
    capital: string,
    currency: string,
    currency_name: string,
    currency_symbol: string,
    emoji: any,
    id: number,
    iso2: string,
    iso3: string,
    latitude: number | string,
    longitude: number | string,
    name: string,
    native: string,
    numeric_code: number | string,
    phone_code: number,
    region: string,
    subregion: string,
    tld: string,
}

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
    onChange:({name, country_code, phone_code, emoji}:{name:string, country_code:string, phone_code:number, emoji:any})=>void,
    disabled?: boolean,
    showCallingCode?: boolean,
    full?: boolean
}
export default function SelectCountry({
    placeholder='Select Country',
    label,
    defaultValue,
    value,
    triggerClass,
    onChange,
    disabled,
    showCallingCode,
    full
  }: SelectProps) {

    const [loading, setLoading] = useState(false);
    const [countryid, setCountryid] = useState(0);
    const [countries, setCountries] = useState<Array<CountryType | ModelCountryType>>([]);
    const [master, setMaster] = useState<Array<CountryType | ModelCountryType>>([]);
    const [cts, setCts] = useState<number[]>([])
    const [masterCts, setMasterCts] = useState<number[]>([])
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState<string|undefined>(undefined)

    const filterItem = useCallback((s: any) => {
        const text = s.target.value;
        if (s) {
            setSearch(text)

            const DATA: number[] = []
            master.map(e => {
                // @ts-ignore
                const ctext = full ? `${e.name} ${e.native} ${e.phone_code}` : `${e.country_code} ${e.country_name} ${e.country_name_en} ${e.calling_code}`;
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
    }, [full, master, masterCts])

    const onChangeSelect = useCallback((e: string) => {
        const V: CountryType | ModelCountryType = JSON.parse(e)
        console.log({ V })
        if(full) {
            // @ts-ignore
            onChange({name:V.name, country_code: V.iso2, phone_code: V.phone_code, emoji: V.emoji})
        } else {
            // @ts-ignore
            onChange({name:V.country_name, country_code: V.country_code, phone_code: V.calling_code, emoji: V.emoji})
        }
        setSearch('')
        setCts([...masterCts])
    }, [full, masterCts])

    const getCountries = async () => {

        const response = await request_api('/countries?active=1', 'GET', null, {})

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
        if(full) {
            GetCountries()
                .then((result: CountryType[]) => {
                    setCountries(result);
                    setMaster(result);

                    const DATA: number[] = []
                    result.map(r => {
                        DATA.push(r.id)
                    })
                    setCts(DATA)
                    setMasterCts(DATA)
                    // console.log('Countries: ', result)
                });
        } else {
            getCountries()
        }
    }, [full]);

    useEffect(() => {
        if(value) {
            const country = countries.filter(c => {
                // @ts-ignore
                const ctext = full ? `${c.iso2} ${c.name} ${c.native} ${c.phone_code}` : `${c.country_code} ${c.country_name} ${c.country_name_en} ${c.calling_code}`;
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
    }, [value, countries, full])

    return (
        <>
            <Select
                onValueChange={onChangeSelect}
                defaultValue={defaultValue ? defaultValue.toString() : ''}
                // value={value ? value.toString() : undefined}
                value={selected}
                disabled={disabled}
            >
                <SelectTrigger className={`w-full ${selected?'':'text-muted-foreground'} ${triggerClass}`} style={{ outlineStyle: 'none' }}>
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
                                key="wispa"
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
                                    // @ts-ignore
                                    full ? `+${a.iso2}` : `+${a.calling_code}`
                                ) : (
                                    // @ts-ignore
                                    full ? `${a.name}` : `${a.country_name}`
                                )}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}
