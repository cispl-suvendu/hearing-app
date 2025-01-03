import React from 'react'
import { IExamAssignment } from '@/type'
import Link from 'next/link'
import NoItemFound from '../notfound'
import Moment from 'react-moment';
import DeleteCard from '../card/deleteCard';

interface AssignedExamProps {
    assignedExam:any
}

export default function ListCard({ assignedExam}: AssignedExamProps) {
    return (
        <>
            {assignedExam.data?.length === 0 && assignedExam.success ? <NoItemFound componentName='Assigned Exam' /> :
                <div className='py-4'>
                    <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Assigned By</th>
                                <th scope="col" className="px-6 py-3"> Assigned Date</th>
                                <th scope="col" className="px-6 py-3">Link</th>
                                <th scope="col" className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignedExam?.map((exam: IExamAssignment, index: number) => {
                                return (
                                    <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{exam.userName}</td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{typeof exam.assignedBy === 'object' && 'name' in exam.assignedBy
                                            ? exam.assignedBy.name
                                            : 'Unknown Creator'}</td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><Moment date={exam.createdAt} format="D MMM YYYY" withTitle /></td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <Link href={`/start-exam/${exam.examLink}`} target="_blank" className='text-supportingMegenda underline'>View</Link>
                                        </td>
                                        <td><DeleteCard pathName='examAssignment' id={exam?._id} tags='examAssignment' /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>}
        </>
    )
}
