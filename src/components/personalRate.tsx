import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import * as Icon from 'lucide-react'
import ErrorInput from '@/components/error'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog'
import Helper from './Helper'
import { isNumber } from '@/helpers/funcs'

export interface PersonalRateFormProps {
    trigger: string|undefined,
    onChangeTrigger: (a:any)=>void,
    triggerError: any,

    rate: number|undefined,
    onChangeRate: (a:any)=>void,
    rateError: any,

    details: string|undefined,
    onChangeDetails: (a:any)=>void,
    detailsError: any,
}
export default function PersonalRateForm({
    trigger,
    onChangeTrigger,
    triggerError,

    rate,
    onChangeRate,
    rateError,
        
    details,
    onChangeDetails,
    detailsError,
}: PersonalRateFormProps) {

    return (
        <div className="grid w-full items-center gap-4">

            <div className="flex flex-wrap sm:flex-nowrap flex-row gap-3">
                <div className='space-y-1.5 basis-full sm:flex-1'>
                    <Label htmlFor="trigger">Nom <span className='text-red-500'>*</span></Label>
                    <Input type="text" name="trigger" id="trigger" placeholder='STANDARD' value={trigger} onChange={onChangeTrigger} />
                    {/* <Helper content="S'il y en a plusieurs, séparez les par des virgules (,)." /> */}
                    <ErrorInput error_message={triggerError} />
                </div>
                <div className='space-y-1.5 basis-full sm:flex-1'>
                    <Label htmlFor="rate">Tarif <span className='text-red-500'>*</span></Label>
                    <Input type="text" id="rate" placeholder="" value={rate} onChange={onChangeRate} onInput={isNumber} />
                    {/* <Helper content="S'il y en a plusieurs, séparez les par des virgules (,)." /> */}
                    <ErrorInput error_message={rateError} />
                </div>
            </div>
                                
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="details">Résumé <span className='text-gray-400 font-thin'>(option)</span></Label>
                <Textarea name='details' id="details" placeholder='' value={details} onChange={onChangeDetails} lang='fr' />
                <ErrorInput error_message={detailsError} />
            </div>
        </div>
    )
}
