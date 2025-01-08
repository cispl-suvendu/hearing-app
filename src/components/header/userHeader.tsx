'use client'
import React, { Suspense } from 'react'
import AddUser from '../form/addUser'
import Skeleton from '../skeleton'

export default function UserHeader() {

    return (
        <div className='bg-white py-2 px-4 mb-4'>
            <div className='flex gap-4 mb-2 items-end'>
                <h2 className='text-sm'>Create User</h2>
            </div>
            <Suspense fallback={<Skeleton />}>
                <AddUser />
            </Suspense>
        </div>
    )
}
