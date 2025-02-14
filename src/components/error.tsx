import React from 'react'

interface ErrorProps {
    error_message?: string|null|undefined,
    className?: string
}
export default function ErrorInput({error_message, className}: ErrorProps) {
  return (
    error_message ? (
        <div className={`text-red-700 text-sm ${className}`}>{error_message}</div>
    ) : null
  )
}
