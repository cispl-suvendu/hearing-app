'use client'
import React, { useEffect } from 'react'
import AddQuestion from '../form/addQuestion'
import { GrDocumentCsv } from "react-icons/gr";
import Link from 'next/link'
import { getAllData } from '@/lib/getAll';

export default function QuestionHeader() {

    const csvLink = '/questionnaires/sample-question.csv';

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
            <div className='flex gap-4 mb-2 items-end'>
                <h2 className='text-sm'>Create Questions</h2>
                <Link href={csvLink} className='text-xs text-green-600 cursor-pointer flex items-center gap-1' download><GrDocumentCsv />
                    (Sample CSV)</Link>
            </div>
            <AddQuestion />
        </div>
    )
}
