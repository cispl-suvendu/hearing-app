'use client'
import React, { useState } from 'react'
import MainNavigation from './navigation'
import MainContent from './content'
import Header from './header'
import { Toaster } from 'react-hot-toast';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [activeNav, setActiveNav] = useState<boolean>(true)
    const handleNavChange = () => {
        setActiveNav(prev => !prev)
    }
    return (
        <div className='main-site'>
            <Header handleNavChange={handleNavChange} activeNav={activeNav} />
            <div className='flex'>
                <MainNavigation activeNav={activeNav}  />
                <MainContent activeNav={activeNav}>{children}</MainContent>
            </div>
            <Toaster/>
        </div>
    )
}
