import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useState } from 'react'
import timer from '@/helpers/utils/timer';
import Icon from './ui/icon';

export type VariantType = 'outline' | 'ghost'
export type AlertType = 'info' | 'warning' | 'success' | 'error';
export type AlertProps = {
    type: AlertType, 
    title?: string, 
    message: string, 
    variant?: VariantType, 
    autoHide?: boolean,
    duration?: number,
    onClose?: ()=>void
}

export type NotificationWebRefProps = {
    alert: ({type, title, message, variant, autoHide, duration, onClose} : AlertProps) => void,
    hide: ()=>void
}
interface NotificationWebProps {
}
const NotificationWeb = forwardRef<NotificationWebRefProps, NotificationWebProps>(function NotificationWeb({
}, ref) {

    const [visible, setVisible] = useState(false)
    const [autoHide, setAutoHide] = useState(false)
    const [type, setType] = useState<AlertType>('info')
    const [title, setTitle] = useState<string|undefined>(undefined)
    const [message, setMessage] = useState<string>('')
    const [variant, setVariant] = useState<VariantType>('ghost')
    const [onHide, setOnHide] = useState<(()=>void)|undefined>(undefined)
    const [hideDuration, setHideDuration] = useState<number>(5000)

    const [color, setColor] = useState('')

    // var COLOR = type=='error'?`text-red-600`:(type=='info'?`text-blue-600`:(type=='success'?`text-green-600`:(type=='warning'?`text-orange-600`:'')))
    // var JH = variant=='outline'?(COLOR):'text-white'

    var COLOR = '', JH = '';

    const [y, setY] = useState(-1000)

    const onHandleClose = () => {
        setY(-1000)
        if(onHide!==undefined) {
            onHide()
        }
        setVisible(false)
    }

    const show = () => {
        setY(0)
        setVisible(true)
    }

    const alert = async ({type, title, message, variant='outline', autoHide, duration, onClose} : AlertProps)=>{
        setType(type)
        setTitle(title)
        setMessage(message)
        setVariant(variant)
        setAutoHide(autoHide||false)
        setOnHide(()=>onClose)
        setHideDuration(duration||5000)
        show()
    }

    const hide = () => {
        onHandleClose()
    }

    useImperativeHandle(ref, ()=>({
        alert,
        hide
    }), [
        alert,
        hide
    ])

    useEffect(()=>{
        COLOR = type=='error'?`text-red-600`:(type=='info'?`text-blue-600`:(type=='success'?`text-green-600`:(type=='warning'?`text-orange-600`:'')))
        JH = variant=='outline'?(COLOR):'text-white'
        setColor(JH)
        // console.log({ JH, COLOR })
    }, [type, variant])

    // useEffect(()=>{
    //     console.log({ JH, COLOR })
    // }, [JH, COLOR])

    useEffect(()=>{
        if(visible && autoHide) {
            timer.setTimeout('dropdown-notification', onHandleClose, hideDuration)
        } else {
            // setVisible(false)
            timer.clearTimeout('dropdown-notification')
        }
        if(!visible) {
            setOnHide(undefined)
        }
    }, [visible, autoHide, hideDuration])
    
    return (
        <div
            className={`fixed top-0 left-0 w-full min-h-[50px] bg-transparent pt-5 px-10 transition duration-300`}
            style={{ zIndex: 100, transform: `translateY(${y}px)` }}
        >
            <div
                className={`relative border ${type=='error'?`border-red-600`:(type=='info'?`border-blue-600`:(type=='success'?`border-green-600`:(type=='warning'?`border-orange-600`:'')))} ${variant=='ghost'?(type=='error'?`bg-red-600`:(type=='info'?`bg-blue-600`:(type=='success'?`bg-green-600`:(type=='warning'?`bg-orange-600`:'')))):'bg-white'} pt-3 pb-3 px-2 rounded-lg shadow-lg`} 
                // className={`relative ${background} border ${border} pt-1 pb-3 px-2 rounded`}
            >
                <button type="button" onClick={onHandleClose} className='absolute -top-2 -right-2 flex h-7 w-7 rounded-full bg-neutral-400'>
                    <Icon.X size={20} className='m-auto text-white' />
                </button>
                {title && (
                    <div className="flex flex-row items-center gap-x-2">
                        {type=='error' ? (
                            <Icon.LucideAlertCircle size={20} className={`${color}`} />
                        ) : type=='info' ? (
                            <Icon.Info size={22} className={`${color}`} />
                        ) : type=='success' ? (
                            <Icon.Check size={22} className={`${color}`} />
                        ) : type=='warning' ? (
                            <Icon.AlertTriangleIcon size={22} className={`${color}`} />
                        ) : null}
                        <span className={`${color}`}>{title}</span>
                    </div>
                )}
                <p className={`text-sm ml-[30px] ${variant=='ghost'?'text-white':('text-black'||COLOR)} font-light`}>
                    {message}
                </p>
            </div>
        </div>
    )
})

export default NotificationWeb;