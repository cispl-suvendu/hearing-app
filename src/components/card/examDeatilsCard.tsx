import React, { Suspense, useEffect, useState } from 'react'
import { IExam, IExamAssignment } from '@/type'
import AssignExam from '../form/assignExam'
import AssignExamCard from './assignExamCard'
import toast from 'react-hot-toast'
import { getDataById } from '@/lib/getById'
import Skeleton from '../skeleton'

interface ExamDeatilsCardProps {
    exam: IExam
}

export default function ExamDeatilsCard({ exam }: ExamDeatilsCardProps) {
    const [reFetchCat, setReFetchCat] = useState<boolean>(false)
    const [showAddForm, setShowAddForm] = useState<boolean>(false)
    const handleShowForm = () => {
        setShowAddForm(prev => !prev)
    }
    const [assignedExam, setAssignedExam] = useState<{
        data: IExamAssignment[];
        success: boolean;
        error: string;
    }>({
        data: [],
        success: false,
        error: '',
    });
    const getAssignedExam = async () => {
        const { data, success, message, error } = await getDataById('examAssignment', 'examId', exam._id)
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
            error
        }))
    }

    useEffect(() => {
        getAssignedExam()
        return () => {
            setAssignedExam({
                data: [],
                success: false,
                error: ''
            })
        }
    }, [exam._id, reFetchCat])
    return (
        <div>
            <div className='flex justify-between mb-2'>
                <h2>{!showAddForm ? 'All Assigned Exam' : 'Assign Exam'}</h2>
                <button className={showAddForm ? 'btnClose' : 'btnPrimary'} onClick={() => handleShowForm()}>{showAddForm ? 'Close' : 'New Assign'}</button>
            </div>
            {showAddForm ? <Suspense fallback={<Skeleton />}><AssignExam exam={exam} reFetch={setReFetchCat} closeAddForm={handleShowForm} /></Suspense> : <Suspense fallback={<Skeleton />}><AssignExamCard assignedExam={assignedExam} /></Suspense>}
        </div>
    )
}
