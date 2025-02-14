import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Head from 'next/head'
import * as Icon from 'lucide-react'
import React, { Fragment, PropsWithChildren, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import ErrorInput from '@/components/error'
import { isNumber } from '@/helpers/funcs'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import AlertForm from '@/components/alertForm'
import { DialogFetchCatch } from '@/components/alert'
import useUser from '@/hooks/useUser'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import InputPassword from '@/components/InputPassword'
import useAlert from '@/hooks/useAlert'
import { Separator } from '@/components/ui/separator'
import { catchError, request_api } from '@/helpers/request'
import { useDialog } from '@/hooks/useDialog'
import SelectCountry from '@/components/SelectCountry'
import CheckboxUi from '@/components/checkbox'
import useMode from '@/hooks/useMode'
import InputPhone from '@/components/InputPhone'
import NotificationService from '@/components/NotificationService'
import NavThumb from '@/components/navThumb'

type ProfileItemProps = PropsWithChildren<{
    iconItem: any,
    textItem: string | null | undefined,
    onHandleClick?: (e: any) => void
}>
export const ProfileItem = ({ iconItem, textItem, onHandleClick }: ProfileItemProps) => {
    return (
        <div className="flex flex-wrap gap-y-2 gap-x-4">
            {iconItem}
            <span className="font-light">{textItem}</span>
            {onHandleClick!=undefined && <Icon.Edit3 onClick={onHandleClick} size={20} className='text-gray-400' />}
        </div>
    )
}
export default function Profile() {

    const { user, userImage, updateUser, token } = useUser();
    const { mode } = useMode();

    const { open, openDialog, closeDialog, dialogTitle, editDialogTitle, dialogDescription, editDialogDescription: editDialogDescription, alertType, editAlertType, openCatch, setOpenCatch } = useDialog()

    // const [openDialog, setOpenDialog] = useState(false)

    const [loader, setLoader] = useState(false)

    const [item, setItem] = useState<string | undefined>(undefined)

    const { alerts, hydrateAlerts, resetAlerts } = useAlert()

    const [openTab, setOpenTab] = useState(false)

    const [tabValue, setTabValue] = useState<'account' | 'password' | 'image'>('account')

    // const [alerts, setAlerts] = useState({
    //     type: undefined,
    //     message: ''
    // })

    const errors_type = {
        username: null,
        gender: null,
        country: null,
        country_code: null,
        country_name: null,
        calling_code: null,
        phone: null,
        full_phone: null,
        email: null,
        ifu_number: null,
        rccm_number: null,

        profile_image: null,

        current_password: null,
        password: null,
        confirmation: null,

        type_identity_paper: null,
        number_identity_paper: null,
        image_identity_paper: null,
    }

    const [inputs, setInputs] = useState({
        profile: "seller",
        username: '',
        gender: '',
        country: "",
        country_code: "BJ",
        country_name: "Bénin",
        calling_code: "229",
        phone: "",
        email: '',
        ifu_number: '',
        rccm_number: '',

        profile_image: null,

        current_password: '',
        password: '',
        confirmation: '',

        type_identity_paper: "",
        number_identity_paper: "",
        image_identity_paper: null,
    })
    const [errors, setErrors] = useState({ ...errors_type })

    const ERR = (errors.phone ? errors.phone : '') + (errors.full_phone ? errors.full_phone : '')
    const error_phone = ERR || null;

    const hydrateInputs = (e: any) => {
        var { name, value } = e.target
        if (name == 'image') {
            value = e.target.files[0]
        }
        setInputKey(name, value)
    }
    const setInputKey = (k: string, v: string) => {
        setInputs((prev: any) => ({ ...prev, [k]: v }))
    }

    const hydrateErrors = (key: string, value: any) => {
        setErrors((prev: any) => ({ ...prev, [key]: value }))
    }

    const clearErrors = () => {
        setErrors({ ...errors_type })
    }

    const openEditor = (item: string) => {
        setItem(item)
        openDialog()
        // openAlertDialog()
    }

    const onHandleChangeImage = function (e: any) {
        const { name, files } = e.target
        setInputKey(name, files[0]) // onChangeImage(e)
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()

        clearErrors()
        resetAlerts()
        setLoader(true)

        let ok = true;

        console.log({ inputs, errors });
        if (!inputs.username) {
            hydrateErrors('username', "Le champ nom d'utilisateur est obligatoire.")
            ok = false
        }
        if (!inputs.email) {
            hydrateErrors('email', 'Le champ email est obligatoire.')
            ok = false
        }
        if (!ok) {
            hydrateAlerts('destructive', 'Un ou plusieurs champs ne sont pas renseignés ou sont mal renseignés.')
            setLoader(false)
            return;
        }

        const formData = {
            profile: inputs.profile,
            username: inputs.username,
            gender: inputs.gender,
            country: inputs.country,
            country_code: inputs.country_code,
            country_name: inputs.country_name,
            calling_code: inputs.calling_code,
            phone: inputs.phone,
            full_phone: inputs.calling_code + '' + inputs.phone,
            email: inputs.email,
            ifu_number: inputs.ifu_number,
            rccm_number: inputs.rccm_number,

            type_identity_paper: inputs.type_identity_paper,
            number_identity_paper: inputs.number_identity_paper,
        }

        const response = await request_api('/edit-profile', 'PUT', formData, { 'Authorization': `Bearer ${token}` })

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                NotificationService.alert({
                    type: 'success',
                    autoHide: true,
                    duration: 7000,
                    title: 'Success',
                    message: 'Profil mis à jour avec succès.'
                })
                updateUser(response?.data.user)
                // sendMessage('send_edit_account_user', {user: response?.data.user})
            } else {
                if (response?.errors) {
                    const { errors: _errors } = response
                    hydrateAlerts('destructive', 'Un ou plusieurs champs ne sont pas renseignés ou sont mal renseignés.')
                    for (let k in _errors) {
                        if (errors.hasOwnProperty(k)) {
                            hydrateErrors(k, _errors[k])
                            // hydrateErrors(k, _errors[k].join('\n'))
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

    const onHandleChangePassword = async (e: any) => {
        e.preventDefault()

        clearErrors()
        resetAlerts()
        setLoader(true)

        let ok = true;

        console.log({ inputs, errors });

        if (!inputs.current_password) {
            hydrateErrors('current_password', 'Le champ mot de passe courant est obligatoire.')
            ok = false
        }
        if (!inputs.password) {
            hydrateErrors('password', 'Le champ mot de passe est obligatoire.')
            ok = false
        }
        if (!inputs.confirmation) {
            hydrateErrors('confirmation', 'Le champ confirmation mot de passe est obligatoire.')
            ok = false
        }

        if (!ok) {
            hydrateAlerts('destructive', 'Un ou plusieurs champs ne sont pas renseignés ou sont mal renseignés.')
            setLoader(false)
            return;
        }

        const data = {
            current_password: inputs.current_password,
            password: inputs.password,
            confirmation: inputs.confirmation
        }

        const response = await request_api('/edit-password', 'PUT', data, { 'Authorization': `Bearer ${token}` })

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                NotificationService.alert({
                    type: 'success',
                    autoHide: true,
                    duration: 7000,
                    title: 'Success',
                    message: 'Mot de passe mis à jour.'
                })
                hydrateAlerts(undefined, 'Mot de passe mis à jour.')
                setInputKey('current_password', '')
                setInputKey('password', '')
                setInputKey('confirmation', '')
            } else {
                if (response?.errors) {
                    const { errors: _errors } = response
                    hydrateAlerts('destructive', 'Un ou plusieurs champs ne sont pas renseignés ou sont mal renseignés.')
                    for (let k in _errors) {
                        if (errors.hasOwnProperty(k)) {
                            hydrateErrors(k, _errors[k])
                            // hydrateErrors(k, _errors[k].join('\n'))
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

    const onHandlePressChangeImage = async (e: any) => {
        e.preventDefault()

        clearErrors()
        resetAlerts()
        setLoader(true)

        let ok = true;

        if (!inputs.profile_image) {
            hydrateErrors('profile_image', 'Veuillez sélectionner un fichier.')
            hydrateAlerts('destructive', 'Fichier obligatoire.')
            setLoader(false)
            return;
        }

        let data = new FormData();
        data.append('profile', inputs.profile)
        // @ts-ignore
        data.append('profile_image', inputs.profile_image, inputs.profile_image.name);
        data.append('_method', 'PUT');

        const response = await request_api('/edit-image', 'POST', data, { Authorization: `Bearer ${token}` }, false)

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                updateUser(response?.data.user)
                NotificationService.alert({
                    type: 'success',
                    autoHide: true,
                    duration: 7000,
                    title: 'Success',
                    message: 'Photo de profil mis à jour avec succès.'
                })
                hydrateAlerts(undefined, 'Photo de profil mis à jour avec succès.')
                // edit user
                if (response.status_message == 'ok') {

                } else {

                }
            } else {
                if (response?.errors) {
                    const { errors: _errors } = response
                    hydrateAlerts('destructive', response.status_message)
                    for (let k in _errors) {
                        if (errors.hasOwnProperty(k)) {
                            hydrateErrors(k, _errors[k])
                            // hydrateErrors(k, _errors[k].join('\n'))
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

    useEffect(() => {
        if (user) {
            // const { email, username } = user

            setInputs((prev: any) => ({
                ...prev,
                username: user.username,
                gender: user.gender,
                country: user.country,
                country_code: user.country_code,
                country_name: user.country_name,
                calling_code: user.calling_code,
                phone: user.phone,
                email: user.email,
                ifu_number: user.ifu_number,
                rccm_number: user.rccm_number,

                // profile_image: null,

                type_identity_paper: user.type_identity_paper,
                number_identity_paper: user.number_identity_paper,
                // image_identity_paper: user.image_identity_paper,
            }))
        }

        console.log({ userImage });
    }, [user])

    return (
        <>
            <Head>
                <title>LeTransporteur | My Profile</title>
            </Head>

            <div>
                <NavThumb
                    data={[
                        {
                            trigger: 'Tableau de bord',
                            link: '/dashboard',
                        },
                        {
                            trigger: 'Profile',
                            link: '#',
                            disabled: true
                        }
                    ]}
                />

                <div className="rounded-md border min-h-[25px]">
                    <div className="bg-slate-900 rounded-t-md h-[60px] sm:h-[100px] relative mb-10 sm:mb-20 transition-height">
                        <div className='absolute bottom-[-25px] sm:bottom-[-50px] left-2 sm:left-5 transition rounded-full border'>
                            <Avatar className='h-[50px] sm:h-[100px] w-[50px] sm:w-[100px]'>
                                <AvatarImage src={userImage} />
                                <AvatarFallback>{user?.username.slice(0, 1).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <Icon.Edit3 onClick={() => {
                                setOpenTab(true)
                                setTabValue('image')
                            }} className='text-gray-400 absolute w-7 h-7 sm:w-9 sm:h-9 bottom-[-2px] right-[-8px] border rounded-full p-[8px] bg-slate-600 transition-width' />
                        </div>
                    </div>

                    <div className="grid gap-y-2 p-3">
                        <ProfileItem
                            iconItem={<Icon.UserIcon />}
                            textItem={user?.username}
                            onHandleClick={() => {
                                setOpenTab(true)
                                setTabValue('account')
                            }}
                        />
                        <ProfileItem
                            iconItem={<Icon.LucideMailbox />}
                            textItem={user?.email}
                            onHandleClick={() => {
                                setOpenTab(true)
                                setTabValue('account')
                            }}
                        />
                        <ProfileItem
                            iconItem={<Icon.PhoneIcon />}
                            textItem={'+' + user?.full_phone}
                            onHandleClick={() => {
                                setOpenTab(true)
                                setTabValue('account')
                            }}
                        />
                        <ProfileItem
                            iconItem={<Icon.ShuffleIcon />}
                            textItem={user?.gender}
                            onHandleClick={() => {
                                setOpenTab(true)
                                setTabValue('account')
                            }}
                        />
                        <ProfileItem
                            iconItem={<Icon.LucideMailbox />}
                            textItem={user?.email}
                            onHandleClick={() => {
                                setOpenTab(true)
                                setTabValue('account')
                            }}
                        />
                        <ProfileItem
                            iconItem={<h3>IFU</h3>}
                            textItem={user?.ifu_number}
                            onHandleClick={user?.state_verification=='accepted'?undefined:() => {
                                setOpenTab(true)
                                setTabValue('account')
                            }}
                        />
                        <ProfileItem
                            iconItem={<h3>RCCM</h3>}
                            textItem={user?.rccm_number}
                            onHandleClick={user?.state_verification=='accepted'?undefined:() => {
                                setOpenTab(true)
                                setTabValue('account')
                            }}
                        />
                        <ProfileItem
                            iconItem={<Icon.KeyRound />}
                            textItem='********'
                            onHandleClick={() => {
                                setOpenTab(true)
                                setTabValue('password')
                            }}
                        />
                    </div>

                    {openTab && (
                        <div className="container justify-center">

                            <div className="flex justify-end">
                                <Icon.X onClick={() => setOpenTab(false)} />
                            </div>
                            <Separator />

                            {/* <AlertForm variant={alerts.type} message={alerts.message} onClose={resetAlerts} containerStyles='mt-5' /> */}

                            <div className="flex flex-col items-center mt-10 mb-10">
                                <div className="w-[-webkit-fill-available] md:w-[400px]">

                                    <AlertForm variant={alerts.type} message={alerts.message} onClose={resetAlerts} containerStyles='' />

                                    <Tabs defaultValue='account' value={tabValue} className="w-full">
                                        <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="account" disabled={loader} onClick={() => setTabValue('account')} className=''>Account</TabsTrigger>
                                            <TabsTrigger value="password" disabled={loader} onClick={() => setTabValue('password')} className=''>Password</TabsTrigger>
                                            <TabsTrigger value="image" disabled={loader} onClick={() => setTabValue('image')} className=''>Photo de profil</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="account">
                                            <form
                                                method='post'
                                                encType="multipart/form-data"
                                                onSubmit={onSubmit}
                                                className=''
                                            >
                                                <div className="space-y-3">
                                                    <div className='space-y-1.5'>
                                                        <Input name='username' type='text' placeholder="Nom d'utilisateur" onChange={hydrateInputs} value={inputs.username} className={errors.username ? 'border-red-500' : ''} />
                                                        <ErrorInput error_message={errors.username} />
                                                    </div>
                                                    <div className='space-y-1.5'>
                                                        <Input name='email' type='email' placeholder='E-mail *' onChange={hydrateInputs} value={inputs.email} className={errors.email ? 'border-red-500' : ''} />
                                                        <ErrorInput error_message={errors.email} />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <SelectCountry
                                                            placeholder='Pays de résidence'
                                                            onChange={function (a): void {
                                                                setInputKey('country', a.name)
                                                            }}
                                                            value={inputs.country}
                                                        />
                                                        <ErrorInput error_message={errors.country} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <Label htmlFor='man_gender'>Genre: </Label>
                                                            <div className="flex flex-row flex-wrap items-center gap-y-2 gap-x-5">
                                                                <div className="flex items-center gap-x-2">
                                                                    <CheckboxUi
                                                                        id='woman_gender'
                                                                        checked={inputs.gender == 'femme'}
                                                                        onCheckedChange={(a: boolean) => {
                                                                            setInputKey('gender', a ? 'femme' : '')
                                                                        }}
                                                                        strokeColor={mode == 'light' ? '#000000' : '#FFFFFF'}
                                                                    />
                                                                    <label
                                                                        onClick={() => {
                                                                            if (inputs.gender != 'femme') {
                                                                                setInputKey('gender', 'femme')
                                                                            } else {
                                                                                setInputKey('gender', '')
                                                                            }
                                                                        }}
                                                                        htmlFor='woman_gender'
                                                                        className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                    >
                                                                        Femme
                                                                    </label>
                                                                </div>
                                                                <div className="flex items-center gap-x-2">
                                                                    <CheckboxUi
                                                                        id='man_gender'
                                                                        checked={inputs.gender == 'homme'}
                                                                        onCheckedChange={(a: boolean) => {
                                                                            setInputKey('gender', a ? 'homme' : '')
                                                                        }}
                                                                        strokeColor={mode == 'light' ? '#000000' : '#FFFFFF'}
                                                                    />
                                                                    <label
                                                                        onClick={() => {
                                                                            if (inputs.gender != 'homme') {
                                                                                setInputKey('gender', 'homme')
                                                                            } else {
                                                                                setInputKey('gender', '')
                                                                            }
                                                                        }}
                                                                        htmlFor='man_gender'
                                                                        className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                    >
                                                                        Homme
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ErrorInput error_message={errors.gender} />
                                                    </div>
                                                    <div className='space-y-1.5'>
                                                        <InputPhone
                                                            placeholder='téléphone'
                                                            onCountryChange={a => {
                                                                setInputKey('country_code', a.country_code)
                                                                setInputKey('calling_code', a.phone_code)
                                                                setInputKey('country_name', a.name)
                                                            }}
                                                            countryCode={inputs.country_code}
                                                            name='phone'
                                                            id="__phone__"
                                                            onChange={hydrateInputs}
                                                            value={inputs.phone}
                                                        />
                                                        <ErrorInput error_message={error_phone} />
                                                    </div>
                                                    {user?.state_verification!='accepted' && (
                                                        <>
                                                            <div className="space-y-1.5">
                                                                <Input name='ifu_number' type='text' placeholder='N IFU' onChange={hydrateInputs} value={inputs.ifu_number} className={errors.ifu_number ? 'border-red-500' : ''} />
                                                                <ErrorInput error_message={errors.ifu_number} />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Input name='rccm_number' type='text' placeholder='N RCCM' onChange={hydrateInputs} value={inputs.rccm_number} className={errors.rccm_number ? 'border-red-500' : ''} />
                                                                <ErrorInput error_message={errors.rccm_number} />
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="flex mt-4">
                                                    <Button
                                                        disabled={loader}
                                                        className='ml-auto'
                                                    >
                                                        {loader && (
                                                            <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        )}
                                                        Enregistrer
                                                    </Button>
                                                </div>
                                            </form>
                                        </TabsContent>
                                        <TabsContent value="password">
                                            <form
                                                method='post'
                                                encType="multipart/form-data"
                                                onSubmit={onHandleChangePassword}
                                                className=''
                                            >
                                                <div className={`grid gap-y-3`}>
                                                    <div className='space-y-1.5'>
                                                        <InputPassword
                                                            onChange={hydrateInputs}
                                                            value={inputs.current_password}
                                                            error={errors.current_password}
                                                            lineAction={false}
                                                            name='current_password'
                                                            placeholder='Mot de passe courant *'
                                                        />
                                                    </div>
                                                    <div className="flex flex-wrap sm:flex-nowrap flex-row gap-2">
                                                        <div className='space-y-1.5 basis-full sm:flex-1'>
                                                            <InputPassword
                                                                onChange={hydrateInputs}
                                                                value={inputs.password}
                                                                error={errors.password}
                                                                lineAction={false}
                                                                name='password'
                                                                placeholder='Nouveau mot de passe *'
                                                            />
                                                        </div>
                                                        <div className='space-y-1.5 basis-full sm:flex-1'>
                                                            <InputPassword
                                                                onChange={hydrateInputs}
                                                                value={inputs.confirmation}
                                                                error={errors.confirmation}
                                                                lineAction={false}
                                                                name='confirmation'
                                                                placeholder='Confirmation *'
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex mt-4">
                                                    <Button
                                                        disabled={loader}
                                                        className='ml-auto'
                                                    >
                                                        {loader && (
                                                            <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        )}
                                                        Enregistrer
                                                    </Button>
                                                </div>
                                            </form>
                                        </TabsContent>
                                        <TabsContent value="image">
                                            <form
                                                method='post'
                                                encType="multipart/form-data"
                                                onSubmit={onHandlePressChangeImage}
                                                className=''
                                            >
                                                <div className={`grid gap-y-3=`}>
                                                    <div className='space-y-1.5'>
                                                        <Label htmlFor='image'>Photo de Profil</Label>
                                                        <Input name='profile_image' type='file' accept='image/*' placeholder='' id="image" onChange={onHandleChangeImage} />
                                                        <ErrorInput error_message={errors.profile_image} />
                                                    </div>
                                                </div>
                                                <div className="flex mt-4">
                                                    <Button
                                                        disabled={loader}
                                                        className='ml-auto'
                                                    >
                                                        {loader && (
                                                            <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        )}
                                                        Enregistrer
                                                    </Button>
                                                </div>
                                            </form>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
