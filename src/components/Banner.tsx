import React from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

export default function Banner({
    layerImage
} : {
    layerImage: string
}) {
    return (
        <>
            {/* <div className="bg-[#481c4b] empty:h-[500px]"></div> */}
            <div className="bg-slate-50 dark:bg-gray-800 py-20">
                <ParallaxBanner
                    className='w-full'
                    layers={[
                        {
                            image: layerImage,
                            opacity: [0.8, 1, 'easeInOut'],
                            scale: [1, 1.2],
                            role: 'img',
                            rootMargin: { top: 0, right: 0, bottom: 0, left: 0 },
                            // shouldAlwaysCompleteAnimation: true,
                            // shouldDisableScalingTranslations: false,
                            speed: -20,
                            className: 'w-full',
                        },
                        {
                            children: <h1 className='text-red-500 text-2xl'>Salut les amis!</h1>,
                            speed: -10
                        },
                    ]}
                    style={{ aspectRatio: '2 / 1' }}
                />
            </div>
        </>
    )
}
