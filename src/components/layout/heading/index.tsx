'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

export default function Heading() {
  const pathname = usePathname()
  const str = pathname;
  const title = str.split("/")[1];
  return (
    <div className='mb-6'>
      <h1 className='capitalize text-2xl font-mono'>{!title ? "Dashboard" : title}</h1>
    </div>
  )
}
