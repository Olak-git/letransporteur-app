import Image from 'next/image'
import styles from '@/styles/Auth.module.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import AuthHeader from '@/components/AuthHeader';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AuthHeaderMode from '@/components/AuthHeaderMode';
import AlertForm from '@/components/alertForm';
import InputPassword from '@/components/InputPassword';
import { DialogFetchCatch } from '@/components/alert';
import { request_api } from '@/helpers/request';
import Icon from '@/components/ui/icon';
import useUser from '@/hooks/useUser';
import { useDialog } from '@/hooks/useDialog';
import NotificationService from '@/components/NotificationService';
import { SERVER_NOT_RESPONSE } from '@/helpers/constants';

export default function Signin() {

    const { user, token, temporaryUserId, updateUser, updateToken, editTemporaryUserId } = useUser()

    const { open, openDialog, closeDialog, dialogTitle, editDialogTitle, dialogDescription, editDialogDescription: editDialogDescription, alertType, editAlertType, openCatch, setOpenCatch } = useDialog()

    const router = useRouter()

    const [loader, setLoader] = useState(false)
    const [inputs, setInputs] = useState({
        profile: 'seller',
        email: '',
        password: '',
        remember_me: false
    })
    const init_errors = {
        email: null,
        password: null,
        text: null
    }
    const [errors, setErrors] = useState({...init_errors})
    const [alerts, setAlerts] = useState({
        type: undefined,
        message: ''
    })

    const [visible, setVisible] = useState(false)

    const onHandleChange = (e: any) => {
        const { name, value } = e.target
        hydrateInputs(name, value)
    }

    const hydrateInputs = (key: string, value: any) => {
        setInputs((prev: any) => ({...prev, [key]: value}))
    }

    const hydrateErrors = (key: string, value: any) => {
        setErrors((prev: any) => ({...prev, [key]: value}))
    }

    const clearErrors = () => {
        setErrors({...init_errors})
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

    const onHandleSubmit = async (e: any) => {
        e.preventDefault()
        setLoader(true)

        resetAlerts()
        clearErrors()

        let ok = true;

        if(!inputs.email) {
            hydrateErrors('email', 'Champ obligatoire');
            ok = false
        } else {
            hydrateErrors('email', null);
        }

        if(!inputs.password) {
            hydrateErrors('password', 'Champ obligatoire');
            ok = false
        } else {
            hydrateErrors('password', null)
        }

        if(!ok) {
            hydrateAlerts('destructive', 'Un ou plusieurs champs ne sont pas renseignés ou sont mal renseignés.')
            // hydrateErrors('text', 'Tous les champs sont obligatoires.')
            setLoader(false)
            return;
        }

        const response = await request_api('/login', 'POST', inputs)

        console.log({response});

        if(response.hasOwnProperty('success')) {
            if(response?.success) {
                // setCookie('isAuthenticated', true)
                // setCookie('user', response.user)
                if(!response?.data.user.email_verified_at) {
                    editTemporaryUserId(response?.data.user.id)
                } else {
                    updateUser(response?.data.user)
                    updateToken(response?.data.token)
                }
            } else {
                if(response?.errors) {
                    const { errors: _errors } = response
                    hydrateAlerts('destructive', 'Un ou plusieurs champs ne sont pas renseignés ou sont mal renseignés.')
                    for(let k in _errors) {
                        if(errors.hasOwnProperty(k)) {
                            hydrateErrors(k, _errors[k].join('\n'))
                        }
                    }
                } else if(response?.status_message=='echec') {
                    hydrateAlerts('destructive', 'Echec d\'authentification.')
                } else {
        
                }
            }
        } else {
            NotificationService.alert({
                type: 'error',
                variant: 'ghost',
                title: 'Error',
                message: SERVER_NOT_RESPONSE
            })
        }

        setLoader(false)
    }

    useEffect(()=>{
        editTemporaryUserId(undefined)
    }, [])

    useEffect(()=>{
        if(user && token) {
            router.push('/dashboard');
        } else if(temporaryUserId) {
            router.push('/auth/verify');
        }
    }, [user, token, temporaryUserId])

    return (
        <>
        <Head>
            <title>LeTransporteur | Sign in</title>
        </Head>

        <AuthHeaderMode />

        <div className="container justify-center">
            <div className="flex flex-col items-center mt-10 mb-10">
                <AuthHeader titre='Se connecter' />
                <div className="w-[-webkit-fill-available] md:w-[350px]">

                    <AlertForm variant={alerts.type} message={alerts.message} onClose={resetAlerts} />
                    
                    <form action="" method='post' className=''>
                        <div className="grid w-full items-center gap-4">
                            <div className='space-y-1.5 hover:drop-shadow-md'>
                                <Input name='email' type='email' placeholder='Adresse Email *' onChange={onHandleChange} value={inputs.email} className={errors.email?'border-red-500':undefined} />
                            </div>
                            <div className='space-y-1.5 hover:drop-shadow-md'>
                                <InputPassword 
                                    onChange={onHandleChange} 
                                    value={inputs.password} 
                                    error={errors.password} 
                                    lineAction={false}
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" name='remember_me' onCheckedChange={(e) => {
                                    hydrateInputs('remember_me', e.valueOf())
                                }} />
                                <Label htmlFor="remember">Se souvenir de moi</Label>
                            </div>
                            <Button onClick={onHandleSubmit} disabled={loader} className='text-primary-ground'>
                                {loader ? (
                                    <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Icon.Mail className="mr-2 h-4 w-4" /> 
                                )}
                                Se connecter
                            </Button>
                        </div>
                    </form>

                    <div className="flex flex-wrap justify-between gap-x-3 my-3 text-sm">
                        <Link href="/auth/password/forgot" className='text-blue-600 hover:text-blue-400 hover:underline'>Mot de passe oublié?</Link>
                        <span>Pas de compte ? <Link href="/auth/signup" className='text-blue-600 hover:text-blue-400 hover:underline'>je m&apos;inscris</Link></span>
                    </div>

                    {/* <div className="flex justify-center my-5">
                        <Link href="/" className='flex justify-center items-center gap-x-1 h-[40px] w-[120px] text-base text-white rounded-full bg-blue-700 hover:bg-blue-800 drop-shadow-md' style={{ fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                            <Icon.ArrowLeftIcon className={`${styles.animatelefteen}`} />
                            Accueil
                        </Link>
                    </div> */}
                </div>
            </div>
        </div>
        </>
    )
}
