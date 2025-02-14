import Helper from '@/components/Helper';
import NotificationService from '@/components/NotificationService';
import SimpleFilter from '@/components/SimpleFilter';
import Avatar2 from '@/components/avatar';
import NavThumb from '@/components/navThumb';
import Icon from '@/components/ui/icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DEFAUT_LIMIT } from '@/helpers/constants';
import { characters_exists, format_price } from '@/helpers/funcs';
import { API_STORAGE, API_URI, catchError, request_api } from '@/helpers/request';
import { CartType, OrderType } from '@/helpers/type.models';
import useUser from '@/hooks/useUser';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function Articles({id}: {id: number}) {

    const { token, user } = useUser()

    const [limit, setLimit] = useState<string | number>(DEFAUT_LIMIT)
    const [carts, setCarts] = useState<Array<CartType>>([]);
    const [master, setMaster] = useState<Array<CartType>>([])
    const [loading, setLoading] = useState(false)

    const filterItem = (s: any) => {
        const text = s.target.value;
        if (s) {
            const data = master.filter(e => {
                const ctext = `${e.article_name}`;
                const itemData = ctext.trim()
                    ? ctext.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();

                return characters_exists(textData, itemData)
            })
            setCarts([...data])
        } else {
            setCarts([...master])
        }
    }

    const getArticles = async (a: string | undefined = undefined) => {

        setLoading(true)

        const response = await request_api(`/seller/orders/${id}/carts`, 'GET', null, { 'Authorization': `Bearer ${token}` })

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                const { carts } = response.data
                setCarts(carts)
                setMaster(carts)
            } else {
                if (response?.errors) {
                    const { errors: _errors } = response
                } else {

                }
            }
        } else {
            catchError(response, () => {
                setLoading(false)
            })
        }

        setLoading(false)
    }

    useEffect(() => {
        if(id) {
            getArticles()
        }
    }, [id])

    return (
        <>
            <Head>
                <title>LeTransporteur | Articles Cart</title>
            </Head>

            <div className='relative'>
                <NavThumb
                    data={[
                        {
                            trigger: 'Tableau de bord',
                            link: '/dashboard',
                        },
                        {
                            trigger: 'Commandes',
                            link: '/dashboard/orders',
                        },
                        {
                            trigger: 'Panier',
                            link: '#',
                            disabled: true
                        }
                    ]}
                />

                <div className=''>
                    <SimpleFilter
                        // sheetRef={sheetRef} 
                        onChangeLimit={(a) => setLimit(a)}
                        onChange={filterItem}
                    />
                    <Table className=''>
                        <TableHeader className=''>
                            <TableRow>
                                <TableHead className='pl-0'>Article</TableHead>
                                <TableHead className='pl-0'>Prix F CFA</TableHead>
                                <TableHead className='pl-0'>Quantité</TableHead>
                                <TableHead className='pl-0'>Prix Total F CFA</TableHead>
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
                                carts.length > 0 ? (
                                    carts.map((u, i) => (
                                        <TBodyRender
                                            key={i.toString()}
                                            cart={u}
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
                </div>
            </div>
        </>
    )
}

const TBodyRender = ({
    cart
}: {
    cart: CartType
}) => {

    return (
        <TableRow
            className='border-b text-xs group'
        >
            <TableCell className="pl-0 py-1">
              <figure className='flex flex-row items-center gap-x-2'>
                  <Avatar2
                      src={`${API_STORAGE}/${cart.article_image}`}
                      fallback={cart.article_name.slice(0, 1).toUpperCase()}
                      containerStyles=''
                      imageStyles=''
                  />
                  <Link
                      href={`/dashboard/articles/${cart.article_id}`}
                      className='hover:underline text-neutral-400 group-hover:text-blue-500 dark:text-muted-foreground'
                  >
                      <span className="text-xs font-semibold">{cart.article_name}</span>
                  </Link>
              </figure>
          </TableCell>
            <TableCell className="pl-0 py-1">
                <span className="">{format_price(cart.unit_price_ht)}</span>
            </TableCell>
            <TableCell className="pl-0 py-1">
                <span className="">{cart.quantity}</span>
            </TableCell>
            <TableCell className="pl-0 py-1">
                <span className="">{format_price(cart.total_price_ttc)}</span>
            </TableCell>
        </TableRow>
    )
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}

export async function getStaticProps(context: any) {
    const { id } = context.params
    return {
        props: {
            id
        }
    }
}
