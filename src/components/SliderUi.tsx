import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getIntegerRandom } from '@/helpers/funcs'
import styles from '@/styles/CardFullFace.module.css'
import styles2 from '@/styles/CardAnimateShadow.module.css'

interface SliderUiProps {
    data: string[]
}
export default function SliderUi({
    data
}: SliderUiProps) {
  return (
    <div className="h-[280px] rounded-lg overflow-hidden mt-4 mb-8 p-1 border-0 border-blue-800">
        {data.map((s, i) => (
            <Image
                key={i.toString()}
                loading='lazy'
                src={s}
                alt={`Photo by `}
                className="border-0 w-full h-full"
                width={100}
                height={50}
                decoding='auto'
            />
        ))}
    </div>
  )
}

interface KJProps {
    images: Array<{
        front_source: string,
        back_source: string,
        backgroundColor?: string
    }>
}
export const KJ = ({
    images
}: KJProps) => {

    const [cpimages, setCpimages] = useState([])

    return (
        // <div className="h-[380px] rounded-lg overflow-hidden mt-4 mb-8 border-0 border-blue-800 grid grid-cols-4 sm:grid-cols-7">
        <div className={`h-[380px] rounded-lg overflow-hidden mt-4 mb-8 border-0 border-blue-800 flex flex-row`}>
            {images.map((s, i) => (
                <div key={i.toString()} className={`${s.backgroundColor} border-0 border-slate-300 flex-1`}>
                <div className={styles.card}>
                    <div className={styles.card_inner}>
                        <div className={styles.card_front}>
                            <Image
                                key={i.toString()}
                                loading='lazy'
                                src={s.front_source}
                                alt={`Photo by `}
                                className="border-0 w-full h-full object-cover"
                                width={100000000}
                                height={50000000}
                                decoding='auto'
                            />
                        </div>
                        <div className={styles.card_back}>
                            <Image
                                key={i.toString()}
                                loading='lazy'
                                src={s.back_source}
                                alt={`Photo by `}
                                className="border-0 w-full h-full object-cover"
                                width={100000000}
                                height={50000000}
                                decoding='auto'
                            />
                        </div>
                    </div>
                </div>
                    {/* <Image
                        key={i.toString()}
                        loading='lazy'
                        src={s.source}
                        alt={`Photo by `}
                        className="border-0 w-full h-full object-cover"
                        width={100000000}
                        height={50000000}
                        decoding='auto'
                    /> */}
                </div>
            ))}
        </div>
    )
}