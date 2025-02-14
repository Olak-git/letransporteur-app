import styles from '@/styles/Auth.module.css';
import { Button } from '@/components/ui/button';
import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import AuthHeader from '@/components/AuthHeader';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { format } from "date-fns"
import { getCookies, setCookie } from 'cookies-next';
import AuthHeaderMode from '@/components/AuthHeaderMode';
import AlertLog, { DialogFetchCatch } from '@/components/alert';
import AlertForm from '@/components/alertForm';
import useAlert from '@/hooks/useAlert';
import Icon from '@/components/ui/icon';
import { API_URI, catchError, request_api } from '@/helpers/request';
import useUser from '@/hooks/useUser';
import { useDialog } from '@/hooks/useDialog';
import timer from '@/helpers/utils/timer';

const EmailVerify = ({
    message
}: {
    message?: string
}) => (
    <div className=''>
        {message||'Compte vérifié,'} 
        <div className="flex justify-end">
            <Link href="/dashboard" className='flex justify-center items-center gap-x-1 h-[40px] w-[120px] text-base text-black dark:text-white border rounded-full  drop-shadow-md' style={{ fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                Continuer
                <Icon.ArrowRightIcon className={`${styles.animatelefteen}`} />
            </Link>
        </div>
    </div>
)

export default function ConfirmationAccount() {

    const { user, token, temporaryUserId, updateUser, updateToken, editTemporaryUserId } = useUser()

    const router = useRouter()

    const { email_verify, signature } = router.query

    const { alerts, hydrateAlerts, resetAlerts, setLoader: setLoading } = useAlert()

    const CURRENT_DATE = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    
    const { open, openDialog, closeDialog, dialogTitle, editDialogTitle, dialogDescription, editDialogDescription: editDialogDescription, alertType, editAlertType, openCatch, setOpenCatch } = useDialog()

    const [isVerified, setIsVerified] = useState(false)
    const [loader, setLoader] = useState(false)
    const [loader2, setLoader2] = useState(false)
    const [loader3, setLoader3] = useState(false)
    const [id, setId] = useState<string|undefined>(undefined)
    const [email, setEmail] = useState<string|undefined>(undefined)
    const [restart, setRestart] = useState(false)

    const getEmailAddress = async () => {

        setLoader3(true)

        const response = await request_api(`/email/${id}`, 'GET', null)

        if(response.hasOwnProperty('success')) {
            if(response?.success) {
                setEmail(response.data.email)
            } else {
            }
        } else {
        }

        setLoader3(false)
    }

    const verifyEmail = async () => {
        setLoader(true)
        setLoading(true)

        const response = await request_api(`/${email_verify?.toString().replace(API_URI+'/en/', '')}&signature=${signature}`, 'GET', null, undefined, true, 'en')

        // console.log({response});

        if(response.hasOwnProperty('success')) {
            if(response?.success) {
                hydrateAlerts(undefined, <EmailVerify message={response?.status_message} />, undefined, true)
                // hydrateAlerts(undefined, response?.status_message, undefined, true)
                updateUser(response?.data.user)
                updateToken(response?.data.token)
            } else {
                if(response?.errors) {
                    const { errors: _errors } = response
                    // console.log({ _errors })
                    hydrateAlerts('destructive', _errors, undefined, true)
                } else if(response?.message == 'Unauthenticated.') {
                    hydrateAlerts('destructive', 'Acces non autorisé.', undefined, true)
                } else if(response?.status_message) {
                    hydrateAlerts('destructive', response?.status_message, undefined, true)
                }
            }
        } else {
            catchError(response, ()=>{
                setLoader(false)
                setLoading(false)
            })
        }

        setLoader(false)
        setLoading(false)
    }

    const sendVerificationEmail = async (e: any) => {
        e.preventDefault()
        setLoader2(true)
        setLoading(true)

        const response = await request_api(`/email/verification-notification/${id}`, 'POST', {}) // , {'Authorization': `Bearer ${token}`}

        // console.log({response});

        if(response.hasOwnProperty('success')) {
            if(response?.success) {
                // hydrateAlerts(undefined, response?.status_message, undefined, true)
                // hydrateAlerts(undefined, <EmailVerify />, undefined, true)
                if(response?.status_code==200) {
                    setIsVerified(true)
                } else if(response?.status_code==201) {
                    hydrateAlerts(undefined, response?.status_message, undefined, true)
                } else {
                    
                }
            } else {
                if(response?.errors) {
                    const { errors: _errors } = response
                    // console.log({ _errors })
                } else if(response?.message == 'Unauthenticated.') {
                    hydrateAlerts('destructive', 'Acces non autorisé.', undefined, true)
                } else {
                }
            }
        } else {
            catchError(response, ()=>{
                setLoader2(false)
                setLoading(false)
            })
        }

        setLoader2(false)
        setLoading(false)
    }

    const onStart = async () => {
        await getEmailAddress()
        setRestart(false)
        if(timer.timeoutExists('verify.exists.id')) {
            timer.clearTimeout('verify.exists.id')
        }
    }

    useEffect(()=>{
        if(user) {
            setIsVerified(user.email_verified_at!=null)
            editTemporaryUserId(undefined)
        }
        const ckies = getCookies()
        // console.log({ user, token, ckies });
    },[user, token])

    useEffect(()=>{
        // @ts-ignore
        if(!id && email_verify && email_verify.startsWith('http')) {
            // @ts-ignore
            const url = new URL(email_verify)
            const LOT = url.pathname.split('/')
            const ID = LOT[LOT.length-2]
            setId(ID)
        }
    }, [email_verify, id])

    useEffect(()=>{
        if(temporaryUserId) {
            // @ts-ignore
            setId(temporaryUserId)
        }
        // console.log({ temporaryUserId })
    }, [temporaryUserId])

    useEffect(()=>{
        if(email_verify && signature) {
            if(!isVerified) {
                verifyEmail()
            } else {
                hydrateAlerts(undefined, <EmailVerify />, undefined, true)
            }
        } else if(isVerified) {
            hydrateAlerts(undefined, <EmailVerify />, undefined, true)
        } else {
            hydrateAlerts(
                undefined, 
                <div className='text-muted-foreground'>Un mail de vérification vous a été envoyé à l&apos;adresse <span className='font-medium text-black'>{email||'...'}</span>.<br/>Ca expire dans 24h.</div>,
                'Note',
                true
            )
        }
    }, [email_verify, signature, isVerified, email])

    useEffect(()=>{
        timer.setTimeout('verify.exists.id', ()=>{
            if(!id) {
                setRestart(true)
            }
        }, 20000)
        if(id) {
            onStart()
        }
        return ()=>{
            if(timer.timeoutExists('verify.exists.id')) {
                timer.clearTimeout('verify.exists.id')
            }
        }
    }, [id])

    return (
        <>
        <Head>
            <title>LeTransporteur | Acount verification</title>
        </Head>

        <DialogFetchCatch visible={openCatch} closeDialog={()=>setOpenCatch(false)} />
        
        <AlertLog visible={open} close={closeDialog} title={'Confirmation de compte'} description={dialogDescription} type={undefined} />

        <AuthHeaderMode />

        <div className="container justify-center">
            <div className="flex flex-col items-center mt-10 mb-10">
                <AuthHeader titre='Confirmation de compte' className='text-2xl md:mb-3' />
                <div className="w-[-webkit-fill-available] md:w-[350px]">

                    <AlertForm 
                        variant={alerts.type} 
                        title={alerts.title} 
                        message={alerts.message} 
                        onClose={resetAlerts} 
                        hideCloseButton={alerts.hideCloseButton} 
                        loader={alerts.loader}
                        containerStyles={`mb-6 ${isVerified?'text-blue-400 border-blue-500':''}`}
                    />

                </div>

                <div className="w-[-webkit-fill-available] md:w-[350px]">
                    {restart ? (
                        <div className="grid w-full items-center gap-4">
                            <Button 
                                onClick={()=>router.back()}
                                className='bg-blue-400 hover:bg-blue-500'
                            >
                                <Icon.ArrowLeftIcon className="mr-2 h-4 w-4" />
                                retour
                            </Button>
                        </div>
                    ) : (!isVerified && !email_verify && !signature) && (
                        <div className="grid w-full items-center gap-4">
                            <Button 
                                disabled={loader2||id==undefined}
                                onClick={sendVerificationEmail}
                            >
                                {(loader2||id==undefined) && (
                                    <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Renvoyer le mail
                            </Button>

                            <div className="flex justify-center">
                                <Link href="/auth/signin" className='group flex justify-center items-center gap-x-1 h-[40px] w-[120px] text-base text-white rounded-full' style={{ fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                                    <Icon.ArrowLeftIcon className='text-neutral-400 group-hover:text-black' />
                                </Link>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
        </>
    )
}