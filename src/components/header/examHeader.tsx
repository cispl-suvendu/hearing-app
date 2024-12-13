'use client'
import React from 'react'
import AddExam from '../form/addExam'

export default function ExamHeader() {
    return (
        <div className='bg-white py-2 px-4 mb-4'>
            <h2 className='text-sm mb-2'>Create Exam</h2>
            <AddExam />
        </div>
    )
}
