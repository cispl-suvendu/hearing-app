'use client'
import React from 'react'
import Link from 'next/link'
import { LiaHireAHelper } from "react-icons/lia";
import { IoIosMenu } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface HeaderProps {
    handleNavChange:() => void
    activeNav:boolean
}

export default function Header({handleNavChange, activeNav} : HeaderProps) {
    return (
        <div className='bg-light p-4 shadow-[2px_-3px_13px_14px_#f5f7ff] relative z-[1]'>
            <div className='flex items-center'>
                <div className='flex items-center gap-6'>
                    <div className='site-logo'>
                        <Link href='/dashboard'>
                            <LiaHireAHelper className='logo-icon' />
                            <h1>Logo Here</h1>
                        </Link>
                    </div>
                    <div className='menuTigger'>
                        {activeNav ? <IoIosMenu onClick={()=>handleNavChange()} /> : <AiOutlineCloseCircle onClick={()=>handleNavChange()} />}
                    </div>
                </div>
            </div>
        </div>
    )
}
