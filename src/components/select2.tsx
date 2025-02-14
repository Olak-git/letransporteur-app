import React, { PropsWithoutRef } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type DataType = {
  label: string|number,
  // value: any,
  value: any|string|number|null,
  id?: number,
  slug?: number,
}
export interface SelectProps {
  placeholder: string,
  label?: string,
  data: DataType[],
  defaultValue?: string|number|null,
  value?: string|number|null,
  triggerStyles?: string,
  onChange:(v:any)=>void,
  // onChange:(v:string)=>void,
  disabled?: boolean
}
export default function Select2({
  placeholder,
  label,
  data,
  defaultValue,
  value,
  triggerStyles,
  onChange,
  disabled
}: SelectProps) {
  return (
    <Select 
      // onValueChange={(value) => {
      //   onChange(JSON.parse(value))
      // }}
      onValueChange={onChange} 
      defaultValue={defaultValue?defaultValue.toString():''} 
      value={value?value.toString():undefined}
      disabled={disabled}
    >
      <SelectTrigger className={`w-[180px] ${value?'':'text-muted-foreground'} ${triggerStyles}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && (
            <SelectLabel>{label}</SelectLabel>
          )}
          {data.map((a, i) => (
            <SelectItem 
              // disabled={a.value === value}
              key={i.toString()} 
              // value={!a.value?'':JSON.stringify(a.value)}
              value={!a.value?'':typeof a.value == 'number'?a.value.toString():a.value}
            >
              {a.label}
            </SelectItem>  
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
