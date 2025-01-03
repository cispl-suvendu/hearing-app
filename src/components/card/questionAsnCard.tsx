import { IQuestion } from '@/type'
import React, { memo } from 'react'

interface QuestionProps {
    question: IQuestion
}
const QuestionAns = memo(({ question }: QuestionProps) => {
    const correctAns = `options_${question.isCorrect.toUpperCase()}`
    return (
        <ul className='flex gap-4 flex-wrap'>
            <li className={`rounded flex-[1_1_46%] px-4 py-2 ${correctAns === 'options_A' ? 'bg-green-500 text-white' : 'bg-skyLight'} capitalize`}>1. {question.options_A}</li>
            <li className={`rounded flex-[1_1_46%] px-4 py-2 ${correctAns === 'options_B' ? 'bg-green-500 text-white' : 'bg-skyLight'} capitalize`}>2. {question.options_B}</li>
            <li className={`rounded flex-[1_1_46%] px-4 py-2 ${correctAns === 'options_C' ? 'bg-green-500 text-white' : 'bg-skyLight'} capitalize`}>3. {question.options_C}</li>
            <li className={`rounded flex-[1_1_46%] px-4 py-2 ${correctAns === 'options_D' ? 'bg-green-500 text-white' : 'bg-skyLight'} capitalize`}>4. {question.options_D}</li>
        </ul>
    )
})   

export default QuestionAns