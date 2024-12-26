'use client'
import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import ListCard from './ListCard'

export default function FilterList({ exam, title }: any) {
    return (
        <>
            <Disclosure as="div" className="mb-2">
                <DisclosureButton className={`w-full`}>
                    <div className={`bg-white p-2 px-6 rounded-xl flex justify-between items-center`}>
                        <div className='flex items-center gap-4'>
                        <div className='text-sm'>{title}:</div>
                        <div className='bg-supportingMegenda w-6 h-6 rounded flex justify-center items-center text-xs text-white'>{exam?.length}</div>
                        </div>
                        <div className='text-sm text-grayText'>
                            View All 
                        </div>
                    </div>
                </DisclosureButton>
                <DisclosurePanel>
                   <ListCard assignedExam={exam} />
                </DisclosurePanel>
            </Disclosure>
        </>
    )
}
