'use client'
import Link from 'next/link';
import React from 'react'
import CountUp from 'react-countup';


interface AnimatedCountProps {
    title: string,
    Icon: any,
    total: number,
    link: string
}

export default function AnimatedCount({ title, Icon, total, link }: AnimatedCountProps) {
    return (
        <div className='bg-white p-4 px-6 rounded-xl flex-1'>
            <div className='flex justify-between'>
                <div className='text-md capitalize'>{title}</div>
                <div className='text-2xl text-supportingMegenda mr-4'>{Icon}</div>
            </div>
            <div className='flex justify-between items-center'>
                <div className='text-2xl'>
                    <CountUp end={total} />
                </div>
                <Link href={link} className='text-xs text-grayText underline'>View Deatils</Link>
            </div>
        </div>
    )
}
