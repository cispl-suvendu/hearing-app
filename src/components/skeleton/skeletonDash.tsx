import React from 'react'
import Skeleton from '.'

export default function SkeletonDash() {
  return (
     <>
            <div className='top_loading flex gap-6'>
                <div className='flex-1'>
                    <Skeleton />
                </div>
                <div className='flex-1'>
                    <Skeleton />
                </div>
            </div>
            <div className='btm_loading flex flex-col gap-6 mt-6'>
                <div className='flex-1'>
                    <Skeleton />
                </div>
                <div className='flex-1'>
                    <Skeleton />
                </div>
                <div className='flex-1'>
                    <Skeleton />
                </div>
            </div>
        </>
  )
}
