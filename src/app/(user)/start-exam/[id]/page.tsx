import React from 'react'
import StartExam from '@/components/exam/startExam'
import { getAssignedExam } from '@/lib/getAssignedExam'
import NoItemFound from '@/components/notfound'
import ExamComponent from '@/components/exam'

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const slug = (await params).id
    const { data: exam, success, error } = await getAssignedExam({ pathName: 'examAssignment', id: slug })
    if (!success) {
        return (
            <div className='bg-white p-12 rounded-xl w-8/12 mx-auto'>
                <NoItemFound componentName='Exam' />
            </div>
        )
    }
    return (
       <ExamComponent exam={exam} />
    )
}
