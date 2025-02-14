import React, { useEffect } from 'react'
import Lottie from "lottie-react";
// @ts-ignore
import Loader from 'public/lotties/animation_lluqm3k2.json'
// @ts-ignore
import Waiting from 'public/lotties/animation_lluqa8mp.json'
// @ts-ignore
import Waiting2 from 'public/lotties/animation_lluqcgiw.json'
import Helper from "@/components/Helper"
import { useRouter } from 'next/router';

export default function CheckoutCallbackRender({
    loading,
    success,
    data
}: {
    loading: boolean,
    success: boolean|undefined,
    data: any
}) {
    const router = useRouter()
    const { status, close, id } = router.query

    useEffect(()=>{
        console.log({ data })
    },[data])

    return (
        loading ? (
            <div className="flex flex-col items-center">
                <Lottie 
                    animationData={Loader} 
                    loop={true} 
                    className="w-[300px]"
                />
                <Helper content="Veuillez patienter un instant. Opération en cours..." />
            </div>
        ) : (
            success ? (
                <div className="flex flex-col items-center">
                    <Lottie 
                        animationData={Waiting2} 
                        loop={true} 
                        className="w-[300px]"
                    />
                    <Helper content="Opération terminée." />
                    <h2 className="">{data?.user?.lastname} {data?.user?.firstname}</h2>
                    <p className="font-light">Il vous est envoyé votre <mark className='text-sm font-semibold px-2 py-1 bg-muted rounded dark:text-white'>PASS</mark> à l&apos;adresse <span className="underline underline-offset-2">{data?.user?.email}</span></p>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <Lottie 
                        animationData={Waiting2} 
                        loop={true} 
                        className="w-[300px]"
                    />
                    <Helper content={status=='pending'||close=='true'?"Transaction suspendue/annulée.":"Une erreur s'est produite lors de l'opération. Veuillez en informer la direction."} />
                </div>
            )
        )
    )
}
