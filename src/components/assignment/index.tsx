'use client'
import React, { Suspense, useState } from 'react'
const AssignExamCard = React.lazy(() => import('../card/assignExamCard'));
import Pagination from '../pagination';
import Skeleton from '../skeleton';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AllAssignment({ allAssignedExam }: any) {
    const router = useRouter()
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(5)
     const searchParams = useSearchParams();
    const activeStatus = searchParams.get("query")
    return (
        <div>
            <Suspense fallback={<Skeleton />}>
                <div>
                    <div className='flex gap-2'>
                        <div className={`${activeStatus === "completed" ? 'bg-supportingMegenda text-white' : 'bg-white'} px-4 py-2 cursor-pointer capitalize rounded`} onClick={() => router.replace('/assignment?query=completed')}>Completed</div>
                        <div className={`${activeStatus === "assigned" ? 'bg-supportingMegenda text-white' : 'bg-white'} px-4 py-2 cursor-pointer capitalize rounded`} onClick={() => router.replace('/assignment?query=assigned')}>assigned</div>
                    </div>
                    <AssignExamCard assignedExam={allAssignedExam} setPage={setPage} setLimit={setLimit} pageLimit={limit} showPagination={false} />
                </div>
            </Suspense>
            <Suspense fallback={<Skeleton />}>
                <Pagination pagination={allAssignedExam.pagination} />
            </Suspense>
        </div>
    )
}
