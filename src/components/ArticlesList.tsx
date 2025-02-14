import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import { API_STORAGE, API_URI, catchError, request_api } from '@/helpers/request';
import NotificationService from './NotificationService';
import Helper from './Helper';
import Icon from './ui/icon';
import Dropdownb from './dropdownb';
import Avatar2 from './avatar';
import Link from 'next/link';
import { characters_exists, format_price } from '@/helpers/funcs';
import { ArticleType } from '@/helpers/type.models';
import Pagination from './pagination';
import SimpleFilter from './SimpleFilter';
import { DEFAUT_LIMIT } from '@/helpers/constants';

export default function ArticlesList() {

    const { token } = useUser()
    const [limit, setLimit] = useState<string | number>(DEFAUT_LIMIT)
    const [articles, setArticles] = useState<Array<ArticleType>>([])
    const [master, setMaster] = useState<Array<ArticleType>>([])
    const [loading, setLoading] = useState(false)

    // For pagination
    const [loader, setLoader] = useState(false)
    const [current_page, setCurrentPage] = useState<string | null>(null)
    const [next_page_url, setNextPageUrl] = useState<string | null>(null)
    const [prev_page_url, setPrevPageUrl] = useState<string | null>(null)
    const [itemsFrom, setItemsFrom] = useState(0)
    const [itemsTo, setItemsTo] = useState(0)
    const [total, setTotal] = useState(0)

    const filterItem = (s: any) => {
        const text = s.target.value;
        if (s) {
            const data = master.filter(e => {
                const ctext = `${e.name} ${e.category_name}`;
                const itemData = ctext.trim()
                    ? ctext.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();

                return characters_exists(textData, itemData)
            })
            setArticles([...data])
        } else {
            setArticles([...master])
        }
    }

    const refresh = (id: number, message: string) => {
        const DT = articles.filter(a => a.id !== id)
        const DATA = master.filter(a => a.id !== id)
        setArticles(DT)
        setMaster(DATA)
        NotificationService.alert({
            type: 'success',
            autoHide: true,
            title: 'Success',
            message: message
        });
        setTotal(total - 1)
        setItemsTo(itemsTo - 1)
    }

    const addArticle = (article: ArticleType) => {
        const DATA = [...articles]
        const DATA1 = [...master]
        DATA.push(article)
        DATA1.push(article)
        setArticles(DATA)
        setMaster(DATA1)
        setTotal(total + 1)
        setItemsTo(itemsTo + 1)
    }

    const getArticles = async (a: string | undefined = undefined) => {

        setLoading(true)

        const api_path = '/seller/store/articles';

        let api = !a ?
            api_path :
            a == 'prev' ?
                (prev_page_url ?
                    prev_page_url.replace(API_URI + '/fr', '') : api_path
                ) :
                a == 'next' ?
                    (next_page_url ?
                        next_page_url.replace(API_URI + '/fr', '') : api_path
                    ) :
                    a == 'current_page' ?
                        `${api_path}?page=${current_page}` : api_path

        api += api.includes('?') ? `&limit=${limit}` : `?limit=${limit}`

        const response = await request_api(api, 'GET', null, { 'Authorization': `Bearer ${token}` })

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                const { articles, total, current_page, next_page_url, prev_page_url, from, to } = response.data

                setArticles(articles)
                setMaster(articles)

                setTotal(total)
                setCurrentPage(current_page)
                setNextPageUrl(next_page_url)
                setPrevPageUrl(prev_page_url)
                setItemsFrom(from)
                setItemsTo(to)
            } else {
                if (response?.errors) {
                    const { errors: _errors } = response
                } else {

                }
            }
        } else {
            catchError(response, () => {
                setLoading(false)
                setLoader(false)
            })
        }

        setLoading(false)
        setLoader(false)
    }

    const getPreviousUser = () => {
        setLoader(true)
        getArticles('prev')
    }

    const getNextUser = () => {
        setLoader(true)
        getArticles('next')
    }

    useEffect(() => {
        getArticles()
    }, [limit])

    return (
        <div className=''>
            <SimpleFilter
                // sheetRef={sheetRef} 
                onChangeLimit={(a) => setLimit(a)}
                onChange={filterItem}
            />
            <Table className=''>
                <TableHeader className=''>
                    <TableRow>
                        <TableHead></TableHead>
                        {/* <TableHead className='pl-0'></TableHead> */}
                        <TableHead className='pl-0'>Catégorie</TableHead>
                        <TableHead className='pl-0'>PU (FCFA)</TableHead>
                        <TableHead className='pl-0'>En stock</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className=''>
                    {loading ? (
                        <TableRow className='border-0 text-xs'>
                            <TableCell colSpan={document.querySelector('thead>tr')?.childElementCount} className="py-2">
                                <div className="flex">
                                    <Helper content="Chargement en cours..." loader containerClass='mx-auto' />
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        articles.length > 0 ? (
                            articles.map((u, i) => (
                                <TBodyRender
                                    key={i.toString()}
                                    article={u}
                                    refresh={refresh}
                                    addArticle={addArticle}
                                />
                            ))
                        ) : (
                            <TableRow className='border-0 text-xs'>
                                <TableCell colSpan={document.querySelector('thead>tr')?.childElementCount} className="m-0 py-2">
                                    <Helper content='Aucune donnée trouvée.' containerClass='text-center' />
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>

            <Pagination
                totalItems={total}
                nbItems={itemsTo}
                prev_page_url={prev_page_url}
                next_page_url={next_page_url}
                previousAction={getPreviousUser}
                nextAction={getNextUser}
                loader={loader}
                useIcon
            />
        </div>
    )
}

const TBodyRender = ({
    article,
    refresh,
    addArticle
}: {
    article: any,
    refresh: (a: number, b: string) => void,
    addArticle: (a: ArticleType) => void
}) => {

    const router = useRouter()

    const { token } = useUser()

    const [trash, setTrash] = useState(false)
    const [loading, setLoading] = useState(false)

    const onHandlePress = (e: React.MouseEvent, url: string) => {
        e.preventDefault()
        router.push(url)
    }

    const onSubmitTrash = async () => {

        setTrash(true)

        const response = await request_api(`/seller/store/articles/${article.id}/delete`, 'DELETE', null, { 'Authorization': `Bearer ${token}` })

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                refresh(article.id, response.status_message)
            } else {
                if (response?.errors) {
                    const { errors } = response
                    NotificationService.alert({
                        type: 'error',
                        title: 'Error',
                        message: errors
                    })
                } else if (response?.status_message) {
                    NotificationService.alert({
                        type: 'error',
                        title: 'Error',
                        message: response?.status_message
                    })
                } else {
                    NotificationService.alert({
                        type: 'error',
                        title: 'Error',
                        message: 'Error Undefined'
                    })
                }
            }
        } else {
            catchError(response, () => setTrash(false))
        }
        setTrash(false)
    }

    const onHandlePressDuplicate = async () => {

        setLoading(true)

        const response = await request_api(`/seller/store/articles/${article.id}/duplicate`, 'POST', null, { 'Authorization': `Bearer ${token}` })

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                // refresh(article.id, response.status_message)
                addArticle(response.data.article)
            } else {
                if (response?.errors) {
                    const { errors } = response
                    NotificationService.alert({
                        type: 'error',
                        title: 'Error',
                        message: errors
                    })
                } else if (response?.status_message) {
                    NotificationService.alert({
                        type: 'error',
                        title: 'Error',
                        message: response?.status_message
                    })
                } else {
                    NotificationService.alert({
                        type: 'error',
                        title: 'Error',
                        message: 'Error Undefined'
                    })
                }
            }
        } else {
            catchError(response, () => setLoading(false))
        }

        setLoading(false)
    }

    return (
        <TableRow
            className='border-b text-xs group'
        >
            <TableCell className="pl-0 py-1">
                <figure className='flex flex-row items-center gap-x-2'>
                    <Avatar2
                        src={`${API_STORAGE}/${article.image}`}
                        fallback={article.name.slice(0, 1).toUpperCase()}
                        containerStyles=''
                        imageStyles=''
                    />
                    <Link
                        href={`/dashboard/articles/${article.id}`}
                        className='hover:underline text-neutral-400 group-hover:text-blue-500 dark:text-muted-foreground'
                    >
                        <span className="text-xs font-semibold">{article.name}</span>
                    </Link>
                </figure>
            </TableCell>
            {/* <TableCell className="pl-0 py-1">
                <span className="uppercase">{article.name}</span>
            </TableCell> */}
            <TableCell className="pl-0 py-1">
                <span className="">{article.category_name}</span>
            </TableCell>
            <TableCell className="pl-0 py-1">
                <span className="">{format_price(article.price)}</span>
            </TableCell>
            <TableCell className="pl-0 py-1">
                <span className="">{article.stock||'#'}</span>
            </TableCell>
            <TableCell className="m-0 p-1 w-[53px]">
                {(trash || loading) ? (
                    <Icon.Loader2 size={20} className='animate-spin text-neutral-400' />
                ) : (
                    <Dropdownb
                        moreOrientation='vertical'
                        menu={[
                            {
                                // label: 'Actions', 
                                items: [
                                    {
                                        name: 'Afficher',
                                        link: `/dashboard/articles/${article.id}`,
                                        icon: <Icon.EyeIcon className='mr-2 h-4 w-4 text-muted-foreground' />,
                                        separator: true
                                    },
                                    {
                                        name: 'Éditer',
                                        link: `/dashboard/articles/${article.id}/edit`,
                                        icon: <Icon.Edit3Icon className='mr-2 h-4 w-4 text-blue-700' />,
                                        separator: true,
                                    },
                                    {
                                        name: 'Dupliquer',
                                        action: () => onHandlePressDuplicate(),
                                        icon: <Icon.Edit3Icon className='mr-2 h-4 w-4 text-blue-700' />,
                                        separator: true,
                                    },
                                    {
                                        name: 'Supprimer',
                                        action: () => onSubmitTrash(),
                                        icon: <Icon.X className='mr-2 h-4 w-4 text-red-700' />,
                                    }
                                ]
                            }
                        ]}
                    />
                )}
            </TableCell>
        </TableRow>
    )
}

