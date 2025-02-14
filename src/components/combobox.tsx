"use client"

import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


interface Item {
    label: string,
    value: any,
}
type ComboboxProps = PropsWithChildren<{
    items: Item[],
    selected?: any,
    onSelected: (a:any)=>void,
    disabled?: boolean,
    countrySelected?: string|undefined
}>
export default function Combobox({
    items,
    selected,
    onSelected,
    disabled,
    countrySelected
}: ComboboxProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')

    useEffect(()=>{
        setValue(countrySelected??'')
    }, [countrySelected])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {items.length==0 && (
                        'Select item...'
                    )}
                    {value
                        ? items.find((item) => item.value === value)?.label
                        : "Select item..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command className=''>
                    <CommandInput placeholder="Search item..." />
                    <CommandEmpty>No items found.</CommandEmpty>
                    <CommandGroup className=''>
                        {items.length==0 && (
                            <CommandItem
                                // value={item.value}
                                onSelect={(currentValue) => {
                                    const V = currentValue === value ? "" : currentValue
                                    setValue(V)
                                    onSelected(V)
                                    setOpen(false)
                                }}
                                className=''
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        "opacity-0"
                                    )}
                                />
                            </CommandItem>                            
                        )}
                        {items.map((item, i) => (
                            <CommandItem
                                key={i.toString()}
                                value={item.value}
                                disabled={item.value === value}
                                onSelect={(currentValue) => {
                                    const V = currentValue === value ? "" : currentValue
                                    setValue(V)
                                    onSelected(V)
                                    setOpen(false)
                                }}
                                className=''
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === item.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {item.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}