import React from 'react'
import { getAllData } from '@/lib/getAll'
import CategoryCard from '@/components/card/category'
import { ICategory } from '@/type'
import ErrorMessage from '@/components/error'
import NoItemFound from '@/components/notfound'
import CatHeader from '../../../components/header/catHeader'
export const dynamic = "force-dynamic";
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Categories',
  description: 'categories and sub categories',
}

export default async function Page() {
  const { success, data: allCat, error } = await getAllData({ pathName: 'category', tag: 'allCat' })

  if (!success) {
    return <ErrorMessage errorDetail={error} />
  }

  if (allCat?.length === 0) {
    return (
      <>
        <CatHeader />
        <NoItemFound componentName='Category' />
      </>
    )
  }

  return (
    <div>
      <CatHeader />
      <div className='flex flex-col gap-3'>
        {allCat?.map((cat: ICategory) => {
          return (
            <CategoryCard key={cat._id} singleCat={cat} />
          )
        })}
      </div>
    </div>
  )
}
