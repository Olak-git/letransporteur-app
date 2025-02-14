import React, { PropsWithChildren } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type Avatar2Props = PropsWithChildren<{
    src: string,
    fallback?: string|number
    containerStyles?: string,
    imageStyles?: string,
    fallbackStyles?: string
}>
export default function Avatar2({
    src,
    fallback,
    containerStyles,
    imageStyles,
    fallbackStyles
}: Avatar2Props) {
    return (
        <Avatar className={containerStyles}>
            <AvatarImage src={src} className={imageStyles} />
            {fallback && (
                <AvatarFallback className={fallbackStyles}>{fallback}</AvatarFallback>
            )}
        </Avatar>
    )
}
