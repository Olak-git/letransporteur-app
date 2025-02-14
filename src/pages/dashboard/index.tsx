import NavThumb from '@/components/navThumb'
import { Separator } from '@/components/ui/separator'
import useUser from '@/hooks/useUser'
import { format } from 'date-fns'
import Head from 'next/head'
import React from 'react'

export default function Index() {
  const { user, token } = useUser()

  return (
    <>
      <Head>
        <title>LeTransporteur | Dashboard</title>
      </Head>

      <div className=''>
        <NavThumb
          data={[
            {
              trigger: 'Tableau de bord',
              link: '#',
              disabled: true
            },
          ]}
        />
        <div>
          {(user && format(new Date(user?.created_at), 'yyyy-MM-dd')!=format(new Date, 'yyyy-MM-dd')) && (
            <p className="font-extralight text-muted-foreground text-lg">C&apos;est le retour,</p>
          )}
          <h2 className='text-lg font-light'>Bienvenue {user?.gender=='homme' ? 'M.' : 'Mme.'} <span className="font-extrabold text-xl">{user?.username}</span></h2>
          <Separator className='my-2' />
        </div>
      </div>
    </>
  )
}
