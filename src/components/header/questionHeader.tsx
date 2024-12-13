'use client'
import React from 'react'
import AddQuestion from '../form/addQuestion'
import { GrDocumentCsv } from "react-icons/gr";
import Link from 'next/link'

export default function QuestionHeader() {

    const csvLink = '/questionnaires/sample-question.csv';

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
