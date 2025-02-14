import React, { useState } from 'react'
import { Button } from './ui/button'
import Icon from './ui/icon'

interface ButtonLoadProps {
    onPress: ()=>void
}
export default function ButtonLoad({
    onPress
}: ButtonLoadProps) {
    const [loading, setLoading] = useState(false)

    const onHandlePress = async () => {
        setLoading(true)
         await onPress()
        setLoading(false)
    }

    return (
        <div className="flex px-4">
            <Button 
                variant='ghost'
                className='mx-auto'
                onClick={onHandlePress}
            >
                {loading && (
                    <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                voir plus
            </Button>
        </div>
    )
}
