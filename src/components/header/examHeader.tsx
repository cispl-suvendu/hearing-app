'use client'
import React, { useEffect } from 'react'
import AddExam from '../form/addExam'
import { getAllData } from '@/lib/getAll'

export default function ExamHeader() {
    const getAllItesm = async () => {
        const { data: allCat } = await getAllData({ pathName: 'category', tag: 'allCat', limit: 1000 })
        const { data: allSubCat } = await getAllData({ pathName: 'subCategory', tag: 'allSubCat', limit: 1000 })
        localStorage.setItem('allCategory', JSON.stringify(allCat))
        localStorage.setItem('allSubCategory', JSON.stringify(allSubCat))
    }
    useEffect(() => {
        getAllItesm()
    }, [])
    return (
        <div className='bg-white py-2 px-4 mb-4'>
            <h2 className='text-sm mb-2'>Create Exam</h2>
            <AddExam />
        </div>
    )
}
