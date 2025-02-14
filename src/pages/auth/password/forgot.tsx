import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';
import AuthHeader from '@/components/AuthHeader';
import Head from 'next/head';
import AuthHeaderMode from '@/components/AuthHeaderMode';
import AlertForm from '@/components/alertForm';
import { request_api } from '@/helpers/request';
import Icon from '@/components/ui/icon';

export default function ResetPassword() {

    const [loader, setLoader] = useState(false)
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState<String|null>(null)
    const [otp, setOtp] = useState('');
    const [open, setOpen] = useState(false)

    const [alerts, setAlerts] = useState({
        type: undefined,
        message: ''
    })

    const hydrateInputs = (e: any) => {
        const { name, value } = e.target
        setEmail(value)
    }

    const hydrateAlerts = (type: undefined|'destructive', message: string) => {
        setAlerts((prev:any) => ({
            ...prev,
            type,
            message
        }))
    }

    const resetAlerts = () => {
        setAlerts((prev:any) => ({
            ...prev,
            message: ''
        }))
    }

    const openDialog = () => {
        setOpen(true)
    }

    const closeDialog = () => {
        setOpen(false)
    }

    const onHandleSubmit = async (e: any) => {
        e.preventDefault()
        setLoader(true)
        resetAlerts()
        setErrors(null)

        if(!email) {
            setErrors('Adresse Email Requis.');
            setLoader(false)
            return
        } else {
          setErrors(null);
        }

        const response = await request_api('/forgot-password', 'POST', {email})

        console.log({response});

        if(response.hasOwnProperty('success')) {
            if(response?.success) {
                hydrateAlerts(undefined, response?.status_message+' Veuillez vérifier votre boîte de messagerie. Merci.')
            } else {
                if(response?.errors) {
                    const { errors: _errors } = response
                    hydrateAlerts('destructive', 'Un ou plusieurs champs ne sont pas renseignés ou sont mal renseignés.')
                    setErrors(_errors)
                } else if(response?.status_message) {
                    hydrateAlerts('destructive', response?.status_message)
                } else {
                }
            }
        } else {
            setOpen(true)
        }

        setLoader(false)
    }

    return (
        <>
        <Head>
            <title>LeTransporteur | Password Forget</title>
        </Head>

        <AuthHeaderMode />

        <div className="container justify-center">
            <div className="flex flex-col items-center mt-10 mb-10">
                <AuthHeader titre='Reset Password' />
                <div className="w-[-webkit-fill-available] md:w-[350px]">

                    <AlertForm variant={alerts.type} message={alerts.message} onClose={resetAlerts} />

                    {/* {(errors) && (
                        <AlertForm variant={alerts.type} message={alerts.message} onClose={resetAlerts} />
                    )} */}

                    <form action="" method='post' className='hover:drop-shadow-md'>
                        <div className="grid w-full items-center gap-4">
                            <div className='space-y-1.5'>
                                <Input name='email' type='email' placeholder='Adresse Email *' onChange={hydrateInputs} value={email} className={errors?'border-red-500':undefined} />
                            </div>
                            <Button onClick={onHandleSubmit} disabled={loader} className='text-primary-ground'>
                                {loader ? (
                                    <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Icon.Mail className="mr-2 h-4 w-4" /> 
                                )}
                                Envoyer
                            </Button>
                        </div>
                    </form>

                    {/* <Separator className='my-4' /> */}

                    <div className="text-center my-3 text-sm">
                        <span>Je me souviens ? <Link href="/auth/signin" className='text-blue-600 hover:text-blue-400 hover:underline'>je me connecte</Link></span>
                    </div>

                </div>
            </div>
        </div>
        </>
    )
}