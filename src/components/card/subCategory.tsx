import { ISubcategory } from '@/type'
import React from 'react'
import DeleteCard from './deleteCard'

interface SubCategoryCardProps {
  subCat: ISubcategory,
  reFetch:React.Dispatch<React.SetStateAction<boolean>>,
}

export default function SubCategoryCard({ subCat, reFetch }: SubCategoryCardProps) {

  const [update, setUpdate] = React.useState<boolean>(false)

  return (
    <div className='px-2 py-2 bg-skyLight'>
      <span className='text-black capitalize'>{subCat.name}</span>
      <DeleteCard pathName='subCategory' id={subCat._id} tags='allSubcat'/>
    </div>
  )
}
