'use client'
import Link from 'next/link'
import React, { memo, useMemo } from 'react'
import Moment from 'react-moment'

interface AssignmentsStatisticsProps {
    allAssignedExam: any
}

const AssignmentsStatistics = memo(({ allAssignedExam }: AssignmentsStatisticsProps) => {
    const lastCompletedExam = useMemo(() => allAssignedExam.find((exam: any) => exam.status === 'completed'), [allAssignedExam])
    return (
        <>
            <div className='bg-white p-4 px-6 rounded-xl flex-1'>
                <h2 className='text-sm capitalize mb-6 mt-1 text-supportingSky font-bold'>Recently Completed Assignment</h2>
                <div className='flex justify-between items-center mb-4 pb-4 border-b'>
                    <div className='w-1/2'>
                        <p className='text-xs text-grayText mb-1'>Assignee name</p>
                        <p className='text-sm font-semibold'>{lastCompletedExam?.userName}</p>
                    </div>
                    <div className='w-1/2'>
                        <p className='text-xs text-grayText mb-1'>Assignee email</p>
                        <p className='text-sm font-semibold'>{lastCompletedExam?.userEmail}</p>
                    </div>
                </div>
                <div className='flex justify-between items-center mb-4 pb-4 border-b'>
                    <div className='w-1/2'>
                        <p className='text-xs text-grayText mb-1'>Exam Name</p>
                        <p className='text-sm font-semibold'>{lastCompletedExam?.examId.title}</p>
                    </div>
                    <div className='w-1/2'>
                        <p className='text-xs text-grayText mb-1'>Score</p>
                        <p className='text-sm font-semibold'>
                            <span className={lastCompletedExam?.result.score >= 5 ? 'text-green-500 text-2xl' : 'text-red-500 text-2xl'}>{lastCompletedExam?.result.score}</span> / <span className='text-md'>{lastCompletedExam?.result.total_marks}</span>
                        </p>
                    </div>
                </div>
                <div className='flex justify-between items-center mb-4 pb-4 border-b'>
                    <div className='w-1/2'>
                        <p className='text-xs text-grayText mb-1'>Assiged By</p>
                        <p className='text-sm font-semibold'>{lastCompletedExam?.assignedBy.name}</p>
                    </div>
                    <div className='w-1/2'>
                        <p className='text-xs text-grayText mb-1'>Assiged Date</p>
                        <p className='text-sm font-semibold'><Moment date={lastCompletedExam?.createdAt} format="D MMM YYYY" withTitle /></p>
                    </div>
                </div>
                <div>
                    <Link className='btnPrimary w-full block text-center' href={`/start-exam/${lastCompletedExam?.examLink}`} target='_blank'>View Details</Link>
                </div>
            </div>
        </>
    )
})

export default AssignmentsStatistics
