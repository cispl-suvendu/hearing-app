import React, { Suspense, useEffect, useState } from 'react'
import { IExam, IExamAssignment } from '@/type'
import toast from 'react-hot-toast'
import { getDataById } from '@/lib/getById'
import Skeleton from '../skeleton'
const AssignExam = React.lazy(() => import('../form/assignExam'));
const AssignExamCard = React.lazy(() => import('./assignExamCard'));
interface ExamDeatilsCardProps {
    exam: IExam
}

export default function ExamDeatilsCard({ exam }: ExamDeatilsCardProps) {
    const [reFetchCat, setReFetchCat] = useState<boolean>(false)
    const [showAddForm, setShowAddForm] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(5)
    const handleShowForm = () => {
        setShowAddForm(prev => !prev)
    }
    const [assignedExam, setAssignedExam] = useState<{
        data: IExamAssignment[];
        success: boolean;
        error: string;
        pagination: { total: number; limit: number; page: number; pages: number; };
    }>({
        data: [],
        success: false,
        error: '',
        pagination: {} as any
    });
    const getAssignedExam = async () => {
        const { data, success, message, error, pagination } = await getDataById('examAssignment', 'examId', exam._id, '', page, limit)
        if (!success) {
            toast.error(message)
        }
        if (error) {
            toast.error(error)
        }
        setAssignedExam(prevdata => ({
            ...prevdata,
            data,
            success,
            error,
            pagination
        }))
    }

    useEffect(() => {
        getAssignedExam()
        return () => {
            setAssignedExam({
                data: [],
                success: false,
                error: '',
                pagination: {} as any
            })
        }
    }, [exam._id, reFetchCat, page, limit])

    return (
        <div>
            <div className='flex justify-between mb-2'>
                <h2>{!showAddForm ? 'All Assigned Exam' : 'Assign Exam'}</h2>
                <button className={showAddForm ? 'btnClose' : 'btnPrimary'} onClick={() => handleShowForm()}>{showAddForm ? 'Close' : 'New Assign'}</button>
            </div>
            {showAddForm ? <Suspense fallback={<Skeleton />}><AssignExam exam={exam} reFetch={setReFetchCat} closeAddForm={handleShowForm} /></Suspense> : <Suspense fallback={<Skeleton />}><AssignExamCard assignedExam={assignedExam} setPage={setPage} setLimit={setLimit} pageLimit={limit} /></Suspense>}
        </div>
    )
}
