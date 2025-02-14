import React, { ReactElement, ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Carousel, ScrollingCarousel } from '@trendyol-js/react-carousel';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { Separator } from './ui/separator';
import Icon from './ui/icon';
import BearCarousel, {TBearSlideItemDataList, BearSlideImage, BearSlideCard} from 'bear-react-carousel';
import 'bear-react-carousel/dist/index.css';
import { Button } from './ui/button';


interface BCarouselProps {
    trigger?: string,
    itms: Array<any>,
    render: (a:any)=>ReactElement,
}
export const BCarousel = ({ trigger, itms, render }: BCarouselProps) => {
    const carRef = useRef(null)
    const [items, setItems] = useState(1)
    const [slidesToSlide, setSlidesToSlide] = useState(1)

    const data: TBearSlideItemDataList = itms.map((row, index: number) => {
        // console.log({ row });
        return {
            key: index,
            // BearSlideImage or BearSlideCard
            children: <BearSlideCard className='border rounded-md' style={{  }}>
                {render(row)}
            </BearSlideCard>
        };
    });

    const responsive = () => {
        // const WIDTH = ev.currentTarget?.innerWidth
        const WIDTH = window.innerWidth
        // mobile
        if(WIDTH<464) {
            setItems(1)
            setSlidesToSlide(1)
        }
        // tablet
        else if(WIDTH>=464 && WIDTH<1024) {
            setItems(3)
            setSlidesToSlide(2)
        }
        // desktop
        else if(WIDTH>=1024 && WIDTH<=3000) {
            setItems(4)
            setSlidesToSlide(2)
        }
    }

    useLayoutEffect(()=>{
        // console.log({ window });
        window.onresize = () => {
            responsive()
        }
    })

    useEffect(()=>{
        responsive()
    }, [])

    useEffect(()=>{
        // console.log({ items, slidesToSlide });
    }, [items, slidesToSlide])

    return (
        <>
            <h4 className="mb-2 text-lg font-medium leading-none">{ trigger }</h4>

            <Separator className="mb-4" />

            <BearCarousel 
                ref={carRef}
                data={data}
                height="auto"
                // height={{ 
                //     widthRatio: 0.25,
                //     heightRatio: 1,
                //     addStaticHeight: '200px'
                // }}
                slidesPerView={items}
                slidesPerGroup={slidesToSlide}
                spaceBetween={10}
                moveTime={1000}
                // isEnableAutoPlay
                isEnableNavButton
                isEnablePagination

                isCenteredSlides
                isEnableLoop
                isSlideItemMemo
                // isEnableMouseMove
                isEnablePageContent
                renderNavButton={(toProv, toNext) => (
                    <div className='flex row gap-x-5 mb-1 dark:px-2'>
                        <Button onClick={toProv} className='bg-white hover:bg-white dark:hover:bg-neutral-300 w-8 h-8 p-1 rounded-full flex'>
                            <Icon.ChevronLeft className='m-auto text-black hover:text-neutral-400 dark:hover:text-black' />
                        </Button>
                        <Button onClick={toNext} className='bg-white hover:bg-white dark:hover:bg-neutral-300 w-8 h-8 p-1 rounded-full flex'>
                            <Icon.ChevronRight className='m-auto text-black hover:text-neutral-400 dark:hover:text-black' />
                        </Button>
                    </div>
                )}

                isLazy
                onSlideChange={(carouselSlate) => {
                    // console.log({ carouselSlate });
                }}
            />
        </>
    )
}

interface BSlideImageProps {
    itms: Array<string>,
}
export const BSlideImage = ({ itms}: BSlideImageProps) => {
    const data: TBearSlideItemDataList = itms.map((source, index: number) => {
        return {
            key: index,
            // BearSlideImage or BearSlideCard
            children: <BearSlideImage imageUrl={source} imageSize='cover' />
        };
    });
    return (
        <BearCarousel 
            data={data}
            height='70vh'
            // height={{ 
            //     widthRatio: 0.25,
            //     heightRatio: 1,
            //     addStaticHeight: '200px'
            // }}
            // spaceBetween={10}
            moveTime={1000}
            isEnableAutoPlay
            isEnableNavButton
            isEnablePagination

            isCenteredSlides
            isEnableLoop
            isSlideItemMemo
            isEnableMouseMove
            isEnablePageContent
            renderNavButton={(toProv, toNext) => (
                <div className='flex row gap-x-5 -mb-60 dark:px-2'>
                    <Button onClick={toProv} className='bg-white hover:bg-white dark:hover:bg-neutral-300 w-8 h-8 p-1 rounded-full flex'>
                        <Icon.ChevronLeft className='m-auto text-black hover:text-neutral-400 dark:hover:text-black' />
                    </Button>
                    <Button onClick={toNext} className='bg-white hover:bg-white dark:hover:bg-neutral-300 w-8 h-8 p-1 rounded-full flex'>
                        <Icon.ChevronRight className='m-auto text-black hover:text-neutral-400 dark:hover:text-black' />
                    </Button>
                </div>
            )}

            isLazy

            onSlideChange={(carouselSlate) => {
                // console.log({ carouselSlate });
            }}
        />
    )
}

interface CarousProps {
    children: ReactElement[],
    itemClasses?: string,
    trigger?: string
}
export default function Carous({ children, itemClasses, trigger }: CarousProps) {

    const [items, setItems] = useState(1)
    const [slidesToSlide, setSlidesToSlide] = useState(1)

    const responsive = () => {
        // const WIDTH = ev.currentTarget?.innerWidth
        const WIDTH = window.innerWidth
        // mobile
        if(WIDTH<464) {
            setItems(1)
            setSlidesToSlide(1)
        }
        // tablet
        else if(WIDTH>=464 && WIDTH<1024) {
            setItems(3)
            setSlidesToSlide(2)
        }
        // desktop
        else if(WIDTH>=1024 && WIDTH<=3000) {
            setItems(4)
            setSlidesToSlide(2)
        }
    }

    useEffect(()=>{
        // console.log({ window });
        window.onresize = (ev) => {
            responsive()
        }
    }, [window])

    useEffect(()=>{
        responsive()
    }, [])

    return (
        <>
            <h4 className="mb-2 text-lg font-medium leading-none">{ trigger }</h4>

            <Separator className="mb-4" />

            {/* <Carousel
                show={items} 
                slide={slidesToSlide} 
                transition={0.5} 
                infinite={true}
                swiping={true}
                responsive={true}
                leftArrow={<Icon.ChevronLeft />}
                rightArrow={<Icon.ChevronRight />}
                useArrowKeys={true}
                dynamic={true}
            >
                { children }
            </Carousel> */}

            <ScrollingCarousel
                leftIcon={<Icon.ChevronLeft />}
                rightIcon={<Icon.ChevronRight />}
                triggerClickOn={0.5}
            >
                { children }
            </ScrollingCarousel>

            <ScrollArea className="h-full w-full whitespace-nowrap rounded-md border">
                <div className="flex w-max space-x-4 p-4 bg-neutral-50">
                    { children }
                    <ScrollBar orientation="horizontal" />
                </div>
            </ScrollArea>
        </>
    )
}