'use client'
import Link from 'next/link'
import React from 'react'
import { FaExternalLinkAlt } from "react-icons/fa";
import CountUp from 'react-countup';

export default function FilterList({ count, title, link }: { count: number, title: string, link:string }) {
    return (
        <div className='mb-3'>
            <div className={`bg-white p-2 px-6 rounded-xl flex justify-between items-center`}>
                <div className='py-4'>
                    <div className='text-sm mb-4 text-grayText'>{title}:</div>
                    <div className='bg-skyLight rounded flex justify-center items-center text-4xl text-supportingMegenda py-2'><CountUp end={count} /></div>
                </div>
                <div className='text-sm text-grayText'>
                    <Link href={link} className='flex gap-2 items-center hover:text-supportingMegenda'>View All <FaExternalLinkAlt /></Link>
                </div>
            </div>
        </div>
    )
}
