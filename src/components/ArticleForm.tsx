import { catchError, request_api } from '@/helpers/request'
import { ArticleType } from '@/helpers/type.models'
import useMode from '@/hooks/useMode'
import useUser from '@/hooks/useUser'
import React, { useEffect, useState } from 'react'
import NotificationService from './NotificationService'
import { Label } from './ui/label'
import { Input } from './ui/input'
import ErrorInput from './error'
import { isNumber } from '@/helpers/funcs'
import ThumbnailForm from './ThumbnailForm'
import { Textarea } from './ui/textarea'
import useStore from '@/hooks/useStore'
import { Button } from './ui/button'
import Icon from './ui/icon'
import Select2 from './select2'
import useCategories from '@/hooks/useCategories'

export default function ArticleForm({
    id
}: {
    id?: number
}) {

    const { token } = useUser()
    const { mode } = useMode()
    const { getStore, store, loading: loader } = useStore()
    const { getCategories, categories } = useCategories()

    const [article, setArticle] = useState<ArticleType | null>(null)
    const [loading, setLoading] = useState(false)

    const [image, setImage] = useState<string | null>(null)
    const [image2, setImage2] = useState<string | null>(null)
    const [image3, setImage3] = useState<string | null>(null)
    const [image4, setImage4] = useState<string | null>(null)

    const [inputs, setInputs] = useState({
        name: '',
        about: '',
        price: 0,
        stock: '',
        image: null,
        image2: null,
        image3: null,
        image4: null,
        category: '',
    })
    const init_errors = {
        name: null,
        about: null,
        price: null,
        stock: null,
        image: null,
        image2: null,
        image3: null,
        image4: null,
        category: null
    }
    const [errors, setErrors] = useState({ ...init_errors })

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

        formData.append('name', inputs.name);
        formData.append('about', inputs.about);
        // @ts-ignore
        formData.append('price', inputs.price);
        formData.append('stock', inputs.stock);
        // @ts-ignore
        formData.append('category', inputs.category);
        if (inputs.image) {
            // @ts-ignore
            formData.append('image', inputs.image, inputs.image.name)
        }
        if (inputs.image2) {
            // @ts-ignore
            formData.append('image2', inputs.image2, inputs.image2.name)
        }
        if (inputs.image3) {
            // @ts-ignore
            formData.append('image3', inputs.image3, inputs.image3.name)
        }
        if (inputs.image4) {
            // @ts-ignore
            formData.append('image4', inputs.image4, inputs.image4.name)
        }

        if (id != undefined) {
            formData.append('_method', 'PUT');
        }

        const API = id == undefined ? `/seller/store/${store?.id}/articles/create` : `/seller/store/articles/${id}/edit`;

        const response = await request_api(API, 'POST', formData, { Authorization: `Bearer ${token}` }, false)

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                NotificationService.alert({
                    type: 'success',
                    title: 'Succès',
                    message: response.status_message
                })
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

    const getArticle = async () => {

        setLoading(true)

        const response = await request_api(`/seller/store/articles/${id}`, 'GET', null, { 'Authorization': `Bearer ${token}` })

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                setArticle(response.data.article)
            } else {
                if (response?.errors) {
                    const { errors: _errors } = response
                } else {

                }
            }
        } else {
            catchError(response, () => setLoading(false))
        }

        setLoading(false)
    }

    useEffect(()=>{
        getStore()
        getCategories()
    },[])

    useEffect(() => {
        if (id) {
            getArticle()
        }
    }, [id])

    useEffect(()=>{
        if(article) {
            // @ts-ignore
            setInputs((prev) => ({
                ...prev,
                name: article.name,
                about: article.about,
                price: article.price,
                stock: article.stock||'',
            }))
            setImage(article.image)
            setImage2(article.image2)
            setImage3(article.image3)
            setImage4(article.image4)
        }
    }, [article])

    return (
        <div className="container justify-center">
            <div className="flex flex-col items-center mt-10 mb-10">
                <div className="w-[-webkit-fill-available] md:w-fit">
                    <form
                        method='post'
                        encType="multipart/form-data"
                        onSubmit={onHandleSubmit}
                    >
                        <div className="grid w-full items-center gap-4">

                            <div className="flex flex-wrap flex-col sm:flex-row items-start gap-3">
                                <div className="grid w-full sm:flex-1 gap-2">
                                    <Label htmlFor='__name__'>Nom: </Label>
                                    <Input
                                        name='name'
                                        placeholder="Nom de l'article"
                                        id="__name__"
                                        onChange={onHandleChange}
                                        value={inputs.name}
                                    />
                                    <ErrorInput error_message={errors.name} />
                                </div>
                                {(!loader && !store?.restaurant) && (
                                    <div className="grid w-full sm:flex-1 gap-2">
                                        <Label htmlFor='__price__'>Catégorie: </Label>
                                        <Select2 
                                            placeholder={'Select Category'} 
                                            data={[{label: 'Select Category', value: ' '}, ...categories.map(cat => ({label: cat.trigger, value: cat.id}))]} 
                                            onChange={function (v: any): void {
                                                if(!v.trim()) {
                                                    hydrateInputs('category', '')
                                                } else {
                                                    hydrateInputs('category', v)
                                                }
                                            }}
                                            value={inputs.category}
                                            triggerStyles='w-full'
                                        />
                                        <ErrorInput error_message={errors.category} />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap flex-col sm:flex-row items-start gap-3">
                                <div className="grid w-full sm:flex-1 gap-2">
                                    <Label htmlFor='__stock__'>Stock: </Label>
                                    <Input
                                        name='stock'
                                        placeholder="Stock disponible"
                                        id="__stock__"
                                        // placeholder='Ville/Région'
                                        value={inputs.stock}
                                        onInput={isNumber}
                                        onChange={onHandleChange}
                                    />
                                    <ErrorInput error_message={errors.stock} />
                                </div>
                                <div className="grid w-full sm:flex-1 gap-2">
                                    <Label htmlFor='__price__'>Prix: </Label>
                                    <Input
                                        name='price'
                                        id="__price__"
                                        // placeholder='Ville/Région'
                                        value={inputs.price}
                                        onInput={isNumber}
                                        onChange={onHandleChange}
                                    />
                                    <ErrorInput error_message={errors.price} />
                                </div>
                            </div>

                            <div className="">
                                <ThumbnailForm
                                    label='image'
                                    _id="__image__"
                                    name="image"
                                    source={image}
                                    onChange={hydrateInputs}
                                    error={errors.image}
                                />
                            </div>

                            <div className="flex flex-wrap flex-col sm:flex-row items-start gap-3">
                                <ThumbnailForm
                                    label='image2'
                                    _id="__image2__"
                                    name="image2"
                                    source={image2}
                                    onChange={hydrateInputs}
                                    error={errors.image2}
                                    optional
                                    className='w-full sm:flex-1'
                                />
                                <ThumbnailForm
                                    label='image3'
                                    _id="__image3__"
                                    name="image3"
                                    source={image4}
                                    onChange={hydrateInputs}
                                    error={errors.image3}
                                    optional
                                    className='w-full sm:flex-1'
                                />
                            </div>

                            <div className="">
                                <ThumbnailForm
                                    label='image4'
                                    _id="__image4__"
                                    name="image4"
                                    source={image4}
                                    onChange={hydrateInputs}
                                    error={errors.image4}
                                    optional
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor='__about__'>Description: </Label>
                                <Textarea 
                                    name='about'
                                    id="__about__"
                                    placeholder='Les détails sur le produit'
                                    value={inputs.about}
                                    onChange={onHandleChange}
                                />
                                <ErrorInput error_message={errors.about} />
                            </div>

                            <div className="mt-2">
                                <Button
                                    type='submit'
                                    disabled={loading||loader}
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
    )
}
// Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, eum natus rem molestiae suscipit officiis. Molestiae eveniet ex libero et tenetur, ratione minima fuga, eaque, vero nobis autem itaque obcaecati!