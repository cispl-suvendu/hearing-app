import { IUser } from '@/type'
import React, { memo } from 'react'
import DeleteCard from './deleteCard'

interface UserCardInterFace {
    user: IUser
}

const UserCard = memo(({ user }: UserCardInterFace) => {
    return (
        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.email}</td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><DeleteCard pathName='user' id={user?._id} tags='allUser' /></td>
        </tr>
    )
})

export default UserCard
