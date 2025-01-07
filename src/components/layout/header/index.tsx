'use client'
import React from 'react'
import Link from 'next/link'
import { IoIosMenu } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/authContext';
import { SiQuizlet } from "react-icons/si";


interface HeaderProps {
    handleNavChange: () => void
    activeNav: boolean
}

export default function Header({ handleNavChange, activeNav }: HeaderProps) {

    const { user } = useAuthContext()

    const router = useRouter()

    const signOut = async () => {
        await fetch("/api/signout", { method: "POST" });
        router.push("/signin");
        router.refresh()
    }

    return (
        <div className='bg-light p-4 shadow-[2px_-3px_13px_14px_#f5f7ff] fixed w-full z-[1]'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-6'>
                    <div className='site-logo'>
                        <Link href='/dashboard'>
                            <SiQuizlet className='logo-icon' />
                            <h1>quizyFy</h1>
                        </Link>
                    </div>
                    <div className='menuTigger'>
                        <div className='hidden md:block'>
                            {activeNav ? <IoIosMenu onClick={() => handleNavChange()} /> : <AiOutlineCloseCircle onClick={() => handleNavChange()} />}
                        </div>
                        <div className='md:hidden block'>
                            {activeNav ? <IoIosMenu onClick={() => handleNavChange()} /> : <AiOutlineCloseCircle onClick={() => handleNavChange()} />}
                        </div>
                    </div>
                </div>
                <div>
                    <Menu>
                        <MenuButton className='flex items-center gap-2'>
                            <div className='text-grayText text-sm capitalize'>
                                {user?.name}
                            </div>
                            <div className='w-12 h-12 bg-skyLight rounded-[50%] flex items-center justify-center text-xl leading-none text-supportingMegenda cursor-pointer uppercase'>
                                {user?.name?.substring(0, 1)}
                            </div>
                        </MenuButton>
                        <MenuItems
                            transition
                            anchor="bottom end"
                            className="w-52 origin-top-right bg-white z-[100] text-grayText p-4 rounded flex flex-col gap-4"
                        >
                            <MenuItem>
                                <div className='flex items-center cursor-pointer text-sm gap-2' onClick={() => router.replace('/user')}>
                                    <div>
                                        <AiOutlineUsergroupAdd />
                                    </div>
                                    <div>Admin User</div>
                                </div>
                            </MenuItem>
                            <MenuItem>
                                <div className='flex items-center cursor-pointer text-sm gap-2' onClick={() => signOut()}>
                                    <div>
                                        <IoMdLogOut />
                                    </div>
                                    <div>Logout</div>
                                </div>
                            </MenuItem>
                        </MenuItems>
                    </Menu>

                </div>
            </div>
        </div>
    )
}
