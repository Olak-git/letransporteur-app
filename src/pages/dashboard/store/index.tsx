import Helper from '@/components/Helper';
import Avatar2 from '@/components/avatar';
import NavThumb from '@/components/navThumb';
import Icon from '@/components/ui/icon';
import { format_address } from '@/helpers/funcs';
import { API_STORAGE, catchError, request_api } from '@/helpers/request';
import { StoreType } from '@/helpers/type.models';
import useMode from '@/hooks/useMode';
import useStore from '@/hooks/useStore';
import useUser from '@/hooks/useUser';
import { format } from 'date-fns';
import Head from 'next/head';
import Link from 'next/link';
import { deleteCookie, hasCookie, setCookie, getCookie } from 'cookies-next'
import React, { useEffect, useState } from 'react'

export default function Index() {

  const { token } = useUser();
  const { mode } = useMode()
  const { loading, store, getStore } = useStore()

  const VALIDATED = getCookie('store_validated')
  const [store_validated, setStoreValidated] = useState(false)

  useEffect(() => {
    getStore()
  }, [])

  useEffect(()=>{
    if(typeof VALIDATED == 'string') {
      setStoreValidated(JSON.parse(VALIDATED))
    }
  },[VALIDATED])

  return (
    <>
      <Head>
        <title>LeTransporteur | My Store</title>
      </Head>

      <div>
        <NavThumb
          data={[
            {
              trigger: 'Tableau de bord',
              link: '/dashboard',
            },
            {
              trigger: 'Boutique',
              link: '#',
              disabled: true
            }
          ]}
        />
        {loading ? (
          <Helper content='Chargement des données en cours...' />
        ) : (
          !store ? (
            <div className="space-y-3">
              <div className="text-center font-extralight">Vous n&apos;avez pas de boutique en ligne actuellement.</div>
              <div className="text-center">
                <Link href="/dashboard/store/create" className='inline-block border border-primary-ground p-3 rounded-lg hover:bg-primary-ground hover:text-white'>
                  <span className="">Créer votre boutique</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="">
              <div className="flex flex-row justify-between items-end mb-2">
                <Link href="/dashboard/articles/create" className='ml-auto border flex flex-row items-center py-1 px-2 bg-primary-ground text-white font-thin rounded border border-primary-ground hover:bg-white hover:text-primary-ground'>
                  <Icon.PlusIcon size={20} />
                  Article
                </Link>
              </div>
              <div 
                className="flex h-[200px] md:h-[250px] lg:h-[300px] xl:h-[400px] bg-black rounded-lg mb-[3rem] transition relative bg-scroll bg-no-repeat bg-center bg-auto" 
                style={{ backgroundImage: `url(${API_STORAGE}/${store.sales_point_image})` }}
              >
                <Link href={`/dashboard/store/${store.id}/edit`} className='absolute top-4 right-4 rounded-full p-2 bg-white'>
                  <Icon.PencilLineIcon />
                </Link>
                <div className="absolute bottom-3 right-4">
                  <Link href="/dashboard/articles" className='text-sm border py-1 px-2 bg-primary-ground text-white font-thin hover:font-semibold rounded border border-primary-ground hover:bg-white hover:text-primary-ground'>
                    Mes Articles
                  </Link>
                </div>
                <Avatar2 
                  src={`${API_STORAGE}/${store.logo}`}
                  fallback={store.name.slice(0,1).toUpperCase()}
                  containerStyles='w-[120px] h-[120px] mt-auto translate-x-[20px] translate-y-[45px] border-[4px] border-white dark:border-background bg-neutral-100'
                />
              </div>
              <div className="space-y-1">
                <div className="flex flex-row gap-x-4">
                  <Icon.Store size={25} fill={mode == 'light' ? '#000' : '#FFF'} color={mode == 'light' ? '#fff' : '#000'} />
                  <div className="flex flex-row items-center">
                    <span className="font-semibold">Nom </span>
                    <Icon.Dot />
                    <span className="font-light dark:text-neutral-300">{store?.name}</span>
                  </div>
                </div>
                <div className="flex flex-row gap-x-4">
                  <Icon.MapPin size={25} fill={mode == 'light' ? '#000' : '#FFF'} color={mode == 'light' ? '#fff' : '#000'} />
                  <span className="font-light"><span className="dark:text-neutral-300">Du</span> <span className="font-semibold">{format_address(store?.address, store?.city, store?.country)}</span></span>
                </div>
                {store.restaurant && (
                  <div className="flex flex-row gap-x-4">
                    <Icon.Pizza size={25} fill={mode == 'light' ? '#000' : '#FFF'} color={mode == 'light' ? '#fff' : '#000'} />
                    <span className="font-light dark:text-neutral-300">Restaurant</span>
                  </div>
                )}

                <div className="flex flex-row items-center gap-x-4">
                  <Icon.CalendarDays size={25} strokeWidth={1} />
                  <div className="">
                      <span className="block font-semibold">Date de création</span>
                      {/* @ts-ignore */}
                      <span className="block font-light dark:text-neutral-300">{format(new Date(store.creation_date || null), 'dd-MM-yyyy')}</span>
                  </div>
                </div>

                <div className="flex flex-row gap-x-4">
                  <Icon.PhoneIcon size={25} strokeWidth={0.01} fill={mode == 'light' ? '#000' : '#FFF'} color={mode == 'light' ? '#fff' : '#000'} />
                  <span className="font-light"><span className="dark:text-neutral-300">Sur</span> <span className="font-semibold">({store.calling_code}) {store.phone}</span></span>
                </div>

                <div className="">
                  <span className="font-light dark:text-neutral-300">IFU: </span>
                  <span className="font-semibold">{store.ifu_number}</span>
                </div>

                <div className="">
                  <span className="font-light dark:text-neutral-300">RCCM: </span>
                  <span className="font-semibold">{store.rccm_number}</span>
                </div>


              </div>

              {(!VALIDATED || !store_validated) && (
                <div className={`border ${store.state_verification=='accepted'?'border-blue-400 bg-blue-400/10':(store.state_verification=='in progress'?'border-amber-400 bg-amber-400/10':(store.state_verification=='pending'?'border-gray-400 bg-gray-400/10':(store.state_verification=='refused'?'border-red-400 bg-red-400/10':'')))} rounded-md px-2 py-4 flex flex-wrap mt-5`}>
                  <div className='flex flex-row flex-wrap items-center w-full'>
                    <Icon.InfoIcon className={`mr-3 ${store.state_verification=='accepted'?'text-blue-500':(store.state_verification=='in progress'?'text-amber-500':(store.state_verification=='pending'?'text-gray-500':(store.state_verification=='refused'?'text-red-500':'')))}`} />
                    {store.state_verification=='accepted' ? (
                      <p className={`text-blue-500 flex-1`} style={{ fontFamily: 'sans-serif, serif', lineHeight: 'normal' }}>Suite à une vérification des données fournies relatives à l&apos;existance de votre boutique, il a été retenu que votre boutique est conforme aux exigences en vigueur et est donc validée.</p>  
                    ) : store.state_verification=='in progress' ? (
                      <p className={`text-amber-500 flex-1`} style={{ fontFamily: 'sans-serif, serif', lineHeight: 'normal' }}>Nous vérifions la conformité des justificatifs/pièces fourni(e)s. Cela pourrait durer quelques jours. Merci de patienter.</p>
                    ) : store.state_verification=='pending' ? (
                      <p className={`text-gray-500 flex-1`} style={{ fontFamily: 'sans-serif, serif', lineHeight: 'normal' }}>En attente de vérification (confirmation).</p>
                    ) : store.state_verification=='refused' ? (
                      <p className={`text-red-500 flex-1 font-thin`} style={{ fontFamily: 'sans-serif, serif', lineHeight: 'normal' }}>Suite à une vérification des données fournies relatives à l&apos;existance de votre boutique, il a été retenu que votre boutique ne répond pas aux exigences en vigueur et ne sera donc pas validée jusqu&apos;à ce que vous fournissez de nouvelles preuves vraies et conformes.</p>
                    ) : null}
                  </div>
                  {store.state_verification=='accepted' && (
                    <button 
                      type='button' 
                      onClick={(e)=>{
                        setStoreValidated(true)
                        setCookie('store_validated', true)
                      }}
                      className={`border ${store.state_verification=='accepted'?'border-blue-500 text-blue-500':(store.state_verification=='in progress'?'border-amber-500 text-amber-500':(store.state_verification=='pending'?'border-gray-500 text-gray-500':(store.state_verification=='refused'?'border-red-500 text-red-500':'')))} ml-auto rounded-full text-sm min-w-[80px] min-h-[30px]`} style={{ fontFamily: 'serif', lineHeight: 'normal' }}
                    >OK</button>
                  )}
                </div>
              )}

            </div>
          )
        )}
      </div>
    </>
  )
}
