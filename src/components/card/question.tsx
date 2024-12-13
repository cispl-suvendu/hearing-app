import { IQuestion } from '@/type'
import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { BiDownArrowCircle } from "react-icons/bi";
import { TbUserHexagon } from "react-icons/tb";
import DifficultyLevel from '../difficulty';

interface QuestionProps {
    question: IQuestion
}

export default function Question({ question }: QuestionProps) {
  const correctAns = `options_${question.isCorrect.toUpperCase()}`

    return (
        <div className='bg-white p-4 px-6 rounded-md'>
            <Disclosure>
                <DisclosureButton className='w-full group'>
                    <div className='group-data-[open]:'>
                        <div className='flex justify-between items-center'>
                            <div className='text-left'>
                                <h3 className='text-md'>{question.questionText}</h3>
                                <div className='flex gap-3 items-center mt-2'>
                                    <div className='text-xs text-grayText flex items-center gap-1'>
                                        <TbUserHexagon />
                                        <span>by</span>
                                        <span className='text-primaryDark'>
                                            {typeof question.createdBy === 'object' && 'name' in question.createdBy
                                                ? question.createdBy.name
                                                : 'Unknown Creator'}
                                        </span>
                                    </div>
                                    <div className='flex gap-3'>
                                        <p className='text-xs text-grayText bg-skyLight px-2 py-1 rounded-sm capitalize'> {typeof question.categoryId === 'object' && 'name' in question.categoryId
                                            ? question.categoryId.name
                                            : 'Unknown categoryId'}</p>
                                        <p className='text-xs text-grayText bg-skyLight px-2 py-1 rounded-sm capitalize'> {typeof question.subcategoryId === 'object' && 'name' in question.subcategoryId
                                            ? question.subcategoryId.name
                                            : 'Unknown subcategoryId'}</p>
                                        <div>
                                            <DifficultyLevel level={question.difficulty} />
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
                    <ul className='flex gap-4 flex-wrap'>
                        <li className={`rounded flex-[1_1_46%] px-4 py-2 ${correctAns === 'options_A' ? 'bg-green-500 text-white' : 'bg-skyLight'} capitalize`}>1. {question.options_A}</li>
                        <li className={`rounded flex-[1_1_46%] px-4 py-2 ${correctAns === 'options_B' ? 'bg-green-500 text-white' : 'bg-skyLight'} capitalize`}>2. {question.options_B}</li>
                        <li className={`rounded flex-[1_1_46%] px-4 py-2 ${correctAns === 'options_C' ? 'bg-green-500 text-white' : 'bg-skyLight'} capitalize`}>3. {question.options_C}</li>
                        <li className={`rounded flex-[1_1_46%] px-4 py-2 ${correctAns === 'options_D' ? 'bg-green-500 text-white' : 'bg-skyLight'} capitalize`}>4. {question.options_D}</li>
                    </ul>
                </DisclosurePanel>
            </Disclosure>
        </div>
    )
}
