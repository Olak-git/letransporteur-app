import React, { PropsWithChildren, ReactElement } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type Tooltip2Props = PropsWithChildren<{
    content?: ReactElement,
    contentStyle?: string
}>
export default function Tooltip2({
    content,
    children,
    contentStyle
}: Tooltip2Props) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    { children }
                </TooltipTrigger>
                {content && (
                    <TooltipContent className={`cursor-default ${contentStyle}`}>
                        { content }
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    
    )
}
