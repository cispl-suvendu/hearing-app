'use client'
import React from 'react'
import AddUser from '../form/addUser'

export default function UserHeader() {

    return (
        <div className='bg-white py-2 px-4 mb-4'>
            <div className='flex gap-4 mb-2 items-end'>
                <h2 className='text-sm'>Create User</h2>
            </div>
            <AddUser />
        </div>
    )
}
