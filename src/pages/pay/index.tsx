import { useRouter } from 'next/router'
import React from 'react'

export default function Pay() {
    
    const router = useRouter()

    const { status, close, id } = router.query

    return (
        <div>index</div>
    )
}
