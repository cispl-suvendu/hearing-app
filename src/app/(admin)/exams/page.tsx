import React, { Suspense } from 'react'
import ExamHeader from '@/components/header/examHeader'
import { Metadata } from 'next'
import { getAllData } from '@/lib/getAll'
// export const dynamic = "force-dynamic";
import ErrorMessage from '@/components/error'
import NoItemFound from '@/components/notfound'
import ExamCard from '@/components/card/exam';
import { IExam, PageProps } from '@/type';
import Pagination from '@/components/pagination';
import Skeleton from '@/components/skeleton'

export const metadata: Metadata = {
  title: 'Exams',
  description: 'Exams will show here',
}

export default async function ExamPage({ searchParams }: PageProps) {

  const urlParams = await searchParams;
  const query = urlParams?.query || '';
  const currentPage = Number(urlParams?.page) || 1;
  const limit = Number(urlParams?.limit) || 10;

  const { success, data: allExam, error, pagination } = await getAllData({ pathName: 'exam', tag: 'allExam', query, currentPage, limit })

  if (!success) {
    return <ErrorMessage errorDetail={error} />
  }

  if (allExam?.length === 0) {
    return (
      <>
        <ExamHeader />
        <NoItemFound componentName='Exam' />
      </>
    )
  }

  return (
    <div>
      <ExamHeader />
      <Suspense fallback={<Skeleton />}>
        <div className='flex flex-col gap-3'>
          {allExam.map((exam: IExam, index: number) => {
            return (
              <ExamCard key={index} exam={exam} />
            )
          })}
        </div>
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <Pagination pagination={pagination} />
      </Suspense>
    </div>
  )
}
