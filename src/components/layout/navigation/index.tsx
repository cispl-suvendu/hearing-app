
'use client'
import Link from 'next/link';
import React from 'react'
import { MainNavLink } from '@/constant/Navigation';
import { usePathname } from 'next/navigation';

interface NavProps {
    activeNav: boolean
}

export default function MainNavigation({ activeNav }: NavProps) {
    const pathname = usePathname()
    return (
        <div className={`${activeNav ? 'w-1/6' : 'w-auto'} relative`}>
            <div className='min-h-dvh py-8 px-6 pt-[7rem] bg-light'>
                <ul className='mainNavigation'>
                    {MainNavLink.map((nav, index) => {
                        const navLink = nav.link
                        return (
                            <li key={index}>
                                <Link href={navLink} className={pathname == navLink ? 'active' : '-'}>
                                    <span className='navIcon'>{<nav.icon />}</span>
                                    {activeNav && <span className='navLabel'>{nav.label}</span>}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                {activeNav && <p className='text-xs text-grayText absolute left-4 bottom-10'>&copy; quizFy | Developed by <Link href='mailto:suvendu.chatterjee@codeclouds.in' className='text-primaryDark font-bold'>Suvendu</Link></p>}
            </div>
        </div>
    )
}
