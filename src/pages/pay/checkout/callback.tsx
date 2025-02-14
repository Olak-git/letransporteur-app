import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Lottie from 'lottie-react';
import Loader from 'public/lotties/animation_lluqm3k2.json'
import Helper from '@/components/Helper';

export default function Callback() {

    const router = useRouter()
    
    const { status, close, id } = router.query

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
}
