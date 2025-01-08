'use client'
import React, { Suspense, useEffect, useState } from 'react'
import AddExam from '../form/addExam'
import { getAllData } from '@/lib/getAll'
import Skeleton from '../skeleton';

export default function ExamHeader() {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const getAllItesm = async () => {
        const { data: allCat } = await getAllData({ pathName: 'category', tag: 'allCat', limit: 1000 })
        const { data: allSubCat } = await getAllData({ pathName: 'subCategory', tag: 'allSubCat', limit: 1000 })
        setCategories(allCat);
        setSubCategories(allSubCat);
    }
    useEffect(() => {
        getAllItesm()
    }, [])
    return (
        <div className='bg-white py-2 px-4 mb-4'>
            <h2 className='text-sm mb-2'>Create Exam</h2>
            <Suspense fallback={<Skeleton />}><AddExam categories={categories} subCategories={subCategories} /></Suspense>
        </div>
    )
}
