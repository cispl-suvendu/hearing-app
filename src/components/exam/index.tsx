'use client'
import React, { useEffect, useState } from 'react'
import StartExam from './startExam'
import CountdownTimer from './countDown'
import ListQuestion from './listQuestion'

export default function ExamComponent({ exam }: any) {
    const [start, setStart] = useState<boolean>(true)
    const [showAnimation, setShowAnimation] = useState<boolean>(false)
    const handleGetStatred = () => {
        setShowAnimation(prev => !prev)
        setTimeout(() => {
            setStart(prev => !prev)
        }, 4600)
    }
    return (
        <div>
            {start ? <div className='pt-16'>
                <StartExam exam={exam} handleGetStatred={handleGetStatred} showAnimation={showAnimation} />
            </div> : <>
                <div className='flex justify-end pt-6'>
                    <CountdownTimer timeInSeconds={Number(exam[0]?.examId.timeLimit) * 60} />
                </div>
                <div>
                    <ListQuestion allQuestion={exam[0]?.examId.questions} />
                </div>
            </>}
        </div>
    )
}
