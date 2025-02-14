import ErrorInput from '@/components/error'
import useUser from '@/hooks/useUser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next'
import * as Icon from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import AlertForm from '@/components/alertForm'
import { catchError, request_api } from '@/helpers/request'
import styles from '@/styles/HeaderView.module.css'
import HomeHeader from '@/components/HomeHeader'
import useSocketServices from '@/hooks/useSocketServices'
import Helper from '@/components/Helper'
import useAppConfiguration from '@/hooks/useAppConfiguration'
import NavThumb from '@/components/navThumb'

export default function ContactUs() {

    const isAuthenticated = getCookie('isAuthenticated')

    const { socketServices } = useSocketServices();

    const { user, userImage, updateUser, token } = useUser()

    const { config } = useAppConfiguration()

    const [loader, setLoader] = useState(false)

    const init_errors = {
        lastname: null,
        firstname: null,
        email: null,
        phone: null,
        subject: null,
        message: null
    }
    const [inputs, setInputs] = useState({
        lastname: '',
        firstname: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [errors, setErrors] = useState({ ...init_errors })
    const [alerts, setAlerts] = useState({
        type: undefined,
        message: ''
    })

    const hydrateInputs = (name: string, value: any) => {
        setInputs((prev: any) => ({ ...prev, [name]: value }))
    }
    const onChange = (e: any) => {
        const { name, value } = e.target
        hydrateInputs(name, value)
    }

    const hydrateErrors = (key: string, value: any) => {
        setErrors((prev: any) => ({ ...prev, [key]: value }))
    }

    const clearErrors = () => {
        setErrors({ ...init_errors })
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

    const onHandleSubmit = async (e: any) => {
        e.preventDefault()

        clearErrors()
        resetAlerts()
        setLoader(true)

        let ok = true

        if (!inputs.lastname) {
            hydrateErrors('lastname', 'Le champ nom est obligatoire.')
            ok = false
        }

        if (!inputs.firstname) {
            hydrateErrors('firstname', 'Le champ prénom(s) est obligatoire.')
            ok = false
        }

        if (!inputs.email) {
            hydrateErrors('email', 'Le champ email est obligatoire.')
            ok = false
        }

        if (!inputs.phone) {
            hydrateErrors('phone', 'Le champ téléphone est obligatoire.')
            ok = false
        }

        if (!inputs.message) {
            hydrateErrors('message', 'Le champ message est obligatoire.')
            ok = false
        }

        if (!ok) {
            hydrateAlerts('destructive', 'Un ou plusieurs champs ne sont pas renseignés ou sont mal renseignés.')
            setLoader(false)
            return;
        }

        const response = await request_api('/contact', 'POST', { ...inputs })

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                hydrateAlerts(undefined, 'Votre message a bien été envoyé.')
                hydrateInputs('message', '')
                hydrateInputs('subject', '')
                // sendMessage()
            } else {
                if (response?.errors) {
                    let obj = {}
                    const { errors: _errors } = response
                    hydrateAlerts('destructive', 'Un ou plusieurs champs ne sont pas renseignés ou sont mal renseignés.')
                    for (let k in _errors) {
                        if (errors.hasOwnProperty(k)) {
                            hydrateErrors(k, _errors[k])
                        } else {
                            obj = Object.assign(obj, { [k]: _errors[k] })
                        }
                    }
                } else {

                }
            }
        } else {
            catchError(response, () => setLoader(false))
        }

        setLoader(false)
    }

    // useEffect(() => {
    //     if (isAuthenticated && user && Object.keys(user).length > 0) {
    //         setInputs((prev: any) => ({
    //             ...prev,
    //             lastname: user.last_name??'',
    //             firstname: user.first_name??'',
    //             email: user.email ?? '',
    //             phone: user.phone ?? '',
    //         }))
    //     }
    // }, [isAuthenticated, user])

    // const sendMessage = () => {
    //     socketServices.emit('send_message', {'new-admin-notification': true})
    // }

    return (
        <>
            <Head>
                <title>LeTransporteur | Contact Us</title>
            </Head>

            <div>
                <NavThumb
                    data={[
                        {
                            trigger: 'Tableau de bord',
                            link: '/dashboard'
                        },
                        {
                            trigger: 'Contacts',
                            link: '#',
                            disabled: true
                        }
                    ]}
                />

                <div className="flex px-[10px] mt-8">
                    <div className="w-full sm:w-11/12 md:w-4/5 mx-auto">
                        <AlertForm variant={alerts.type} message={alerts.message} onClose={resetAlerts} containerStyles='hidden sm:block' />
                        <div className="grid sm:grid-cols-5 gap-y-10 sm:gap-20 w-full">
                            <div className="sm:col-span-3 order-1 sm:order-0">
                                <AlertForm variant={alerts.type} message={alerts.message} onClose={resetAlerts} containerStyles='block sm:hidden' />
                                <form method='POST' onSubmit={onHandleSubmit} className="w-full">
                                    <div className="grid w-full items-center gap-6">

                                        <div className="flex flex-wrap sm:flex-nowrap flex-row gap-y-6 sm:gap-4">
                                            <div className='space-y-1.5 hover:drop-shadow-md basis-full sm:flex-1'>
                                                <Input name='lastname' type='text' placeholder='Nom'
                                                    onChange={onChange} value={inputs.lastname} className={errors.lastname ? 'border-red-500' : ''}
                                                />
                                                <ErrorInput error_message={errors.lastname} />
                                            </div>
                                            <div className='space-y-1.5 hover:drop-shadow-md basis-full sm:flex-1'>
                                                <Input name='firstname' type='text' placeholder='Prénom(s)'
                                                    onChange={onChange} value={inputs.firstname} className={errors.firstname ? 'border-red-500' : ''}
                                                />
                                                <ErrorInput error_message={errors.firstname} />
                                            </div>
                                        </div>

                                        <div className='space-y-1.5 hover:drop-shadow-md'>
                                            <Input name='email' type='email' placeholder='Adresse Email *'
                                                onChange={onChange} value={inputs.email} className={errors.email ? 'border-red-500' : ''}
                                            />
                                            <ErrorInput error_message={errors.email} />
                                        </div>

                                        <div className='space-y-1.5 hover:drop-shadow-md'>
                                            <Input name='phone' type='tel' placeholder='Téléphone *'
                                                onChange={onChange} value={inputs.phone} className={errors.phone ? 'border-red-500' : ''}
                                            />
                                            <ErrorInput error_message={errors.phone} />
                                            <Helper content='Indicatif du pays + numero de téléphone' />
                                        </div>

                                        <div className='space-y-1.5 hover:drop-shadow-md'>
                                            <Input name='subject' type='text' placeholder='Objet'
                                                onChange={onChange} value={inputs.subject} className={errors.subject ? 'border-red-500' : ''}
                                            />
                                            <ErrorInput error_message={errors.subject} />
                                        </div>

                                        <div className='space-y-1.5 hover:drop-shadow-md'>
                                            <Textarea name='message' placeholder='Message *'
                                                onChange={onChange} value={inputs.message} className={errors.message ? 'border-red-500' : ''}
                                                lang='fr'
                                            ></Textarea>
                                            <ErrorInput error_message={errors.message} />
                                        </div>

                                        <Button disabled={loader} className='w-full sm:w-fit'>
                                            {loader ? (
                                                <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                <Icon.Mail className="mr-2 h-4 w-4" />
                                            )
                                            }
                                            Envoyer
                                        </Button>

                                    </div>
                                </form>
                            </div>
                            <div className="empty:h-[200px] sm:empty:h-full sm:col-span-2 order-0 sm:order-1 bg-gray-00 rounded-md break-all">
                                <div className="mb-4">
                                    <h6 className="text-base font-semibold mb-2">Contact</h6>
                                    <span className="flex font-thin gap-x-2 text-sm">
                                        <Icon.PhoneCall size={18} className='' />
                                        {config?.contact_phone}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <h6 className="text-base font-semibold mb-2">Email</h6>
                                    <span className="flex font-thin gap-x-2 text-sm">
                                        <Icon.Mail size={18} className='' />
                                        {config?.contact_email}
                                    </span>
                                </div>

                                {/* <div className="">
                                <h6 className="text-xl mb-2">Adresse</h6>
                                <address className="flex font-thin gap-x-2">
                                    <Icon.Map size={20} className='' />
                                    Akpakpa sodjatime, Cotonou, Bénin
                                </address>
                            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
