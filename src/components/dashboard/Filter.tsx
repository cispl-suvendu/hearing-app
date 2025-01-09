'use client'
import React, { memo, useMemo } from 'react'
import FilterList from './FilterList'
import { Suspense } from 'react';
import Skeleton from '../skeleton';

const Filter = memo(({ allAssignedExam }: any) => {
    return (
        <>
            <Suspense fallback={<Skeleton />}><FilterList count={allAssignedExam.completedAssinment} title="Completed Assigments" link="/assignment?query=completed" /></Suspense>
            <Suspense fallback={<Skeleton />}><FilterList count={allAssignedExam.inProgressAssinment} title="In Progress Assigments" link="/assignment?query=assigned" /></Suspense>
        </>
    )
})

export default Filter
