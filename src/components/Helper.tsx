import React from 'react'
import Icon from './ui/icon'

export default function Helper({
    content,
    containerClass,
    loader,
}: {
    content: string | React.ReactElement,
    containerClass?: string,
    loader?: boolean
}) {
  return (
    <p className={`text-sm text-muted-foreground ${loader?'flex items-center':''} ${containerClass}`}>
      {loader && (
        <Icon.Loader2 size={20} className='mr-2 animate-spin' />
      )}
      { content }
    </p>
  )
}
