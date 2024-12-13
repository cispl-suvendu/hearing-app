
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
        <div className={activeNav ? 'w-1/6' : 'w-auto'}>
            <div className='min-h-screen py-8 px-6 bg-light'>
                <ul className='mainNavigation'>
                    {MainNavLink.map((nav, index) => {
                        const navLink = nav.link
                        return (
                            <li key={index}>
                                <Link href={navLink} className={pathname == navLink ? 'active' : '-'}>
                                    <span className='navIcon'>{<nav.icon />}</span>
                                    {activeNav &&  <span className='navLabel'>{nav.label}</span>}
                                </Link>
                            </li>
                        )
                    })}

                </ul>
            </div>
        </div>
    )
}
