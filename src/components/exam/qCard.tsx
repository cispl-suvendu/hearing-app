import React from 'react'

export default function QCard({ question }: any) {
    return (
        <div className='bg-white my-2 p-4 rounded'>
            <h2 className='text-xl font-mono'>{question.questionText}</h2>
            <ul className='flex gap-4 flex-wrap mt-4 '>
                <li className='w-[48%]'>
                    <div className='w-full relative'>
                        <input type='radio' name={`option-${question._id}`} value='a' className='customRadio' />
                        <span className='customRadioLbl'>1. {question.options_A}</span>
                    </div>
                </li>
                <li className='w-[48%]'>
                    <div className='w-full relative'>
                        <input type='radio' name={`option-${question._id}`} value='b' className='customRadio' />
                        <span className='customRadioLbl'>2. {question.options_B}</span>
                    </div>
                </li>
                <li className='w-[48%]'>
                    <div className='w-full relative'>
                        <input type='radio' name={`option-${question._id}`} value='c' className='customRadio' />
                        <span className='customRadioLbl'>3. {question.options_C}</span>
                    </div>
                </li>
                <li className='w-[48%]'>
                    <div className='w-full relative'>
                        <input type='radio' name={`option-${question._id}`} value='d' className='customRadio' />
                        <span className='customRadioLbl'>4. {question.options_D}</span>
                    </div>
                </li>
            </ul>
            <div className='mt-4'>
                <button className='btnPrimary'>Next</button>
            </div>
        </div>
    )
}
