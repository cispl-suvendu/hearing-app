'use client'
import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { BiDownArrowCircle } from "react-icons/bi";
import { TbUserHexagon } from "react-icons/tb";
import DifficultyLevel from '../difficulty';
import { IExam } from '@/type';
import { Suspense } from 'react';
import ExamDeatilsCard from './examDeatilsCard';
import Skeleton from '../skeleton';

interface ExamCardProps {
    exam: IExam
}

export default function ExamCard({ exam }: ExamCardProps) {
    return (
        <div className='bg-white p-4 px-6 rounded-md'>
            <Disclosure>
                <DisclosureButton className='w-full group'>
                    <div className='group-data-[open]:'>
                        <div className='flex justify-between items-center'>
                            <div className='text-left'>
                                <h3 className='text-md'>{exam.title}</h3>
                                <div className='flex gap-3 items-center mt-2'>
                                    <div className='text-xs text-grayText flex items-center gap-1'>
                                        <TbUserHexagon />
                                        <span>by</span>
                                        <span className='text-primaryDark'>
                                            {typeof exam.createdBy === 'object' && 'name' in exam.createdBy
                                                ? exam.createdBy.name
                                                : 'Unknown Creator'}
                                        </span>
                                    </div>
                                    <div className='flex gap-3'>
                                        <p className='text-xs text-grayText bg-skyLight px-2 py-1 rounded-sm capitalize'> {typeof exam.categoryId === 'object' && 'name' in exam.categoryId
                                            ? exam.categoryId.name
                                            : 'Unknown categoryId'}</p>
                                        <p className='text-xs text-grayText bg-skyLight px-2 py-1 rounded-sm capitalize'> {typeof exam.subcategoryId === 'object' && 'name' in exam.subcategoryId
                                            ? exam.subcategoryId.name
                                            : 'Unknown subcategoryId'}</p>
                                        <div>
                                            <DifficultyLevel level={exam.difficulty} />
                                        </div>
                                        <div className='text-xs text-grayText bg-skyLight px-2 py-1 rounded-sm capitalize'>
                                            Question: <strong>{exam.numQuestions}</strong>
                                        </div>
                                        <div className='text-xs text-grayText bg-skyLight px-2 py-1 rounded-sm capitalize'>
                                            Time: <strong>{exam.timeLimit} min</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='text-primaryDark text-sm flex items-center gap-2'>view deatils <BiDownArrowCircle className='text-xl group-data-[open]:rotate-180' /></div>
                            </div>
                        </div>
                    </div>
                </DisclosureButton>
                <DisclosurePanel className="bg-white mt-4 pt-4 text-sm border-t">
                    <Suspense fallback={<Skeleton />}>
                        <ExamDeatilsCard exam={exam} />
                    </Suspense>
                </DisclosurePanel>
            </Disclosure>
        </div>
    )
}
