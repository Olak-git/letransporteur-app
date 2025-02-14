import React, { useEffect } from 'react'
import styles from '@/styles/HeaderView.module.css'

export default function HomeHeader({
    backgroundImageSource,
    backgroundImageSize,
    backgroundImagePosition,
    trigger,
    childClasses,
    childStyle
} : {
    backgroundImageSource?: string,
    backgroundImageSize?: 'cover'|'contain'|'auto'|string,
    backgroundImagePosition?: string,
    trigger?: string,
    childClasses?: string,
    childStyle?: React.CSSProperties
}) {
    useEffect(()=>{
        const nav = document.querySelector('nav')
        const sectionOne = document.querySelector(`.${styles.home_intro}`)
    
        const sectionOneOptions = {
            rootMargin: "-60px 0px 0px 0px"
        }
    
        const sectionOneObserver = new IntersectionObserver(function (entries, sectionOneObserver) {
            entries.forEach(entry => {
                // console.log(entry.target)
                if(!entry.isIntersecting) {
                    nav?.classList.add(styles.nav_scrolled)
                } else {
                    nav?.classList.remove(styles.nav_scrolled)
                }
            })
        }, sectionOneOptions)
    
        if(sectionOne) {
            sectionOneObserver.observe(sectionOne)
        }
    },[])

    return (
        <header className={`h-[500px] flex justify-center items-center bg-black ${styles.home_intro}`} style={{ backgroundImage: backgroundImageSource, backgroundPosition: backgroundImagePosition, backgroundSize: backgroundImageSize}}>
            <div className={childClasses} style={childStyle}>
                {trigger && (
                    <h1 className="uppercase text-white text-2xl font-thin" id="__trigger__" style={{ letterSpacing: 2, position: 'sticky', top: 80, fontSize: 38, fontSizeAdjust: 'from-font' }}>
                        {trigger}
                    </h1>
                )}
            </div>
        </header>
    )
}
