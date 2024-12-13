import { getAllData } from '@/lib/getAll'
import React from 'react'
import QuestionHeader from '@/components/header/questionHeader'
import type { Metadata } from 'next'
import ErrorMessage from '@/components/error'
import NoItemFound from '@/components/notfound'
import Question from '@/components/card/question'
import { IQuestion } from '@/type'
export const dynamic = "force-dynamic";
import { PageProps } from '@/type'
import Pagination from '@/components/pagination'

export const metadata: Metadata = {
  title: 'Questionnaires',
  description: 'All Questionnaires',
}



export default async function Questionnaire({ searchParams }: PageProps) {

  const urlParams = await searchParams;

  const query = urlParams?.query || '';
  const currentPage = Number(urlParams?.page) || 1;
  const limit = Number(urlParams?.limit) || 5;

  const { data: allQuestions, error, success, pagination } = await getAllData({ pathName: 'question', tag: 'allQuestion', query, currentPage, limit })

  if (!success) {
    return <ErrorMessage errorDetail={error} />
  }

  if (allQuestions?.length === 0) {
    return (
      <>
        <QuestionHeader />
        <NoItemFound componentName='Category' />
      </>
    )
  }

  return (
    <div>
      <QuestionHeader />
      <div className='flex flex-col gap-3'>
        {allQuestions.map((question: IQuestion, index: number) => {
          return (
            <Question key={index} question={question} />
          )
        })}
      </div>
      <Pagination pagination={pagination} />
    </div>
  )
}
