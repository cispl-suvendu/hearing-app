'use client'
import React, { useEffect, useState, useMemo } from 'react'
import StartExam from './startExam'
import CountdownTimer from './countDown'
import ListQuestion from './listQuestion'
import { useFormik } from 'formik'
import { startExamInitialValues, startExamType } from '@/formData/startExam'
import { postAssignedExam } from '@/lib/getAssignedExam'
import toast from 'react-hot-toast'


export default function ExamComponent({ exam }: any) {
    const [timeEnd, setTimeEnd] = useState<boolean>(false)
    const [start, setStart] = useState<boolean>(true)
    const [showAnimation, setShowAnimation] = useState<boolean>(false)
    const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false)

    const handleGetStatred = () => {
        setShowAnimation(prev => !prev)
        setTimeout(() => {
            setStart(prev => !prev)
        }, 4600)
    }

    function shuffleArray(array: any) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
        }
        return shuffled;
    }

    // Memoize shuffled questions
    const shuffledAllQuestion = useMemo(() => shuffleArray(exam[0]?.examId.questions), [exam[0]?.examId._id]);

    const getTimeLeft = (time: number) => {
        if (time === 1) {
            setTimeEnd(true)
        }
    }

    const formik = useFormik({
        initialValues: startExamInitialValues(shuffledAllQuestion),
        onSubmit: (values: startExamType) => {
            handleSubmit(values);
        },
    });

    const handleSubmit = async (values: startExamType) => {
        const payload = {
            answer: values.answer,
        }

        const response = await postAssignedExam({ pathName: 'examAssignment', id: exam[0].examLink, body: payload });

        if (response.success) {
            toast.success(response.message)
            setIsExamCompleted(true)
            setShowAnimation(false)
        }

        if (!response.success) {
            toast.error(response.message)
        }

    };

    useEffect(() => {
        if (timeEnd) {
            formik.handleSubmit()
        }
    }, [timeEnd]);

     console.log(shuffledAllQuestion, formik.values.answer, exam[0]?.examId._id, 'timeEnd', timeEnd);

    if (isExamCompleted) {
        return (
            <div className='pt-16'>
                <StartExam exam={exam} handleGetStatred={handleGetStatred} showAnimation={showAnimation} isExamCompleted={isExamCompleted} />
            </div>
        )
    }


    return (
        <div>
            {start ? <div className='pt-16'>
                <StartExam exam={exam} handleGetStatred={handleGetStatred} showAnimation={showAnimation} isExamCompleted={isExamCompleted} />
            </div> : <>
                <div className='flex justify-end pt-6'>
                    <CountdownTimer timeInSeconds={exam[0]?.examId.timeLimit * 60} getTimeLeft={getTimeLeft} />
                </div>
                <div>
                    <ListQuestion allQuestion={shuffledAllQuestion} formik={formik} shuffleArray={shuffleArray} />
                </div>
            </>}
        </div>
    )
}
