import Helper from '@/components/Helper'
import NotificationService from '@/components/NotificationService'
import SelectAuthMobileService, { CMType } from '@/components/SelectAuthMobileService'
import ErrorInput from '@/components/error'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { isNumber } from '@/helpers/funcs'
import { catchError, request_api } from '@/helpers/request'
import { FedapayModeType, FeexpayModeType } from '@/helpers/type.models'
import useUser from '@/hooks/useUser'
import React, { useEffect, useState } from 'react'

export default function RequestFormRender({
    onClose,
    className
}: {
    onClose: () => void,
    className?: string
}) {
    const { token } = useUser()

    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [modes, setModes] = useState<Array<FeexpayModeType|FedapayModeType>>([])

    const [inputs, setInputs] = useState({
        service: 'feexpay',
        amount: '',
        payment_mode: '',
        country: 'BJ',
        calling_code: '229',
        phone: '',
    })

    const initErrors = {
        amount: null,
        payment_mode: null,
        country: null,
        phone: null
    }

    const [errors, setErrors] = useState({ ...initErrors })

    const onHandleChange = (e: any) => {
        const { name, value } = e.target
        hydrateInputs(name, value)
    }

    const hydrateInputs = (key: string, value: any) => {
        setInputs((prev: any) => ({ ...prev, [key]: value }))
    }

    const hydrateErrors = (key: string, value: any) => {
        setErrors((prev: any) => ({ ...prev, [key]: value }))
    }

    const clearErrors = () => {
        setErrors({ ...initErrors })
    }

    const getModes = async () => {

        setLoading(true)

        const response = await request_api('/modes?service=feexpay&collection=payout', 'GET', null, { Authorization: `Bearer ${token}` })

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                setModes(response.data.modes)
            } else {
                NotificationService.alert({
                    type: 'error',
                    title: 'Error Server',
                    message: response.status_message,
                    autoHide: true
                })
            }
        } else {
            catchError(response, () => setLoading(false))
        }

        setLoading(false)
    }

    const onHandlePress = async () => {

        NotificationService.hide()
        clearErrors()
        setLoading2(true)

        const { amount, country, payment_mode, phone } = inputs

        const response = await request_api('/withdrawal/create', 'POST', { ...inputs }, { Authorization: `Bearer ${token}` })

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                NotificationService.alert({
                    type: 'success',
                    title: 'Payout',
                    message: response.status_message,
                    autoHide: true
                })
            } else {
                NotificationService.alert({
                    type: 'error',
                    title: 'Error Server',
                    message: response.status_message,
                    autoHide: true,
                })
                if (response.errors) {
                    const _errors = response.errors
                    for (const key in _errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            hydrateErrors(key, _errors[key]);
                        }
                    }
                }
            }
        } else {
            catchError(response, () => setLoading2(false))
        }

        setLoading2(false)
    }

    useEffect(() => {
        getModes()
    }, [])
    return (
        <div className={className}>
            <div className="flex flex-row justify-between">
                <h3 className={`text-black text-xl font-black`}>Demande de retrait</h3>
                <button onClick={onClose}><Icon.X /></button>
            </div>
            <Separator className={`mb-5 mt-1`} />

            <div className="flex justify-center">
            <div className="space-y-5">
                <div className="">
                    <Input
                        type='text'
                        placeholder="0 F CFA"
                        name='amount'
                        id="__amount"
                        onChange={onHandleChange}
                        value={inputs.amount}
                        onInput={isNumber}
                    />
                    <ErrorInput error_message={errors.amount} />
                    <Helper content="Le montant à retirer doit être au minimum egal à 100 (F CFA)" />
                </div>

                <div className="">
                    <SelectAuthMobileService 
                        onChange={function (a: CMType): void {
                            hydrateInputs('payment_mode', a.mode.toLowerCase())
                            hydrateInputs('country', a.country?.country_name)
                            hydrateInputs('calling_code', a.country?.calling_code)
                        }}
                        query='service=feexpay&collection=payout'
                    />
                </div>

                <div className="">
                    <Input
                        placeholder='téléphone'
                        name='phone'
                        id="__phone__"
                        onChange={onHandleChange}
                        value={inputs.phone}
                        onInput={isNumber}
                    />
                    <ErrorInput error_message={errors.phone} />
                    <Helper content="Numero de telephone sans l'indicatif du pays" />
                </div>

                <div className="">
                    <Button
                        onClick={onHandlePress}
                        variant='outline'
                        disabled={loading2}
                        className='uppercase'
                    >
                        {loading2 && (
                            <Icon.Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        )}
                        valider
                    </Button>
                </div>
            </div>
            </div>
        </div>
    )
}
