import AuthHeader from '@/components/AuthHeader'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useRouter as useRouter2 } from 'next/navigation'
import Head from 'next/head'
import AuthHeaderMode from '@/components/AuthHeaderMode'
import Helper from '@/components/Helper'
import InputPassword from '@/components/InputPassword';
import AlertForm from '@/components/alertForm';
import Link from 'next/link';
import { request_api } from '@/helpers/request'
import Icon from '@/components/ui/icon'

export default function NewPassword() {
    const router = useRouter()
    const navigation = useRouter2()

    const { token, email } = router.query

    const [loader, setLoader] = useState(false)
    const [inputs, setInputs] = useState({
        password: '',
        password_confirmation: '',
    })
    const [errors, setErrors] = useState({
        password: null,
        password_confirmation: null
    })
    const [alerts, setAlerts] = useState({
        type: undefined,
        message: ''
    })
    const [loading, setLoading] = useState(true)
    const [verified, setVerified] = useState(false)

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
        setErrors({
            password: null,
            password_confirmation: null
        })
    }

    const hydrateAlerts = (type: undefined | 'destructive', message: string) => {
        setAlerts((prev: any) => ({
            ...prev,
            type,
            message
        }))
    }

    const resetAlerts = () => {
        setAlerts((prev: any) => ({
            ...prev,
            message: ''
        }))
    }

    const onCloseAlert = ()=>{
        resetAlerts()
        // if(verified) {
        //     setTimeout(()=>{
        //         navigation.push('/auth')
        //     }, 5000)
        // }
    }

    const onHandleSubmit = async (e: any)=>{
        e.preventDefault()
        setLoader(true)
        resetAlerts()
        clearErrors()
        
        let ok = true

        if (!inputs.password || !inputs.password_confirmation) {
            hydrateErrors('password', 'Requis.')
            hydrateErrors('password_confirmation', 'Requis.')
            hydrateErrors('text', 'Tous les champs sont obligatoires.')
            ok=false
        }

        if(!ok) {
            setLoader(false)
            return;
        }

        const response = await request_api(`/reset-password/${token}/${email}`, 'POST', {email, password: inputs.password, password_confirmation: inputs.password_confirmation, token})
        console.log({response});

        if(response.hasOwnProperty('success')) {
            if(response?.success) {
                hydrateAlerts(undefined, response?.status_message)
                setVerified(true)
            } else {
                if(response?.errors) {
                    const { errors: _errors } = response
                    // hydrateAlerts('destructive', 'Un ou plusieurs champs ne sont pas renseignés ou sont mal renseignés.')
                    for(let k in _errors) {
                        if(errors.hasOwnProperty(k)) {
                            hydrateErrors(k, _errors[k])
                        }
                    }
                } else if(response?.status_message) {
                    hydrateAlerts('destructive', response?.status_message)
                } else {
                    
                }
            }
        } else {
            // setOpen(true)
        }

        setLoader(false)
    }

    const onCancel = (e: any) => {
        e.preventDefault()
        router.push('/auth/signin')
    }

    useEffect(()=>{
        console.log({ token, email });
        if(token && email) {
            setLoading(false)
        }
    },[token, email])

    return (
        <>
            <Head>
                <title>LeTransporteur | Password Reset</title>
            </Head>

            <AuthHeaderMode />

            <div className="container justify-center">
                <div className="flex flex-col items-center mt-10 mb-10">
                    <AuthHeader titre='Reset Password' />
                    <div className="w-[-webkit-fill-available] md:w-[350px]">

                        <AlertForm variant={alerts.type} message={alerts.message} onClose={onCloseAlert} />

                        {loading ? (
                            <Helper content={'Veuillez patienter, chargement en cours...'} containerClass='text-center' />
                        ) : (
                            <>
                            <form method='post' className='' onSubmit={onHandleSubmit}>
                                <div className="grid w-full items-center gap-4">
                                    <div className='space-y-1.5 hover:drop-shadow-md'>
                                        <InputPassword 
                                            placeholder='Nouveau Mot de passe *'
                                            onChange={(e)=>hydrateInputs('password', e.target.value)} 
                                            value={inputs.password} 
                                            error={errors.password} 
                                            lineAction={false}
                                        />
                                    </div>
                                    <div className='space-y-1.5 hover:drop-shadow-md'>
                                        <InputPassword 
                                            placeholder='Confirmation *'
                                            onChange={(e)=>hydrateInputs('password_confirmation', e.target.value)} 
                                            value={inputs.password_confirmation} 
                                            error={errors.password_confirmation} 
                                            lineAction={false}
                                        />
                                    </div>

                                    <div className="grid w-full items-center gap-2">
                                        <Button disabled={loader} className='w-full text-primary-ground'>
                                            {loader ? (
                                                <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                <Icon.Save className="mr-2 h-4 w-4" />
                                            )}
                                            Enregistrer
                                        </Button>

                                        <Button onClick={onCancel} className='w-full bg-red-500 hover:bg-red-400 hover:text-white'>
                                            <Icon.ArrowLeft className="mr-2 h-4 w-4" /> Annuler
                                        </Button>
                                    </div>
                                </div>
                            </form>

                            {verified && (
                                <div className="text-center text-sm my-3">
                                    <Link href="/auth" className='text-blue-600 hover:text-blue-400 hover:underline'>Je me connecte</Link>
                                </div>
                            )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
