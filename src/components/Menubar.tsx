import React, { useState } from 'react'
import NavigationMenubar from './NavigationMenubar'
import Sidebar from './Sidebar'

export default function Menubar() {
    const [short, setShort] = useState(false)

    return (
        <>
            <NavigationMenubar />
            <Sidebar />
        </>
    )
}
