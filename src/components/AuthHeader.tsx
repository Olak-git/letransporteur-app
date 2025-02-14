import Image from 'next/image'
import { PropsWithChildren } from 'react'

type AuthHeaderProps = PropsWithChildren<{
    titre: String,
    className?: String|undefined
}>
export default function AuthHeader({ titre, className }: AuthHeaderProps) {
  return (
    <>
        <Image 
            src="/logo/Logo_transporteur2.png" alt={'Logo'}
            width={200}
            height={100}
        />
        <h1 className={`text-3xl font-thin mt-3 mb-6 ${className}`}>{titre}</h1>

    </>
  )
}
