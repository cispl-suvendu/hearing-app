import { getAllData } from '@/lib/getAll'
import React from 'react'
import { PageProps } from '@/type'
import AllAssignment from '@/components/assignment';


export default async function Page({ searchParams }: PageProps) {
  const urlParams = await searchParams;
  const query = urlParams?.query || '';
  const currentPage = Number(urlParams?.page) || 1;
  const limit = Number(urlParams?.limit) || 10;
    const allAssignedExam = await getAllData({pathName:'examAssignment', query, currentPage, limit})
  return (
    <div>
      <AllAssignment allAssignedExam={allAssignedExam} />
    </div>
  )
}
