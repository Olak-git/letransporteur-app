import React from 'react'
import styles from '@/styles/ErrorPage.module.css'
import Link from 'next/link'
import Image from 'next/image';

export default function ErrorCode({
    contentContainerClassName,
    className,
    code
}: {
    contentContainerClassName?: string,
    className?: string,
    code: number
}) {
    return (
        <div className={contentContainerClassName || ''}>
            <h2 className={`${styles.code} text-center text-[#481c4b] ${className || ''}`}>
                {code}
            </h2>
        </div>
    )
}

export function ErrorTitle({
    contentContainerClassName,
    className,
    title
}: {
    contentContainerClassName?: string,
    className?: string,
    title: string
}) {
    return (
        <div className={contentContainerClassName || ''}>
            <div className={`${styles.title} text-center uppercase ${className || ''}`}>{title}</div>
        </div>
    )
}

export function ErrorDescription({
    contentContainerClassName,
    className,
    description
}: {
    contentContainerClassName?: string,
    className?: string,
    description: string
}) {
    return (
        <div className={contentContainerClassName || ''}>
            <h2 className={`${styles.code_description} text-center ${className || ''}`}>
                {description}
            </h2>
        </div>
    )
}

export function BottomPage({
}: {
}) {
    return (
        <div className='mt-auto flex flex-col items-center p-3 border-t w-full h-[120px] bg-[#eeeeee]'>
            <Link
                href="/dashboard"
                className='flex'
            >
                <Image
                    src="/logo/Logo_transporteur_ORANGE2.png" alt={'Logo'}
                    width={150}
                    height={90}
                    className='min-w-[60px] min-h-[50px] m-auto'
                />
            </Link>
            <span className='text-sm font-light'>&copy;{(new Date).getFullYear()} Tout droit réservé.</span>
        </div>
    )
}