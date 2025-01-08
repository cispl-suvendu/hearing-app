import React, { Suspense } from 'react'
import Heading from '../heading'
import SkeletonDash from '@/components/skeleton/skeletonDash'

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
                {/* <Suspense fallback={<SkeletonDash />}>{children}</Suspense> */}
            </div>
        </div>
    )
}
