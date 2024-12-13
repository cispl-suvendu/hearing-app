'use client'
import React from 'react'
import AddCat from '@/components/form/addCat'

export default function CatHeader() {
    return (
        <div className='bg-white py-2 px-4 mb-4'>
            <h2 className='text-sm mb-2'>Create Category</h2>
            <AddCat />
        </div>
    )
}
