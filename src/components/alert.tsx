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
import { useRouter } from "next/navigation"
import React, { ReactElement, ReactNode, useEffect, useState } from "react"
import { PropsWithChildren } from "react"

import Lottie from "lottie-react";
// @ts-ignore
import ServerFailedConnexion from '/public/lotties/ServerFailedConnexion.json'
import Icon from "./ui/icon"

type AlertLogProps = PropsWithChildren<{
    visible?: boolean,
    close: ()=>void,
    title?: string|undefined,
    description: string|undefined,
    type?: string|undefined,
}>

const AlertLog = ({
    visible,
    close,
    title,
    description,
    type
}: AlertLogProps) => {
    
    const router = useRouter()

    return (
        <AlertDialog open={visible}>
            <AlertDialogContent className="">
                <AlertDialogHeader>
                    {title && (
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                    )}
                    <AlertDialogDescription>
                        { description }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="">
                    <AlertDialogAction onClick={close} className="mb-3">Continue</AlertDialogAction>
                    {type=='fetch_error' && (
                        <AlertDialogAction onClick={()=>router.refresh()} className="mb-3">Recharger</AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
  
export default AlertLog;

export function DialogFetchCatch({
    visible,
    closeDialog
}: {
    visible?: boolean,
    closeDialog: ()=>void
}) {
    const router = useRouter()

    const [open, setOpen] = useState(visible)

    useEffect(()=>{
        setOpen(visible)
    },[visible])

    return (
        <Dialog 
            visible={open}
            close={function (): void {
                setOpen(false)
                closeDialog()
            } }  
            containerClass='border-0 dark:border dark:border-gray-800'
        >
            <div className="">
                <div className="flex">
                    <Lottie 
                        animationData={ServerFailedConnexion}
                        className='w-[300px] h-[200px] mx-auto'
                        loop={false}
                    />
                </div>
                <div className="flex flex-col items-center gap-y-3 break-all">
                    <p className="text-xl font-bold">Un problème est survenu</p>
                    <p className="text-center text-muted-foreground">Nous rencontrons des problèmes pour charger cette page.</p>
                    <Button
                        variant='outline'
                        className="rounded-full border-blue-400"
                        onClick={()=>{
                            setOpen(false)
                            router.refresh()
                        }}
                    >
                        Recharger la page
                        {/* Essayer de nouveau */}
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

interface DialogProps {
    visible?: boolean,
    close: ()=>void,
    containerClass?: string,
    contentContainerClass?: string,
    footerContent?: any,
    titleContent?: any,
    descriptionContent?: ReactElement,
    descriptionText?: ReactNode,
    children?: ReactNode
}
export const Dialog = ({
    visible,
    close,
    containerClass,
    contentContainerClass,
    footerContent,
    titleContent,
    descriptionContent,
    descriptionText,
    children
}: DialogProps) => {
    return (
        <AlertDialog open={visible}>
            <AlertDialogContent className={`border border-blue-500 p-2 ${containerClass}`}>
                <Icon.XCircle 
                    onClick={close}
                    className="rounded-full w-8 h-8 absolute -top-3 -right-3 bg-neutral-100 hover:text-gray-500 dark:bg-gray-500 dark:text-gray-900 dark:hover:bg-gray-800 cursor-pointer" 
                />
                <div className={`p-2 sm:p-6 max-h-[80vh] min-h-[300px] overflow-scroll ${contentContainerClass}`}>
                <AlertDialogHeader>
                    {titleContent && (
                        <AlertDialogTitle>
                            { titleContent }
                        </AlertDialogTitle>
                    )}

                    <div className="">
                        { descriptionContent }
                    </div>

                    {descriptionText && (
                        <AlertDialogDescription>
                            { descriptionText }
                        </AlertDialogDescription>
                    )}
                </AlertDialogHeader>
                {footerContent && (
                    <AlertDialogFooter>
                        { footerContent }
                    </AlertDialogFooter>                    
                )}

                { children }
            </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}