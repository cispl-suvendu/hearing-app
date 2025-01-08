import React, { Suspense } from 'react'
import Heading from '../heading'
import Skeleton from '@/components/skeleton'

interface MainContentProps {
    children: React.ReactNode
    activeNav: boolean
}

export default function MainContent({ children, activeNav }: MainContentProps) {
    return (
        <div className={`${activeNav ? 'md:w-5/6' : 'md:w-full'} w-full`}>
            <div className='p-8 pt-[7rem] min-h-dvh bg-skyLight'>
                <Heading />
                <Suspense fallback={<PageLoader />}>{children}</Suspense>
            </div>
        </div>
    )
}

export const PageLoader = () => {
    return (
        <>
            <div className='top_loading flex gap-6'>
                <div className='flex-1'>
                    <Skeleton />
                </div>
                <div className='flex-1'>
                    <Skeleton />
                </div>
            </div>
            <div className='btm_loading flex flex-col gap-6 mt-6'>
                <div className='flex-1'>
                    <Skeleton />
                </div>
                <div className='flex-1'>
                    <Skeleton />
                </div>
                <div className='flex-1'>
                    <Skeleton />
                </div>
            </div>
        </>
    )
}