import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import React, { forwardRef, useImperativeHandle, ReactElement, ReactNode, useEffect, useState } from "react"
import { PropsWithChildren } from "react"
import * as Icon from 'lucide-react'
import { useRouter } from 'next/navigation'

var onPressContinuous: any = undefined
export type QuestModalRefProps = {
    openModal: (title:string|undefined, description:string|undefined, call_link_page?: string|undefined)=>void,
    closeModal: ()=>void
}
interface QuestModalProps {
    onPressOk?: ()=>void
}
const QuestModal = forwardRef<QuestModalRefProps, QuestModalProps>(function QuestModal({onPressOk},ref) {

    const router = useRouter()

    const [visible, setVisible] = useState(false)
    
    const [note, setNote] = useState<string|undefined>(undefined)
    const [title, setTitle] = useState<string|undefined>(undefined)
    const [description, setDescription] = useState<string|undefined>(undefined)
    const [call_link_page, setCallLinkPage] = useState<string|undefined>(undefined)

    const onPressContinuous = call_link_page ? () => router.push(call_link_page) : undefined

    const openModal = (a:string|undefined=undefined, b:string|undefined=undefined, call_link_page?:string|undefined)=>{
        setTitle(a)
        setDescription(b)
        setCallLinkPage(call_link_page)
        setVisible(true)
    }

    const closeModal = ()=>{
        setTitle(undefined)
        setDescription(undefined)
        setCallLinkPage(undefined)
        setVisible(false)
    }

    const callPressAction = ()=>{

    }

    useImperativeHandle(ref, ()=>({
        openModal,
        callPressAction,
        closeModal
    }), [
        openModal,
        closeModal
    ])

    useEffect(()=>{
        console.log('onPressContinuous: ', onPressContinuous)
    },[onPressContinuous])

    return (
        <>
        <AlertDialog open={visible}>
            <AlertDialogContent className="">
                <AlertDialogHeader>
                    {title && (
                        <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
                    )}
                    <AlertDialogDescription className="text-center">
                        { description }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="">
                    <AlertDialogAction onClick={closeModal} className="bg-transparent text-black hover:bg-transparent">Ok</AlertDialogAction>
                    <AlertDialogAction onClick={onPressOk||onPressContinuous} className="rounded-full bg-green-500 hover:bg-green-700">Continue</AlertDialogAction>
                    {/* {type=='fetch_error' && (
                        <AlertDialogAction onClick={()=>router.refresh()} className="mb-3">Recharger</AlertDialogAction>
                    )} */}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    )
})

export default QuestModal