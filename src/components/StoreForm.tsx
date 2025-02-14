import useMode from '@/hooks/useMode'
import useThumbnail from '@/hooks/useThumbnail'
import useUser from '@/hooks/useUser'
import React, { useEffect, useRef, useState } from 'react'
import NotificationService from './NotificationService'
import { format } from 'date-fns'
import { API_STORAGE, catchError, request_api } from '@/helpers/request'
import { Label } from './ui/label'
import { Input } from './ui/input'
import ErrorInput from './error'
import CheckboxUi from './checkbox'
import Icon from './ui/icon'
import DatePicker from 'react-multi-date-picker'
import Image from 'next/image';
import SelectCountry from './SelectCountry'
import { Button } from './ui/button'
import InputPhone from './InputPhone'
import { StoreType } from '@/helpers/type.models'
import ThumbnailForm from './ThumbnailForm'
import useStore from '@/hooks/useStore'
import Helper from './Helper'
import { useRouter } from 'next/router'

export default function StoreForm({
    id
}: {
    id?: number
}) {

    const router = useRouter()
    const { token } = useUser()
    const { mode } = useMode()

    const { loading: loader, store, getStore } = useStore()

    // const [store, setStore] = useState<StoreType | null>(null)
    const [logo, setLogo] = useState<string | null>(null);
    const [rccm_image, setRccmImage] = useState<string | null>(null);
    const [ifu_image, setIfuImage] = useState<string | null>(null);
    const [sales_point_image, setSalesPointImage] = useState<string | null>(null);

    const [loading, setLoading] = useState(false)

    const [inputs, setInputs] = useState({
        profile: "seller",

        name: '',
        restaurant: 0,
        country: "Bénin",
        city: "",
        address: "",
        coords_gps: { latitude: null, longitude: null },
        creation_date: new Date,
        country_code: "BJ",
        country_name: "Bénin",
        calling_code: "229",
        phone: "",

        rccm_number: "",
        ifu_number: '',

        logo: null,
        rccm_image: null,
        ifu_image: null,
        sales_point_image: null,
    })
    const init_errors = {
        name: null,
        restaurant: null,
        country: null,
        city: null,
        address: null,
        coords_gps: null,
        creation_date: null,
        country_code: null,
        country_name: null,
        calling_code: null,
        phone: null,
        full_phone: null,
        rccm_number: null,
        ifu_number: null,
        logo: null,
        rccm_image: null,
        ifu_image: null,
        sales_point_image: null,
    }
    const [errors, setErrors] = useState({ ...init_errors })

    const ERR = (errors.phone ? errors.phone : '') + (errors.full_phone ? errors.full_phone : '')
    const error_phone = ERR || null;

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

    const onHandleSubmit = async (e: any) => {

        e.preventDefault()

        NotificationService.hide()

        setLoading(true)

        clearErrors()

        let ok = true;

        const formData = new FormData();

        formData.append('profile', inputs.profile);
        formData.append('name', inputs.name);
        // @ts-ignore
        formData.append('restaurant', (inputs.restaurant + 0));
        formData.append('country', inputs.country);
        formData.append('city', inputs.city);
        formData.append('address', inputs.address);

        // @ts-ignore
        formData.append('coords_gps[latitude]', inputs.coords_gps.latitude);
        // @ts-ignore
        formData.append('coords_gps[longitude]', inputs.coords_gps.longitude);

        formData.append('creation_date', format(inputs.creation_date, 'yyyy-MM-dd'));
        formData.append('country_code', inputs.country_code);
        formData.append('country_name', inputs.country_name);
        formData.append('calling_code', inputs.calling_code);
        formData.append('phone', inputs.phone);
        formData.append('full_phone', inputs.calling_code + '' + inputs.phone);
        formData.append('rccm_number', inputs.rccm_number);
        formData.append('ifu_number', inputs.ifu_number);

        if (inputs.logo) {
            // @ts-ignore
            formData.append('logo', inputs.logo, inputs.logo.name)
        }
        if (inputs.rccm_image) {
            // @ts-ignore
            formData.append('rccm_image', inputs.rccm_image, inputs.rccm_image.name)
        }
        if (inputs.ifu_image) {
            // @ts-ignore
            formData.append('ifu_image', inputs.ifu_image, inputs.ifu_image.name)
        }
        if (inputs.sales_point_image) {
            // @ts-ignore
            formData.append('sales_point_image', inputs.sales_point_image, inputs.sales_point_image.name)
        }

        if (id != undefined) {
            formData.append('_method', 'PUT');
        }

        const API = id == undefined ? '/seller/store/create' : `/seller/store/${id}/edit`;

        const response = await request_api(API, 'POST', formData, { Authorization: `Bearer ${token}` }, false)

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                NotificationService.alert({
                    type: 'success',
                    title: 'Succès',
                    autoHide: true,
                    message: response.status_message
                })
                if (id == undefined) {
                    setTimeout(() => {
                        router.push('/dashboard/store')
                    }, 3000);
                }
            } else {
                if (response?.errors) {
                    let txt = ''
                    const { errors: _errors } = response

                    for (let k in _errors) {
                        if (errors.hasOwnProperty(k)) {
                            hydrateErrors(k, _errors[k])
                        }
                    }

                    NotificationService.alert({
                        type: 'error',
                        title: 'Erreur',
                        autoHide: true,
                        message: 'Un ou plusieurs champs ne sont pas renseignés ou sont mal renseignés.'
                    })
                } else {

                }
            }
        } else {
            catchError(response, () => setLoading(false))
        }

        setLoading(false)
    }

    useEffect(() => {
        if (id) {
            getStore()
        }
    }, [id])

    useEffect(() => {
        if (store) {
            // @ts-ignore
            setInputs((prev) => ({
                ...prev,
                name: store.name,
                restaurant: store.restaurant,
                country: store.country,
                city: store.city,
                address: store.address,
                coords_gps: store.coords_gps,
                creation_date: new Date(store.creation_date),
                country_code: store.country_code,
                country_name: store.country_name,
                calling_code: store.calling_code,
                phone: store.phone,
                rccm_number: store.rccm_number,
                ifu_number: store.ifu_number,
            }))

            setRccmImage(store.rccm_image)
            setIfuImage(store.ifu_image)
            setLogo(store.logo)
            setSalesPointImage(store.sales_point_image)
        }
    }, [store])

    // useEffect(()=>{
    //     console.log({ restaurant: inputs.restaurant });
    // },[inputs])

    return (
        <>
            <div className="container justify-center">
                <div className="flex flex-col items-center mt-10 mb-10">
                    <div className="w-[-webkit-fill-available] md:w-fit">
                        <form
                            method='post'
                            encType="multipart/form-data"
                            onSubmit={onHandleSubmit}
                        >
                            <div className="grid w-full items-center gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor='__name__'>Nom: </Label>
                                    <Input
                                        name='name'
                                        id="__name__"
                                        onChange={onHandleChange}
                                        value={inputs.name}
                                    />
                                    <ErrorInput error_message={errors.name} />
                                </div>

                                <div className="space-y-2">
                                <div className="flex flex-wrap flex-col sm:flex-row items-start gap-3">
                                    <div className="grid w-full sm:flex-1 gap-2">
                                        <div className="flex items-center gap-x-2">
                                            <CheckboxUi
                                                id='is_restaurant'
                                                checked={inputs.restaurant ? true : false}
                                                onCheckedChange={(a: boolean) => {
                                                    hydrateInputs('restaurant', a)
                                                }}
                                                strokeColor={mode == 'light' ? '#000000' : '#FFFFFF'}
                                            />
                                            <label
                                                onClick={() => {
                                                    hydrateInputs('restaurant', !inputs.restaurant)
                                                }}
                                                htmlFor='is_restaurant'
                                                className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Restaurant ?
                                            </label>
                                        </div>
                                    </div>

                                    <div className="grid w-full sm:flex-1 gap-2">
                                        <div className="flex items-center gap-x-2">
                                            <CheckboxUi
                                                id='is_eshop'
                                                checked={inputs.restaurant ? false : true}
                                                onCheckedChange={(a: boolean) => {
                                                    hydrateInputs('restaurant', !a)
                                                }}
                                                strokeColor={mode == 'light' ? '#000000' : '#FFFFFF'}
                                            />
                                            <label
                                                onClick={() => {
                                                    hydrateInputs('restaurant', inputs.restaurant ? false : true)
                                                }}
                                                htmlFor='is_eshop'
                                                className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                E-Boutique ?
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <Helper content="Veuillez cocher la case restaurant s'il s'agit d'un restaurant." />
                                </div>

                                <div className="">
                                    <ThumbnailForm
                                        label='Logo'
                                        _id="__logo__"
                                        name="logo"
                                        source={logo}
                                        onChange={hydrateInputs}
                                        error={errors.logo}
                                    />
                                </div>

                                <div className="flex flex-wrap flex-col sm:flex-row items-start gap-3">
                                    <div className="grid w-full sm:flex-1 gap-2">
                                        <div className="flex flex-row flex-wrap items-center gap-y-2 gap-x-4">
                                            <Label htmlFor='__creation_date__'>Date de création: </Label>
                                            <DatePicker
                                                months={[
                                                    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                                                ]}
                                                weekDays={[
                                                    "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
                                                ]}
                                                editable
                                                format="DD/MM/YYYY"
                                                // placeholder='YYYY/MM/DD'
                                                placeholder='Date de création'
                                                value={inputs.creation_date}
                                                // @ts-ignore
                                                onChange={(date) => {
                                                    // @ts-ignore
                                                    hydrateInputs('creation_date', date.toDate())
                                                }}
                                                containerClassName='border border-neutral-200 h-[39px] px-2 py-2 rounded-md  dark:bg-background'
                                                inputClass='text-center bg-transparent text-sm'
                                                style={{ outlineStyle: 'none' }}
                                                zIndex={10}
                                                name='creation_date'
                                                maxDate={new Date()}
                                                id='__creation_date__'
                                            />
                                        </div>
                                        <ErrorInput error_message={errors.creation_date} />
                                    </div>
                                    <div className="grid w-full sm:flex-1 gap-2">
                                        <Label htmlFor='__phone__' className='block'>Téléphone: </Label>
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

                                <div className="flex flex-wrap flex-col sm:flex-row items-start gap-3">
                                    <div className="grid w-full sm:flex-1 gap-2">
                                        <Label htmlFor='__country__'>Pays: </Label>
                                        <SelectCountry
                                            onChange={function (a): void {
                                                hydrateInputs('country', a.name)
                                            }}
                                            value={inputs.country}
                                        />
                                        <ErrorInput error_message={errors.country} />
                                    </div>
                                    <div className="grid w-full sm:flex-1 gap-2">
                                        <Label htmlFor='__phone__'>Ville: </Label>
                                        <Input
                                            name='city'
                                            id="__city__"
                                            placeholder='Ville/Région'
                                            onChange={onHandleChange}
                                            value={inputs.city}
                                        />
                                        <ErrorInput error_message={errors.city} />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor='__address__'>Adresse: </Label>
                                    <Input
                                        name='address'
                                        id="__address__"
                                        onChange={onHandleChange}
                                        value={inputs.address}
                                    />
                                    <ErrorInput error_message={errors.address} />
                                </div>

                                <div className="">
                                    <ThumbnailForm
                                        label='Photo point de vente'
                                        _id="__sales_point_image__"
                                        name="sales_point_image"
                                        source={sales_point_image}
                                        onChange={hydrateInputs}
                                        error={errors.sales_point_image}
                                    />
                                </div>

                                <div className="flex flex-wrap flex-col sm:flex-row items-start gap-3">
                                    <div className="grid w-full sm:flex-1 gap-2">
                                        <Label htmlFor='__nifu__'>N IFU: </Label>
                                        <Input
                                            name='ifu_number'
                                            id="__nifu__"
                                            // placeholder='Ville/Région'
                                            onChange={onHandleChange}
                                            value={inputs.ifu_number}
                                        />
                                        <ErrorInput error_message={errors.ifu_number} />
                                    </div>
                                    {/* <ThumbnailForm
                                        label='Pièce'
                                        _id="__ifuimage__"
                                        name="ifu_image"
                                        source={ifu_image}
                                        onChange={hydrateInputs}
                                        error={errors.ifu_image}
                                        className='w-full sm:flex-1'
                                    /> */}
                                </div>

                                <div className="flex flex-wrap flex-col sm:flex-row items-start gap-3">
                                    <div className="grid w-full sm:flex-1 gap-2">
                                        <Label htmlFor='__nrccm__'>N RCCM: </Label>
                                        <Input
                                            name='rccm_number'
                                            id="__nrccm__"
                                            // placeholder=''
                                            onChange={onHandleChange}
                                            value={inputs.rccm_number}
                                        />
                                        <ErrorInput error_message={errors.rccm_number} />
                                    </div>
                                </div>

                                {/* <div className="">
                                    <Label htmlFor=''>Position géographique </Label>
                                    <div className="w-full h-[300px] border rounded"></div>
                                    <Helper content="Donnez la position géographique de votre boutique pour permettre aux livreurs de vite la retrouver." />
                                </div> */}

                                <div className="mt-2">
                                    <Button
                                        type='submit'
                                        disabled={loading || loader}
                                    >
                                        {loading && (
                                            <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Enregistrer
                                    </Button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
