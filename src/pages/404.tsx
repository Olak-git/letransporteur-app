import React from 'react'
import Link from 'next/link'
import Lottie from "lottie-react";
// @ts-ignore
import LottieError404 from 'public/lotties/Error404.json'
import { BottomPage, ErrorDescription, ErrorTitle } from '@/components/ServerError';

export default function Error404() {
    return (
        <div className='flex flex-col justify-center items-center min-h-[100vh]'>
            <div className="mb-10">
                <div className="mt-10 flex">
                    <Lottie
                        animationData={LottieError404}
                        className='w-[300px] h-[200px] mx-auto'
                        // loop={false}
                    />
                </div>

                <ErrorTitle contentContainerClassName='mt-3' title='page not found' />

                <ErrorDescription contentContainerClassName='mt-3' description='Out of nothing, something.' />

                {/* <div className="px-[5%] md:px-[20%] mt-4">
                    <p className="text-base sm:text-lg text-center font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo mollitia voluptates tempora itaque repudiandae molestiae asperiores laudantium magni beatae delectus debitis, exercitationem praesentium dolorem facilis facere quas nihil voluptas nisi.</p>
                </div> */}
                <div className="text-center">
                    <Link href="/" className='uppercase underline underline-offset-2 decoration-1'>
                        Home
                    </Link>
                </div>
                {/* <div className="px-[5%] md:px-[20%] mt-4">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="border empty:h-[200px]"></div>
                        <div className="border empty:h-[200px]"></div>
                        <div className="border empty:h-[200px]"></div>
                        <div className="border empty:h-[200px]"></div>
                    </div>
                </div> */}
            </div>

            <BottomPage />

        </div>
    )
}
