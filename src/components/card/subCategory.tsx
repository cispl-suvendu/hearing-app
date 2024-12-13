import { ISubcategory } from '@/type'
import React from 'react'

interface SubCategoryCardProps {
  subCat: ISubcategory
}

export default function SubCategoryCard({ subCat }: SubCategoryCardProps) {

  return (
    <div className='px-2 py-2 bg-skyLight'>
      <span className='text-black capitalize'>{subCat.name}</span>
    </div>
  )
}
