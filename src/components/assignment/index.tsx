'use client'
import React, { useState } from 'react'
const AssignExamCard = React.lazy(() => import('../card/assignExamCard'));
import Pagination from '../pagination';

export default function AllAssignment({ allAssignedExam }: any) {
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(5)
    return (
        <div>
            <AssignExamCard assignedExam={allAssignedExam} setPage={setPage} setLimit={setLimit} pageLimit={limit} showPagination={false} />
            <Pagination pagination={allAssignedExam.pagination} />
        </div>
    )
}
