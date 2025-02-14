import React, { useEffect } from 'react'
import useMode from '@/hooks/useMode'
import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'
import Menubar from './Menubar'
import useShortNav from '@/hooks/useShortNav'

export default function FullContainer(props: any) {

  const router = useRouter()
  const { mode } = useMode()
  const { user } = useUser();
  const { short } = useShortNav()

  const class_name = `pr-[10px] pl-[10px] ${short?'sm:pl-[170px]':'sm:pl-[270px] no_short'} transition-spacing duration-300`

  useEffect(()=>{
    if(!user) {
      // router.push('/auth/signin');
    } else {
      if(!user.email_verified_at) {
        // router.push('/auth/verify');
      }
    }
  }, [user])

  if(!router.pathname.startsWith('/dashboard')) {
    return (
      <main className={`flex flex-col min-h-[100vh]`}>
        {/* <div className="fixed top-0 left-0 w-full h-full" style={{ background: 'linear-gradient(90deg, rgba(255 73 29 / 0.9) 50%, rgba(0 0 0 / 0.1) 50%)', zIndex: -1 }} /> */}
        {props.children}
        {/* <div className="mt-auto p-2 hidden">
          <p className="text-center text-xs font-thin">Lorem ipsum dolor sit, amet consectetur adipisicing elit. A nulla modi porro itaque ipsam nostrum inventore mollitia! Exercitationem, repellat atque iusto assumenda ad veniam doloremque nulla, provident accusamus odit delectus!</p>
        </div> */}
      </main>
    )
  }

  return (
    <>
      <Menubar />
      <main className={`pt-[70px] pb-10 ${class_name}`}>
        {!user ? (
          <div className="">
            <p className="font-thin text-center mt-8">Redirection en cours...</p>
          </div>
        ) : props.children}
      </main>
    </>
  )
}
