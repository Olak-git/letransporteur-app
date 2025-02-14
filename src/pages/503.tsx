import React from 'react'
import Link from 'next/link'
import Lottie from "lottie-react";
// @ts-ignore
import LottieError503 from 'public/lotties/Error503.json'
import Switche from '@/components/switche'
import { BottomPage, ErrorDescription, ErrorTitle } from '@/components/ServerError';

export default function Error503() {
    return (
        <div className='flex flex-col justify-center items-center min-h-[100vh]'>

            <div className="mb-10">
                <div className="mt-10 flex">
                    <Lottie
                        animationData={LottieError503}
                        className='w-[300px] h-[200px] mx-auto'
                        // loop={false}
                    />
                </div>

                <ErrorTitle contentContainerClassName='mt-3' title='service unavailable' />

                <ErrorDescription contentContainerClassName='mt-3' description='Out of nothing, something.' />
            </div>

            <BottomPage />

        </div>
    )
}
