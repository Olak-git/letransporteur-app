import styles from '@/styles/Auth.module.css';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import AuthHeader from '@/components/AuthHeader';
import OtpInput from 'react-otp-input';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { format } from "date-fns"
import { getCookies, setCookie } from 'cookies-next';
import AuthHeaderMode from '@/components/AuthHeaderMode';
import AlertLog, { DialogFetchCatch } from '@/components/alert';
import { request_api } from '@/helpers/request';
import Icon from '@/components/ui/icon';
import useUser from '@/hooks/useUser';
import { useDialog } from '@/hooks/useDialog';

export default function ConfirmationAccount() {

    const { user, updateUser, token, updateToken } = useUser()

    const router = useRouter()

    const CURRENT_DATE = format(new Date(), 'yyyy-MM-dd HH:mm:ss')

    const [loader, setLoader] = useState(false)
    const [loader2, setLoader2] = useState(false)
    const [error, setError] = useState<String|null>(null)
    const [successMessage, setSuccessMessage] = useState<String|null>(null)
    const [otp, setOtp] = useState('');

    const { open, openDialog, closeDialog, dialogTitle, editDialogTitle, dialogDescription, editDialogDescription: editDialogDescription, alertType, editAlertType, openCatch, setOpenCatch } = useDialog()

    const onHandleSubmit = async (e: any) => {
        e.preventDefault()
        setLoader(true)

        if(!otp) {
          setError('Code requis.');
          return;
        } else {
          setError(null);
        }
        
        const response = await request_api('/email-verification', 'POST', {otp}, {'Authorization': `Bearer ${token}`})

        console.log({response});

        if(response.hasOwnProperty('success')) {
            if(response?.success) {
                if(response.status_message=='ok') {
                    setSuccessMessage('Vérification de compte réussie.')
                    updateUser(response?.data.user)
                    // setCookie('user', response.user)
                    router.push('/dashboard');
                } else {
                    setError('Erreur non identifié.')
                }
            } else {
                if(response?.errors) {
                    const { errors: _errors } = response
                    if(response.status_message=='echec') {
                        setError(_errors);
                    } else {
                        setError(_errors.otp);
                    }
                } else {
        
                }
            }
        } else {
            setOpenCatch(true)
        }

        setLoader(false)
    }

    const generateNewOtpCode = async (e: any) => {
        e.preventDefault()
        setLoader2(true)

        const response = await request_api('/new-otp', 'POST', {}, {'Authorization': `Bearer ${token}`})

        console.log({response});

        if(response.hasOwnProperty('success')) {
            if(response?.success) {
                if(response.status_message=='ok') {
                    editDialogDescription('Un nouveau code vous a été généré. Veuillez consulter votre boîte de messagerie.')
                    openDialog()
                    updateUser(response?.data.user)
                } else {
                    setError('Erreur non identifié.')
                }
            } else {
                if(response?.errors) {
                    const { errors: _errors } = response
                    console.log({ _errors })
                } else {
        
                }
            }
        } else {
            setOpenCatch(true)
        }

        setLoader2(false)
    }

    const getOtpCode = async (e: any) => {
        e.preventDefault()
        setLoader2(true)

        const response = await request_api('/send-otp', 'POST', {}, {'Authorization': `Bearer ${token}`})

        console.log({response});

        if(response.hasOwnProperty('success')) {
            if(response?.success) {
                if(response?.status_message=='ok') {
                    editDialogDescription('Message envoyé.')
                    openDialog()
                } else {
                    setError('Acces non autorisé.')
                }
            } else {
                if(response?.errors) {
                    const { errors: _errors } = response
                    console.log({ _errors })
                } else if(response?.message == 'Unauthenticated.') {
                    setError('Acces non autorisé.')
                } else {
        
                }
            }
        } else {
            setOpenCatch(true)
        }

        setLoader2(false)
    }

    useEffect(()=>{
        // console.log({ t: format(new Date('2023-01-22T21:51:36.000000Z'), 'yyyy-MM-dd HH:mm:ss'), k: '2023-01-22 22:07:36' > '2023-01-22 22:05:36'});
        const ckies = getCookies()
        console.log({ user, token, ckies });
    },[user, token])


    // {
    //     "success": true,
    //     "status_code": 200,
    //     "status_message": "Authentification réussie.",
    //     "user": {
    //         "id": 2,
    //         "slug": "01hfsxw2e9hzekwdmce50nd97c",
    //         "last_name": "Bonou",
    //         "first_name": "Ulerich",
    //         "email": "prego2023@gmail.com",
    //         "image": null,
    //         "facebook_uid": null,
    //         "google_uid": null,
    //         "otp": "2ae43",
    //         "email_verified_at": null,
    //         "created_at": "2023-11-21T21:51:36.000000Z",
    //         "updated_at": "2023-11-21T21:51:36.000000Z"
    //     },
    //     "token": "1|6YgJagG27dJ3avOm6H2CrFrfYtXbESruAct9Zjm1e54cb8cf"
    // }

    return (
        <>
        <Head>
            <title>LeTransporteur | Acount Confirmation</title>
        </Head>

        <DialogFetchCatch visible={openCatch} closeDialog={()=>setOpenCatch(false)} />
        
        <AlertLog visible={open} close={closeDialog} title={'Confirmation de compte'} description={dialogDescription} type={undefined} />

        <AuthHeaderMode />

        <div className="container justify-center">
            <div className="flex flex-col items-center mt-10 mb-10">
                <AuthHeader titre='Confirmation de compte' className='text-2xl md:mb-3' />
                <div className="w-[-webkit-fill-available] md:w-[350px]">
                    <Alert className={`mb-6 ${successMessage?'text-blue-400 border-blue-500':undefined}`}>
                        <Icon.AlertCircle className="h-4 w-4" />
                        <AlertTitle>Note</AlertTitle>
                        <AlertDescription className='text-muted-foreground'>
                            {successMessage ? successMessage : (
                                <>
                                    Un code de vérification vous a été envoyé à l&apos;adresse <span className='font-medium text-black'>{user?.email}</span>.<br/>Ca expire dans 24h.
                                </>
                            )}
                        </AlertDescription>
                    </Alert>
                </div>
                {/* <p className="text-sm text-blue-700 text-center mb-7">Un code de vérification vous a été envoyé.<br/>Ca expire dans 24h.</p> */}
                <div className="w-[-webkit-fill-available] md:w-[350px]">
                    {(error) && (
                        <Alert variant="destructive" className='mb-4'>
                            <Icon.AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <form method='post' onSubmit={onHandleSubmit} className='hover:drop-shadow-md'>
                        <div className="grid w-full items-center gap-4">
                            <div className='space-y-1.5'>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={5}
                                renderInput={(props) => <input {...props} inputMode='text' />}
                                inputStyle={styles.underlineStyleBase}
                                containerStyle={{ gap: 10, marginBottom: 15 }}
                            />
                            </div>
                            <Button disabled={loader}>
                                {loader && (
                                    <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Confirmer
                            </Button>
                        </div>
                    </form>

                    <div className="flex flex-wrap justify-between gap-x-3 my-3 text-sm">
                        <Button asChild variant='link'>
                            <Link href="/dashboard" onClick={()=>console.log('Code renvoyer')} className='text-blue-600 hover:text-blue-400 hover:underline'>
                                Une autre fois ?
                            </Link>
                        </Button>

                            <Button variant='link' onClick={getOtpCode} disabled={loader2}>
                                {loader2 && (
                                        <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Renvoyez le code
                            </Button>

                            <Button variant='link' onClick={generateNewOtpCode} disabled={loader2}>
                                {loader2 && (
                                        <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Générer un nouveau code
                            </Button>
                        {/* {(user?.otp_expired_at > CURRENT_DATE) ? (
                            <Button variant='link' onClick={getOtpCode} disabled={loader2}>
                                {loader2 && (
                                        <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Renvoyez le code
                            </Button>
                        ) : (
                            <Button variant='link' onClick={generateNewOtpCode} disabled={loader2}>
                                {loader2 && (
                                        <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Générer un nouveau code
                            </Button>
                        )} */}
                    </div>

                </div>
            </div>
        </div>
        </>
    )
}