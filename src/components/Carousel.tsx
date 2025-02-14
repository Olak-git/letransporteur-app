import React from 'react'
import  "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Button } from 'react-day-picker';

interface CarouselUiProps {
    items: any[],
    // renderItem: 
}
export default function CarouselUi({
    items
}: CarouselUiProps) {
    const clickHandler = () => {

    }
    return (
        <>
            <Carousel 
                autoPlay
                interval={10000}
                transitionTime={2000}
                infiniteLoop
                // showIndicators={false}
                // showStatus={false}
                showThumbs={false}
            >
                <div className='h-[200px]'>
                    <img src="/vercel.svg" className='w-full h-full' />
                    {/* <p className="">Legend 1</p> */}
                </div>
                <div className='h-[200px]'>
                    <img src="/Billettic.svg" className='w-full h-full' />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div className='h-[200px]'>
                    <img src="assets/3.jpeg" className='w-full h-full' />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
        </>
    )
}
