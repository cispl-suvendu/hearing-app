import React from 'react'
import Heading from '../heading'

interface MainContentProps {
    children: React.ReactNode
    activeNav: boolean
}

export default function MainContent({ children, activeNav }: MainContentProps) {
    return (
        <div className={activeNav ? 'w-5/6' : 'w-full'}>
            <div className='p-8 min-h-screen bg-skyLight'>
                <Heading />
                {children}
            </div>
        </div>
    )
}
