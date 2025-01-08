import { IQuestion } from '@/type'
import React, { memo } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { BiDownArrowCircle } from "react-icons/bi";
import { TbUserHexagon } from "react-icons/tb";
import DifficultyLevel from '../difficulty';
import DeleteCard from './deleteCard';
const QuestionAns = React.lazy(() => import('./questionAsnCard'));

interface QuestionProps {
    question: IQuestion
}

const Question = memo(({ question }: QuestionProps) => {
    return (
        <div className='bg-white p-4 px-6 rounded-md'>
            <Disclosure>
                <DisclosureButton className='w-full group'>
                    <div className='group-data-[open]:'>
                        <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                            <div className='text-left'>
                                <h3 className='text-md'>{question.questionText}</h3>
                                <div className='flex flex-wrap gap-3 items-center mt-2'>
                                    <div className='text-xs text-grayText flex items-center gap-1'>
                                        <TbUserHexagon />
                                        <span>by</span>
                                        <span className='text-primaryDark'>
                                            {
                                                question.createdBy && typeof question.createdBy === 'object' && 'name' in question.createdBy
                                                    ? question.createdBy.name
                                                    : 'Unknown User'
                                            }
                                        </span>
                                    </div>
                                    <div className='flex gap-3'>
                                        <p className='text-xs text-grayText bg-skyLight px-2 py-1 rounded-sm capitalize'> {question.categoryId && typeof question.categoryId === 'object' && 'name' in question.categoryId
                                            ? question.categoryId.name
                                            : 'Unknown categoryId'}</p>
                                        <p className='text-xs text-grayText bg-skyLight px-2 py-1 rounded-sm capitalize'> {question.subcategoryId && typeof question.subcategoryId === 'object' && 'name' in question.subcategoryId
                                            ? question.subcategoryId.name
                                            : 'Unknown subcategoryId'}</p>
                                        <div>
                                            <DifficultyLevel level={question.difficulty} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-between mt-4 md:mt-0 md:justify-end gap-2'>
                                <div className='text-primaryDark text-sm flex items-center gap-2'>view deatils <BiDownArrowCircle className='text-xl group-data-[open]:rotate-180' /></div>
                                <DeleteCard pathName='question' id={question._id} tags='allQuestion' />
                            </div>
                        </div>
                    </div>
                </DisclosureButton>
                <DisclosurePanel className="bg-white mt-4 pt-4 text-sm border-t">
                    <QuestionAns question={question} />
                </DisclosurePanel>
            </Disclosure>
        </div>
    )
})

export default Question


