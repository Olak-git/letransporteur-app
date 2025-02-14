import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import NavigationMenubar from './NavigationMenubar'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useRouter as useNextRouter } from 'next/router'
import Footer from './footer'
import { Inter } from 'next/font/google'
import { TOP_NAVBAR_HEIGHT } from '@/helpers/constants'
import styles from '@/styles/ItemLink.module.css'
import Icon from './ui/icon'

const inter = Inter({ subsets: ['latin'] })

type BaseHomeTemplate = PropsWithChildren<{
    mainClass?: string,
    navContainerClass?: string,
    header?: ReactNode
}>
export default function BaseHomeTemplate({mainClass, navContainerClass, header, children}: BaseHomeTemplate) {

    const router = useNextRouter()
    const navigation = useRouter()

    const [classList, setClassList] = useState('')

    useEffect(()=>{
        // console.log({ PPP: router.pathname});
        // setClassList('relative shadow-none h-[100px] bg-red-100')
        // setClassList('')
    }, [])

    // useEffect(()=>{
    //     window.onscroll = (even)=>{
    //         if(window.scrollY>=50) {
    //             setClassList('')
    //         } else {
    //             setClassList('relative shadow-none h-[100px] bg-red-100')
    //         }
    //         console.log({ even, BH: window.scrollY });
    //     }
    // },[window])

    useEffect(()=>{
        if(header==undefined) {
        const nav = document.querySelector('nav')
        const mainSection = document.querySelector('.ref')
    
        const mainSectionOptions = {
            rootMargin: "-90px 0px 0px 0px"
        }
    
        const mainSectionObserver = new IntersectionObserver(function (entries, mainSectionObserver) {
            entries.forEach(entry => {
                // console.log(entry.target)
                if(entry.isIntersecting) {
                    nav?.classList.remove('shadow-3xl')
                } else {
                    nav?.classList.add('shadow-3xl')
                }
            })
        }, mainSectionOptions)
    
        if(mainSection) {
            mainSectionObserver.observe(mainSection)
        }
        }
    },[header])

    return (
        <>
            <NavigationMenubar
                mainContainerClasses={navContainerClass}
                 _d 
            />
            {header}
            <main className={`pxx-[10px] ${header==undefined?'pt-[70px]':''} pb-10 transition-spacing duration-300 ${mainClass}`}>
                {router.pathname!=='/' && (
                    <Button variant='link' className='md:sticky md:top-[70px]' onClick={()=>navigation.back()}>
                        <Icon.ArrowLeft />
                    </Button>
                )}
                <div className="ref"></div>
                {children}
            </main>
            <Footer />
        </>
    )
}
