import React from 'react'
import startImage from '../../assets/start-exam.jpg'
import Image from 'next/image'
import StartAnimation from './StartAnimation'
import { useRouter } from 'next/navigation';

interface startExamProps {
    exam: any,
    handleGetStatred: () => void;
    showAnimation: boolean,
    isExamCompleted: boolean
}

export default function StartExam({ exam, handleGetStatred, showAnimation, isExamCompleted }: startExamProps) {

    const router = useRouter()

    return (
        <div className='relative z-20'>
            <div className={`${showAnimation && 'opacity-30'} bg-white p-12 rounded-xl w-8/12 mx-auto`}>
                <div className='w-full relative h-60 overflow-clip bg-grayText rounded-xl z-10'>
                    <Image src={startImage} width={640} height={427} alt='Start Image' placeholder='blur' className='w-full rounded-xl absolute left-0 top-0 h-full object-cover mix-blend-overlay opacity-50 z-[1]' />
                    <div className='z-10 absolute left-0 bottom-0 p-4 flex gap-2'>
                        <div className='bg-white rounded text-xs p-1'>{exam[0]?.examId.title}</div>
                        <div className='bg-white rounded text-xs p-1'>Question: {exam[0]?.examId.numQuestions}</div>
                        <div className='bg-white rounded text-xs p-1'>Time: {exam[0]?.examId.timeLimit} min</div>
                        <div className='bg-white rounded text-xs p-1 capitalize'>Status: {isExamCompleted ? 'completed' : exam[0]?.status}</div>
                    </div>
                </div>
                <div className='mt-6'>
                    <h1 className='text-xl font-mono my-2'>Hello, <strong className='font-bold'>{exam[0]?.userName}</strong></h1>
                    {exam[0]?.status === 'completed' || isExamCompleted ? <div className='mt-4'>
                        <p className='text-grayText'>You have completed this exam. Click 'View Result' to see your score.</p>
                    </div> :
                        <div className='mt-4'>
                            <p className='text-grayText'>Get ready to test your knowledge! Click 'Start Exam' to begin and challenge yourself with carefully curated questions.</p>
                        </div>}
                </div>
                {exam[0]?.status === 'completed' || isExamCompleted ? <div className='mt-4'>
                    <button className='btnClose w-full' onClick={() => router.push(`/result/${exam[0]?.examLink}`)}>View Result</button>
                </div> :
                    <div className='mt-4'>
                        <button className='btnPrimary w-full' onClick={() => handleGetStatred()}>Start Exam</button>
                    </div>}
            </div>
            {showAnimation && <StartAnimation />}
        </div>
    )
}
