import NavThumb from '@/components/navThumb'
import Icon from '@/components/ui/icon'
import Head from 'next/head'
import Link from 'next/link'
import ArticlesList from '@/components/ArticlesList'
import React from 'react'

export default function Articles() {
  return (
    <>
      <Head>
        <title>LeTransporteur</title>
      </Head>
      <div className="">
        <NavThumb
          data={[
            {
              trigger: 'Tableau de bord',
              link: '/dashboard'
            },
            {
              trigger: 'Boutique',
              link: '/dashboard/store'
            },
            {
              trigger: 'Articles',
              link: '#',
              disabled: true
            }
          ]}
        />
        <div className="flex flex-row justify-between items-end mb-2">
          {/* <div className=''>Personals - Delivery Boys</div> */}
          <Link href="/dashboard/articles/create" className='ml-auto border flex flex-row items-center py-1 px-2 bg-primary-ground text-white font-thin rounded border border-primary-ground hover:bg-white hover:text-primary-ground'>
            <Icon.PlusIcon size={20} />
            Ajouter
          </Link>
        </div>

        <ArticlesList />
      </div>
    </>
  )
}
