import React, { PropsWithChildren, ReactElement, ReactNode } from 'react'
import * as Icon from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type AlertFormProps = PropsWithChildren<{
    variant?: 'destructive',
    message: ReactNode,
    title?: string,
    onClose?: ()=>void,
    hideCloseButton?: boolean,
    containerStyles?: string,
    loader?: boolean
}>
export default function AlertForm({variant, message, title, onClose, hideCloseButton, containerStyles, loader}: AlertFormProps) {
    return (
        message ? 
            <Alert variant={variant} className={`mb-4 transition relative overflow-hidden ${variant==undefined && 'border-green-600'} ${containerStyles}`}>
                {loader && (
                    <div className="absolute left-0 top-0 w-full h-full bg-white/40 flex items-center justify-center p-0" style={{ zIndex: 5 }}>
                        <Icon.Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                )}

                {title ? (
                    <>
                        <Icon.AlertCircle className="h-4 w-4" />
                        <AlertTitle>{title}</AlertTitle>
                    </>
                ) : (
                    variant=='destructive' ? (
                        <>
                            <Icon.AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                        </>
                    ) : (
                        <>
                            <Icon.Info className="h-4 w-4" />
                            <AlertTitle>Info</AlertTitle>
                        </>
                    )
                )}
                
                {(onClose && !hideCloseButton) && (
                    <div className='absolute top-2 right-2'>
                        <Icon.X className='' onClick={onClose} />
                    </div>
                )}

                <AlertDescription>
                    {message}
                </AlertDescription>
            </Alert>
        : null
    )
}
