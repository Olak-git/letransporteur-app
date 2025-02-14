import Image from 'next/image'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import * as Icon from 'lucide-react'
import styles from '@/styles/Footer.module.css'
import { Separator } from './ui/separator'

type FooterProps = PropsWithChildren<{
    footerClassName?: string,
    separatorClassName?: string
}>
export default function Footer({
    footerClassName,
    separatorClassName
}: FooterProps) {
    return (
        <>
        <div className={`mt-10 ${!separatorClassName?.includes('mx')?'mx-20':null} ${separatorClassName}`}>
            <Separator className={``} />
        </div>
        <footer className={`mt-5 ${footerClassName}`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <div className="p-3 sm:col-span-2">
                    <Link href="/">
                        <Image 
                            src="/billetticnew.svg" alt={'Logo'}
                            width={100}
                            height={90}
                            className='min-w-[60px] min-h-[50px]'
                        />
                    </Link>
                    <div className="text-sm font-light px-3">
                        Notre entreprise spécialisée dans la vente de billets électroniques offre une expérience de réservation fluide et pratique. Nous facilitons l&apos;accès à un large éventail d&apos;événements, de concerts, de transport et de cinéma à des attractions locales, grâce à notre plateforme sécurisée et conviviale.
                    </div>
                    <div className="mt-5 px-3">
                        <Link href="https://www.facebook.com/profile.php?id=61557028745378&mibextid=YIjw0uDPbU8WYW2J" target='_blank' className='flex justify-center items-center w-8 h-8 border rounded-full'>
                            <Icon.Facebook size={20} />
                        </Link>
                    </div>
                </div>
                <div className="p-3 font-mono">
                    {/* <div className="flex h-full">
                        <Separator orientation='vertical' className='h-full' />
                        <div className=""> */}
                    <h5 className={`${styles.title}`}>Terms</h5>
                    <LinkFoot path='/conditions' trigger="Conditions d'utilisation" />
                    <LinkFoot path='#' trigger='Politique de confidentialité' />
                        {/* </div>
                    </div> */}
                </div>
                <div className="p-3 font-mono">
                    <h5 className={`${styles.title}`}>Liens utils</h5>
                    <LinkFoot path='/' trigger='Accueil' />
                    {/* <LinkFoot path='/events' trigger='Evènements' />
                    <LinkFoot path='/transports' trigger='Transports' />
                    <LinkFoot path='/cinemas' trigger='Cinémas' /> */}
                    <LinkFoot path='/contact-us' trigger='Nous contacter' />
                    <LinkFoot path='/faqs' trigger='Faqs' />
                </div>
            </div>

            <div className="flex flex-wrap flex-row justify-center sm:justify-end items-center gap-y-1 gap-x-3 px-5">
                <LinkFoot path='/events' trigger='Evènements' hideIcon />
                <Separator orientation='vertical' className='h-4 -mt-1' />
                {/* <Icon.Dot /> */}
                <LinkFoot path='/transports' trigger='Transports' hideIcon />
                <Separator orientation='vertical' className='h-4 -mt-1' />
                {/* <Icon.Dot /> */}
                <LinkFoot path='/cinemas' trigger='Cinémas' hideIcon />
            </div>

            <p className="font-extralight text-center p-2">
                &copy; {(new Date()).getFullYear()} BilletTic. Tout droit réservé.
            </p>
        </footer>
        </>
    )
}

type LinkFootProps = {
    trigger: string,
    path: string,
    hideIcon?: boolean
}
function LinkFoot({
    trigger,
    path,
    hideIcon
}: LinkFootProps) {
    return (
        <Link href={path} className='flex gap-x-2 text-sm hover:underline underline-offset-4 mb-2'>
            {!hideIcon && (
                <Icon.ChevronRight />
            )}
            { trigger }
        </Link>
    )
}