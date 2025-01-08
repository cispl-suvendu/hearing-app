'use client'
import { getDataById } from '@/lib/getById'
import React, { Suspense, useEffect, useState } from 'react'
import ErrorMessage from '../error'
import SubCategoryCard from '../card/subCategory'
import NoItemFound from '../notfound'
import { ISubcategory } from '@/type'
const LazyAddSubCat = React.lazy(() => import('../form/addSubCat'))
import { Types } from 'mongoose';
import Skeleton from '../skeleton'


interface SubCategoryLayoutProps {
  catId: string,
  createdBy: Types.ObjectId | {
    _id: string;
    name: string;
    email: string;
  }
}

export default function SubCategoryLayout({ catId, createdBy }: SubCategoryLayoutProps) {
  const [reFetchCat, setReFetchCat] = useState<boolean>(false)
  const [SubCat, setSubCat] = useState({
    data: [],
    success: false,
    error: ''
  })
  const getData = async () => {
    const { data, success, error } = await getDataById('subCategory', 'categoryId', catId, `subCat${catId}`)
    if (success) {
      setSubCat(prevdata => ({
        ...prevdata,
        data,
        success,
        error
      }))
    }
  }
  useEffect(() => {
    getData()
    return () => {
      setSubCat({
        data: [],
        success: false,
        error: ''
      })
      setReFetchCat(false)
    }
  }, [catId, reFetchCat])

  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const handleShowForm = () => {
    setShowAddForm(prev => !prev)
  }

  if (!!SubCat.error) {
    return <ErrorMessage errorDetail={SubCat.error} />
  }

  return (
    <>
      <div className='flex justify-between mb-2'>
        <h2>{!showAddForm ? 'All Sub Category' : 'Add Sub Category'}</h2>
        <button className={showAddForm ? 'btnClose' : 'btnPrimary'} onClick={() => handleShowForm()}>{showAddForm ? 'Close' : 'Add'}</button>
      </div>
      {showAddForm ? <Suspense fallback={<Skeleton />}><LazyAddSubCat catId={catId} createdBy={createdBy} reFetch={setReFetchCat} closeAddForm={handleShowForm} /></Suspense> : <>
        <div className='flex gap-2 flex-wrap'>
          {SubCat.data.map((data: ISubcategory, index) => {
            return (
              <Suspense key={index} fallback={<Skeleton />}>
                <SubCategoryCard key={index} subCat={data} reFetch={setReFetchCat} />
              </Suspense>
            )
          })}
        </div>
        {SubCat.data.length === 0 && SubCat.success && <NoItemFound componentName='Sub Category' />}
        {!SubCat.success && !SubCat.error && <Skeleton />}
      </>}
    </>
  )
}
