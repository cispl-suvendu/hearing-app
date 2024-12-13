import React from 'react'
import { VscFolderOpened } from "react-icons/vsc";


export default function NoItemFound({ componentName }: { componentName: string }) {
  return (
    <div className='flex flex-col gap-2 justify-center items-center'>
      <VscFolderOpened className='text-4xl text-primaryLight' />
      <p className='text-grayText'>No data found in {componentName}</p>
    </div>
  )
}