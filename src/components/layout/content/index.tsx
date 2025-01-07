import React from 'react'
import Heading from '../heading'

interface MainContentProps {
    children: React.ReactNode
    activeNav: boolean
}

export default function MainContent({ children, activeNav }: MainContentProps) {
    return (
        <div className={`${activeNav ? 'md:w-5/6' : 'md:w-full'} w-full`}>
            <div className='p-8 pt-[7rem] min-h-dvh bg-skyLight'>
                <Heading />
                {children}
            </div>
        </div>
    )
}
