import React, { Suspense } from 'react'
import UserHeader from '@/components/header/userHeader'
import { getAllData } from '@/lib/getAll'
import type { Metadata } from 'next'
import ErrorMessage from '@/components/error'
import NoItemFound from '@/components/notfound'
import { IUser } from '@/type'
import UserCard from '@/components/card/userCard'
import Skeleton from '@/components/skeleton'

export const metadata: Metadata = {
    title: 'Admin Users',
    description: 'categories and sub categories',
}

export default async function Page() {

    const { success, data: allUser, error } = await getAllData({ pathName: 'user', tag: 'allUser' })

    if (!success) {
        return <ErrorMessage errorDetail={error} />
    }

    if (allUser?.length === 0) {
        return (
            <>
                <UserHeader />
                <NoItemFound componentName='User' />
            </>
        )
    }
    return (
        <div>
            <UserHeader />
            <div className='flex flex-col gap-3'>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUser?.map((user: IUser, index: number) => {
                            return (
                                <Suspense key={index} fallback={<Skeleton />}>
                                    <UserCard key={index} user={user} />
                                </Suspense>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </div>
    )
}
