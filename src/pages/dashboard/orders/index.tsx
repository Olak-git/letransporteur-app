import Helper from '@/components/Helper';
import NotificationService from '@/components/NotificationService';
import SimpleFilter from '@/components/SimpleFilter';
import { Dialog } from '@/components/alert';
import Avatar2 from '@/components/avatar';
import CheckboxUi from '@/components/checkbox';
import Dropdownb from '@/components/dropdownb';
import NavThumb from '@/components/navThumb';
import Pagination from '@/components/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DEFAUT_LIMIT } from '@/helpers/constants';
import { characters_exists, format_price } from '@/helpers/funcs';
import { API_STORAGE, API_URI, catchError, request_api } from '@/helpers/request';
import { OrderType, ProfessionalType } from '@/helpers/type.models';
import useMode from '@/hooks/useMode';
import useOrders from '@/hooks/useOrders';
import useSocketServices from '@/hooks/useSocketServices';
import useUser from '@/hooks/useUser';
import { format } from 'date-fns';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function Orders() {

  const { token, user } = useUser()
  const { mode } = useMode()
  const { socketServices } = useSocketServices()
  const { increment } = useOrders()

  const [visible, setVisible] = useState(false)

  const [limit, setLimit] = useState<string | number>(DEFAUT_LIMIT)
  const [orders, setOrders] = useState<Array<OrderType>>([]);
  const [master, setMaster] = useState<Array<OrderType>>([])
  const [loading, setLoading] = useState(false)

  // For pagination
  const [loader, setLoader] = useState(false)
  const [current_page, setCurrentPage] = useState<string | null>(null)
  const [next_page_url, setNextPageUrl] = useState<string | null>(null)
  const [prev_page_url, setPrevPageUrl] = useState<string | null>(null)
  const [itemsFrom, setItemsFrom] = useState(0)
  const [itemsTo, setItemsTo] = useState(0)
  const [total, setTotal] = useState(0)

  const [stateVisible, setStateVisible] = useState<'pending'|'in progress'|'ready'|undefined>(undefined)

  const [deliveryboySelected, setDeliveryboySelected] = useState<ProfessionalType | undefined | null>(undefined)

  const openDeliveryBoyModal = (item: ProfessionalType | undefined | null) => {
    setDeliveryboySelected(item)
    setVisible(true)
  }
  const closeDeliveryBoyModal = () => {
    setVisible(false)
    setDeliveryboySelected(undefined)
  }

  const editStateVisible = (state: 'pending'|'in progress'|'ready') => {
    if(stateVisible==state) {
      setStateVisible(undefined)  
    } else {
      setStateVisible(state)
    }
  }

  const filterItem = (s: any) => {
    const text = s.target.value;
    if (s) {
      const data = master.filter(e => {
        const ctext = `${e.code}`;
        const itemData = ctext.trim()
          ? ctext.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();

        return characters_exists(textData, itemData)
      })
      setOrders([...data])
    } else {
      setOrders([...master])
    }
  }

  const getOrders = async (a: string | undefined = undefined) => {

    setLoading(true)

    const api_path = '/seller/orders';

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
        const { orders, total, current_page, next_page_url, prev_page_url, from, to } = response.data

        setOrders(orders)
        setMaster(orders)

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
    getOrders('prev')
  }

  const getNextUser = () => {
    setLoader(true)
    getOrders('next')
  }

  useEffect(() => {
    getOrders()
  }, [limit, increment])

  useEffect(() => {
    // socketServices.on('receive_order', (data: any) => {
    //   if(data.sender=='customer' && data.order?.store?.professional_id==user?.id) {
    //     getOrders()
    //     NotificationService.alert({
    //       type: 'warning',
    //       autoHide: true,
    //       title: 'Commande',
    //       message: "Vous avez reçu une nouvelle commande. Veuillez la traiter au plus vite.",
    //     })
    //   }
    // })
  }, [user])

  useEffect(()=>{
    if(stateVisible) {
      const data = master.filter(e => {
        if(stateVisible=='pending') {
          return (!e.state || e.state=='pending' || e.state=='in pending')
        }
        return characters_exists(stateVisible, e.state||'')
      })
      setOrders([...data])
    } else {
      setOrders([...master])
    }
  }, [stateVisible, master])

  // const sendMessage = (even_name: string, data: any = {}) => {
  //   socketServices.emit(even_name, { ...data })
  // }

  return (
    <>
      <Head>
        <title>LeTransporteur | My Orders</title>
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
          <div className="flex flex-row flex-wrap items-center gap-8 bg-neutral-100 min-h-[50px] py-2 px-3 rounded">
            <button type='button' className=''>
              <div className="flex flex-row items-center space-x-2">
                <CheckboxUi 
                    id='pending_state '
                    checked={stateVisible=='pending'}
                    onCheckedChange={(a: boolean) => {
                      editStateVisible('pending')
                    }} 
                />
                <label
                    onClick={()=>editStateVisible('pending')}
                    htmlFor='pending_state'
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    <address className='font-light'>En attente</address>
                </label>
              </div>
            </button>

            <button type='button' className=''>
              <div className="flex flex-row items-center space-x-2">
                <CheckboxUi 
                    id='ready_state '
                    checked={stateVisible=='ready'}
                    onCheckedChange={(a: boolean) => {
                      editStateVisible('ready')
                    }} 
                />
                <label
                    onClick={()=>editStateVisible('ready')}
                    htmlFor='ready_state'
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    <address className='font-light'>Prêt</address>
                </label>
              </div>
            </button>

            <button type='button' className=''>
              <div className="flex flex-row items-center space-x-2">
                <CheckboxUi 
                    id='inprogress_state '
                    checked={stateVisible=='in progress'}
                    onCheckedChange={(a: boolean) => {
                      editStateVisible('in progress')
                    }} 
                />
                <label
                    onClick={()=>editStateVisible('in progress')}
                    htmlFor='inprogress_state'
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    <address className='font-light'>En cours</address>
                </label>
              </div>
            </button>
          </div>
          <Table className=''>
            <TableHeader className=''>
              <TableRow>
                <TableHead className='pl-0'>N Cmde</TableHead>
                <TableHead className='pl-0'>Total F CFA</TableHead>
                <TableHead className='pl-0'>Etat</TableHead>
                <TableHead className='pl-0'>Livreur</TableHead>
                <TableHead className='pl-0'>Date</TableHead>
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
                orders.length > 0 ? (
                  orders.map((u, i) => (
                    <TBodyRender
                      key={i.toString()}
                      order={u}
                      openDeliveryBoyModal={openDeliveryBoyModal}
                    />
                  ))
                ) : (
                  <TableRow className='border-0 text-xs'>
                    <TableCell colSpan={document.querySelector('thead>tr')?.childElementCount} className="m-0 py-2">
                      <Helper content={master.length > 0 ? 'Aucune donnée disponible.' : 'Aucune commande encore disponible.'} containerClass='text-center' />
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
      </div>

      <Dialog
        visible={visible}
        close={closeDeliveryBoyModal}
        containerClass='border-[#cccccc]'
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-y-3">
          <div className="flex flex-col items-center justify-center">
            <Avatar className='h-20 w-20 sm:h-[6rem] sm:w-[6rem] mx-auto transition duration-300'>
              <AvatarImage src={`${API_STORAGE}/${deliveryboySelected?.profile_image}`} alt="@shadcn" className='' />
              <AvatarFallback className='dark:text-neutral-200'>{deliveryboySelected?.username?.slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="d-block justify-center text-center mt-1">{deliveryboySelected?.username}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row gap-x-4">
              <Icon.MapPin size={25} fill={mode == 'light' ? '#000' : '#FFF'} color={mode == 'light' ? '#fff' : '#000'} />
              <span className="font-light"><span className="dark:text-neutral-300">Du</span> <span className="font-semibold">{user?.country}</span></span>
            </div>
            <div className="flex flex-row justify-center gap-x-4">
              <Icon.PhoneIcon size={25} strokeWidth={0.01} fill={mode == 'light' ? '#000' : '#FFF'} color={mode == 'light' ? '#fff' : '#000'} />
              <span className="font-light"><span className="font-semibold">({user?.calling_code}) {user?.phone}</span></span>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}

const TBodyRender = ({
  order,
  openDeliveryBoyModal
}: {
  order: OrderType,
  openDeliveryBoyModal: (a: ProfessionalType | undefined | null) => void
}) => {

  const { token } = useUser()
  const { updateCount, count } = useOrders()

  const [loading, setLoading] = useState(false)

  const [date, setDate] = useState('')

  const onHandleChangeState = async (state: 'pending' | 'in progress' | 'ready') => {

    setLoading(true)

    const response = await request_api(`/seller/orders/${order.id}/update-state`, 'PUT', { state }, { 'Authorization': `Bearer ${token}` })

    console.log({ response });

    if (response.hasOwnProperty('success')) {
      if (response?.success) {
        order.state = state
        if(state=='pending') {
          updateCount(count+1)
        } else {
          updateCount(count-1)
        }
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

  useEffect(()=>{
    if(format(new Date(order.created_at), 'yyyy-MM-dd') == format(new Date, 'yyyy-MM-dd')) {
      setDate("Aujourd'hui à " + format(new Date(order.created_at), `hh:mm`))
    } else {

    }
  }, [order])

  return (
    <TableRow
      className='border-b text-xs group'
    >
      <TableCell className="pl-0 py-1">
        <span className="uppercase">{order.code}</span>
      </TableCell>
      <TableCell className="pl-0 py-1">
        <span className="">{format_price(order.amount)}</span>
      </TableCell>
      <TableCell className="pl-0 py-1 w-[100px]">
        <span className="">{order.state||'pending'}</span>
      </TableCell>
      <TableCell className="pl-0 py-1">
        {order.delivery_boy && (
          <figure className='flex flex-row items-center gap-x-2'>
            <Avatar2
              src={`${API_STORAGE}/${order.delivery_boy?.profile_image}`}
              fallback={order.delivery_boy?.username.slice(0, 1).toUpperCase()}
              containerStyles=''
              imageStyles=''
            />
            <Link
              href='#'
              onClick={() => openDeliveryBoyModal(order.delivery_boy)}
              className='hover:underline text-neutral-400 group-hover:text-blue-500 dark:text-muted-foreground'
            >
              <span className="text-xs font-semibold">{order.delivery_boy?.username}</span>
            </Link>
          </figure>
        )}
      </TableCell>
      <TableCell className="pl-0 py-1">
        <span className="">{date||format(new Date(order.created_at), 'dd-MM-yyyy à HH:mm')}</span>
      </TableCell>
      <TableCell className="m-0 p-1 w-[53px]">
        {loading ? (
          <Icon.Loader2 size={20} className='animate-spin text-neutral-400' />
        ) : (
          <Dropdownb
            moreOrientation='vertical'
            menu={[
              {
                // label: 'Actions', 
                items: [
                  {
                    name: 'Articles',
                    link: `/dashboard/orders/${order.id}/articles`,
                    // icon: <Icon.EyeIcon className='mr-2 h-4 w-4 text-muted-foreground' />,
                    // separator: true
                  },
                ]
              },
              {
                label: 'Etat',
                items: [
                  {
                    name: 'En attente',
                    contentClasses: `${!order.state || order.state == 'pending' ? 'text-blue-400' : ''}`,
                    action: () => onHandleChangeState('pending'),
                    icon: <Icon.ArrowRight className='mr-2 h-4 w-4 text-muted-foreground' />,
                    separator: true,
                    disabled: !order.state || order.state == 'pending',
                  },
                  {
                    name: 'En cours',
                    contentClasses: `${order.state == 'in progress' ? 'text-blue-400' : ''}`,
                    action: () => onHandleChangeState('in progress'),
                    icon: <Icon.ArrowRight className='mr-2 h-4 w-4 text-muted-foreground' />,
                    separator: true,
                    disabled: order.state == 'in progress'
                  },
                  {
                    name: 'Prêt',
                    contentClasses: `${order.state == 'ready' ? 'text-blue-400' : ''}`,
                    action: () => onHandleChangeState('ready'),
                    icon: <Icon.ArrowRight className='mr-2 h-4 w-4 text-muted-foreground' />,
                    disabled: order.state == 'ready'
                    // separator: true
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
