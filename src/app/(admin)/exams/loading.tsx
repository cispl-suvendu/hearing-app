import React from 'react'
import Skeleton from '@/components/skeleton'

export default function Loading() {
  return (
    <div className='w-full flex flex-col gap-3 catLoading'>
      {new Array(10).fill(0).map((_i, index) => {
        return (
          <Skeleton key={index} />
        )
      })}
    </div>
  )
}
