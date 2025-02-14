import Image from 'next/image'
import styles from '@/styles/Auth.module.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AuthHeader from '@/components/AuthHeader';
import Head from 'next/head';
import { useRouter } from 'next/navigation'
import ErrorInput from '@/components/error';
import AuthHeaderMode from '@/components/AuthHeaderMode';
import AlertForm from '@/components/alertForm';
import InputPassword from '@/components/InputPassword';
import { DialogFetchCatch } from '@/components/alert';
import { API_STORAGE, catchError, request_api } from '@/helpers/request';
import Icon from '@/components/ui/icon';
import useUser from '@/hooks/useUser';
import { useDialog } from '@/hooks/useDialog';
import NotificationService from '@/components/NotificationService';
import { IDENTITY_PAPER, SERVER_NOT_RESPONSE } from '@/helpers/constants';
import { Label } from '@/components/ui/label';
import CheckboxUi from '@/components/checkbox';
import useMode from '@/hooks/useMode';
import SelectCountry from '@/components/SelectCountry';
import SelectAuthCountry from '@/components/SelectAuthCountry';
import Select2 from '@/components/select2';
import useThumbnail from '@/hooks/useThumbnail';
import InputPhone from '@/components/InputPhone';
import { isNumber } from '@/helpers/funcs';

export default function Signup() {

    const { user, token, temporaryUserId, updateUser, updateToken, editTemporaryUserId } = useUser()
    const { mode } = useMode();

    const router = useRouter()

    const imageIdentityPaperRef = useRef(null)

    const { fileChange: imageIdentityPaperFileChange, source: imageIdentityPaperSource, clearSources: imageIdentityPaperClearSources } = useThumbnail({ multiple: false })
    const [image_identity_paper_source, setImageIdentityPaperSource] = useState<string | null>(null);

    const init_errors = {
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
        password: null,
        type_identity_paper: null,
        number_identity_paper: null,
        image_identity_paper: null,
    }
    const [loader, setLoader] = useState(false)
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
        password: '',
        type_identity_paper: "",
        number_identity_paper: "",
        image_identity_paper: null,
    })
    const [errors, setErrors] = useState({ ...init_errors })

    const ERR = (errors.phone?errors.phone:'')+(errors.full_phone?errors.full_phone:'')
    const error_phone = ERR||null;

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
        setInputs((prev: any) => ({ ...prev, [key]: value }))
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

    const onHandleClearSource = function (name: string) {
        hydrateInputs(name, null) // onChangeImage({target: {files: [null]}})
        imageIdentityPaperClearSources()
        // @ts-ignore
        imageIdentityPaperRef.current.value = ''
    }
    const onHandleChangeImage = function (e: any) {
        const { name, files } = e.target
        hydrateInputs(name, files[0]) // onChangeImage(e)
        imageIdentityPaperFileChange(e)
    }

    const onHandleSubmit = async (e: any) => {

        e.preventDefault()

        NotificationService.hide()

        resetAlerts()
        clearErrors()
        setLoader(true)

        let ok = true;

        console.log({ inputs, errors });
        if (!inputs.username) {
            hydrateErrors('username', 'Le champ nom utilisateur est obligatoire.')
            ok = false
        }

        if (!inputs.gender) {
            hydrateErrors('gender', 'Le champ genre(s) est obligatoire.')
            ok = false
        }

        if (!inputs.email) {
            hydrateErrors('email', 'Le champ email est obligatoire.')
            ok = false
        }

        if (!inputs.password) {
            hydrateErrors('password', 'Le champ mot de passe est obligatoire.')
            ok = false
        }

        if (!ok) {
            hydrateAlerts('destructive', 'Un ou plusieurs champs ne sont pas renseignés ou sont mal renseignés.')
            setLoader(false)
            return;
        }

        const formData = new FormData();

        formData.append('profile', inputs.profile);
        formData.append('username', inputs.username);
        formData.append('gender', inputs.gender);
        formData.append('country', inputs.country);
        formData.append('country_code', inputs.country_code);
        formData.append('country_name', inputs.country_name);
        formData.append('calling_code', inputs.calling_code);
        formData.append('phone', inputs.phone);
        formData.append('full_phone', inputs.calling_code+''+inputs.phone);
        formData.append('email', inputs.email);
        formData.append('ifu_number', inputs.ifu_number);
        formData.append('password', inputs.password);
        formData.append('type_identity_paper', inputs.type_identity_paper);
        formData.append('number_identity_paper', inputs.number_identity_paper);
        if (inputs.image_identity_paper) {
            // @ts-ignore
            formData.append('image_identity_paper', inputs.image_identity_paper, inputs.image_identity_paper.name)
        }

        const response = await request_api('/registration', 'POST', formData, {}, false)

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                if (response.status_message == 'ok') {
                    router.push('/auth/signin');
                } else {
                    editTemporaryUserId(response?.data.user.id)
                    router.push('/auth/verify');
                }
            } else {
                if (response?.errors) {
                    let obj = {}
                    const { errors: _errors } = response
                    hydrateAlerts('destructive', 'Un ou plusieurs champs ne sont pas renseignés ou sont mal renseignés.')
                    // hydrateErrors('text', 'Un ou plusieurs champs ne sont pas renseignés ou sont mal renseignés.')
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

    useEffect(() => {
        editTemporaryUserId(undefined)
    }, [])

    useEffect(() => {
        if (temporaryUserId) {
            router.push('/auth/verify');
        }
    }, [temporaryUserId])

    return (
        <>
            <Head>
                <title>LeTransporteur | Sign up</title>
            </Head>

            <AuthHeaderMode />

            <div className="container justify-center">
                <div className="flex flex-col items-center mt-10 mb-10">
                    <AuthHeader titre="S'inscrire" />
                    <div className="w-[-webkit-fill-available] md:w-fit">

                        <AlertForm variant={alerts.type} message={alerts.message} onClose={resetAlerts} />

                        <form action="" method='post' className='' onSubmit={onHandleSubmit}>
                            <div className="grid w-full items-center gap-4">

                                <div className='space-y-1.5 hover:drop-shadow-md'>
                                    <Input name='username' type='text' placeholder='Nom Complet' onChange={onHandleChange} value={inputs.username} className={errors.username ? 'border-red-500' : ''} />
                                    <ErrorInput error_message={errors.username} />
                                </div>

                                <div className="space-y-1.5 hover:drop-shadow-md">
                                    <SelectCountry
                                        placeholder='Pays de résidence'
                                        onChange={function (a): void {
                                            hydrateInputs('country', a.name)
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
                                                        hydrateInputs('gender', a ? 'femme' : '')
                                                    }}
                                                    strokeColor={mode == 'light' ? '#000000' : '#FFFFFF'}
                                                />
                                                <label
                                                    onClick={() => {
                                                        if (inputs.gender != 'femme') {
                                                            hydrateInputs('gender', 'femme')
                                                        } else {
                                                            hydrateInputs('gender', '')
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
                                                        hydrateInputs('gender', a ? 'homme' : '')
                                                    }}
                                                    strokeColor={mode == 'light' ? '#000000' : '#FFFFFF'}
                                                />
                                                <label
                                                    onClick={() => {
                                                        if (inputs.gender != 'homme') {
                                                            hydrateInputs('gender', 'homme')
                                                        } else {
                                                            hydrateInputs('gender', '')
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

                                <div className="flex flex-wrap flex-col sm:flex-row items-start gap-3">
                                    <div className="grid w-full sm:flex-1 gap-2">
                                        {/* <Label htmlFor='__type_identity_paper__'>Pièce d&apos;identité: </Label> */}
                                        <Select2
                                            placeholder="Pièce d'identité"
                                            data={IDENTITY_PAPER}
                                            onChange={function (v: any): void {
                                                hydrateInputs('type_identity_paper', v)
                                            }}
                                            value={inputs.type_identity_paper}
                                            triggerStyles='w-full'
                                        />
                                        <ErrorInput error_message={errors.type_identity_paper} />
                                    </div>
                                    <div className="grid w-full sm:flex-1 gap-2">
                                        {/* <Label htmlFor='__number_identity_paper__'>NID: </Label> */}
                                        <Input
                                            type='text'
                                            placeholder="Numero Piece d'Identite"
                                            name='number_identity_paper'
                                            id="__number_identity_paper__"
                                            onChange={onHandleChange}
                                            value={inputs.number_identity_paper}
                                        />
                                        <ErrorInput error_message={errors.number_identity_paper} />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor='__image_identity_paper__'>Photo Pièce d&apos;identité: </Label>
                                    <Input
                                        ref={imageIdentityPaperRef}
                                        type='file'
                                        accept='image/*'
                                        name='image_identity_paper'
                                        id="__image_identity_paper__"
                                        onChange={onHandleChangeImage}
                                    />
                                    <ErrorInput error_message={errors.image_identity_paper} />
                                    {imageIdentityPaperSource ? (
                                        <div className="relative">
                                            <Icon.X
                                                onClick={() => onHandleClearSource('image_identity_paper')}
                                                className='absolute top-0 right-0 hover:text-red-700'
                                            />
                                            <Image
                                                loading='eager'
                                                src={imageIdentityPaperSource}
                                                alt=''
                                                className="w-[100px] h-[100px] border rounded-lg"
                                                width={1000}
                                                height={1000}
                                                priority
                                            />
                                        </div>
                                    ) : image_identity_paper_source ? (
                                        <Image
                                            loading='eager'
                                            src={`${API_STORAGE}/${image_identity_paper_source}`}
                                            alt='Fichier'
                                            className="w-[100px] h-[100px] border rounded-lg"
                                            width={1000}
                                            height={1000}
                                            priority
                                        />
                                    ) : null}
                                </div>

                                <div className='space-y-1.5 hover:drop-shadow-md'>
                                    {/* <Label htmlFor='__email__'>Email: </Label> */}
                                    <Input
                                        type="email"
                                        placeholder='Votre adresse email'
                                        name='email'
                                        id="__email__"
                                        onChange={onHandleChange}
                                        value={inputs.email}
                                        className='hover:drop-shadow-md'
                                    />
                                    <ErrorInput error_message={errors.email} />
                                </div>

                                <div className="flex flex-wrap flex-col sm:flex-row items-start gap-3">
                                    <div className="grid w-full sm:flex-1 gap-2">
                                        <Input name='ifu_number' type='text' placeholder='N IFU' onChange={onHandleChange} value={inputs.ifu_number} className={errors.ifu_number ? 'border-red-500' : ''} />
                                        <ErrorInput error_message={errors.ifu_number} />
                                    </div>
                                    <div className="grid w-full sm:flex-1 gap-2">
                                        {/* <Label htmlFor='__phone__'>Téléphone: </Label> */}
                                        <InputPhone
                                            placeholder='téléphone'
                                            onCountryChange={a => {
                                                hydrateInputs('country_code', a.country_code)
                                                hydrateInputs('calling_code', a.phone_code)
                                                hydrateInputs('country_name', a.name)
                                            }}
                                            countryCode={inputs.country_code}
                                            name='phone'
                                            id="__phone__"
                                            onChange={onHandleChange}
                                            value={inputs.phone}
                                        />
                                        <ErrorInput error_message={error_phone} />
                                    </div>
                                </div>
                                {/* <div className='space-y-1.5 hover:drop-shadow-md'>
                                    <Input name='email' type='email' placeholder='Adresse Email *' onChange={onHandleChange} value={inputs.email} className={errors.email ? 'border-red-500' : undefined} />
                                    <ErrorInput error_message={errors.email} />
                                </div> */}

                                <div className='space-y-1.5 hover:drop-shadow-md'>
                                    <InputPassword
                                        onChange={onHandleChange}
                                        value={inputs.password}
                                        error={errors.password}
                                        lineAction={false}
                                    />
                                </div>

                                <Button disabled={loader} className='text-primary-ground'>
                                    {loader ? (
                                        <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Icon.Mail className="mr-2 h-4 w-4" />
                                    )}
                                    Enregistrer
                                </Button>
                            </div>
                        </form>

                        <p className='my-3 text-sm text-center'>
                            J&apos;ai déjà un compte. <Link href="/auth/signin" className='text-blue-600 hover:text-blue-400 hover:underline'>Je me connecte.</Link>
                        </p>

                    </div>
                </div>
            </div>
        </>
    )
}
