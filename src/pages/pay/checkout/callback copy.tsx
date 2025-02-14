import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Lottie from 'lottie-react';
import Loader from 'public/lotties/animation_lluqm3k2.json'
import Helper from '@/components/Helper';

export default function Callback() {

    const router = useRouter()
    
    const { status, close, id } = router.query

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState<boolean|undefined>(undefined)

    const [data, setData] = useState<any>(undefined)

    const [message, setMessage] = useState('')

    // method to send msg to react native
    const sendMessage = (message: string) => {
        // @ts-ignore
        window.ReactNativeWebView.postMessage(message||'Hi from PWA');
    };

    useEffect(()=>{
        if(close) {
            sendMessage('transaction:canceled')
        } else {
            sendMessage('close:windows')
        }
    }, [close, status])

    // listener to receive msgs from react native
    useEffect(() => {
        const messageListener = window.addEventListener('message', (nativeEvent) => {
            setMessage(nativeEvent?.data)
            console.log(nativeEvent?.data);
        });
        return messageListener;
    }, []);

    // useEffect(()=>{
    //     sendMessage('need:data')
    // },[])

    // useEffect(()=>{
    //     if(success) {
    //         sendMessage('transaction:success')
    //     } else if(success==false) {
    //         sendMessage('transaction:fail')
    //     }
    // },[success])

    return (
        <div className="flex flex-col items-center">
            <Lottie
                animationData={Loader}
                loop={true}
                className="w-[300px]"
            />
            <Helper content="Veuillez patienter un instant. Validation en attente..." />
        </div>
    )

    if(close) {
        return (
            <div className='flex flex-col justify-center items-center' style={{ minHeight: '100vh' }}>
                <div className="w-full flex-1 p-5">
                    <div className='mt-auto flex flex-col items-center border-b w-full h-[100px] mb-5 '>
                        <Image
                            src="/images/logo_fedapay.svg" alt={'Logo'}
                            width={150}
                            height={90}
                            className='min-w-[60px] min-h-[50px] m-auto'
                        />
                    </div>
                    <p className="text-center font-bold text-red-700">Transaction Canceled</p>
                </div>
                <div className='mt-auto flex flex-col items-center border-t w-full h-[100px] mb-5'>
                    <Image
                        src="/logo/Logo_transporteur_ORANGE2.png" alt={'Logo'}
                        width={150}
                        height={90}
                        className='min-w-[60px] min-h-[50px] m-auto'
                    />
                </div>
            </div>
        )
    }

  return (
    <div>callback
        <p className="">{status}</p>
        <p className="">{close}</p>
        <p className="">{id}</p>
    </div>
  )
}
