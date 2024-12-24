import React from 'react'
import { getAssignedExam } from '@/lib/getAssignedExam'
import NoItemFound from '@/components/notfound'
import ResultComponent from '@/components/result'


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
                <NoItemFound componentName='Result' />
            </div>
        )
    }
    return (
        <div className='pt-10 pb-10'>
            <ResultComponent data={exam[0]?.result} />
        </div>
    )
}
