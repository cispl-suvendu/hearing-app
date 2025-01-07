'use client'
import Link from 'next/link';
import React, { memo } from 'react'
import CountUp from 'react-countup';


interface AnimatedCountProps {
    title: string,
    Icon: any,
    total: number,
    link: string
}

const AnimatedCount = memo(({ title, Icon, total, link }: AnimatedCountProps) => {
    return (
        <div className='bg-white p-6 px-6 rounded-xl md:w-[47%]'>
            <div className='flex justify-between'>
                <div className='text-md capitalize'>{title}</div>
                <div className='text-2xl text-supportingMegenda mr-4'>{Icon}</div>
            </div>
            <div className='flex justify-between items-center mt-4'>
                <div className='text-4xl'>
                    <CountUp end={total} />
                </div>
                <Link href={link} className='text-xs text-grayText underline'>View Deatils</Link>
            </div>
        </div>
    )
})

export default AnimatedCount
