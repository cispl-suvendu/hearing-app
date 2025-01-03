import React, { useMemo } from 'react'
import FilterList from './FilterList'
import { Suspense } from 'react';
import Skeleton from '../skeleton';

export default function Filter({ allAssignedExam }: any) {
    const completedExams = useMemo(() => allAssignedExam.filter((exam: any) => exam.status === 'completed'), [allAssignedExam]);
    const inCompletedExams = useMemo(() => allAssignedExam.filter((exam: any) => exam.status === 'assigned'), [allAssignedExam]);
    return (
        <>
            <Suspense fallback={<Skeleton />}><FilterList exam={completedExams} title="Completed Assigments" /></Suspense>
            <Suspense fallback={<Skeleton />}><FilterList exam={inCompletedExams} title="In Progress Assigments" /></Suspense>
        </>
    )
}