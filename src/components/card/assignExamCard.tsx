import React from 'react'
import { IExamAssignment } from '@/type'
import Link from 'next/link'
import NoItemFound from '../notfound'
import Skeleton from '../skeleton'
import TablePagination from '../pagination/TablePagination'
import Moment from 'react-moment';

interface AssignedExamProps {
    assignedExam: {
        data: IExamAssignment[],
        success: boolean,
        error: string,
        pagination: any
    },
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setLimit: React.Dispatch<React.SetStateAction<number>>,
    pageLimit: number
}

export default function AssignExamCard({ assignedExam, setPage, setLimit, pageLimit }: AssignedExamProps) {
    return (
        <>
            {assignedExam.data?.length === 0 && assignedExam.success ? <NoItemFound componentName='Assigned Exam' /> :
                <div className='py-4'>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Assigned By</th>
                                <th scope="col" className="px-6 py-3"> Assigned Date</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignedExam?.data?.map((exam: IExamAssignment, index: number) => {
                                return (
                                    <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{exam.userName}</td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{exam.userEmail}</td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{typeof exam.assignedBy === 'object' && 'name' in exam.assignedBy
                                            ? exam.assignedBy.name
                                            : 'Unknown Creator'}</td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><Moment date={exam.createdAt} format="D MMM YYYY" withTitle /></td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className={`p-1 rounded text-center ${exam.status === 'assigned' ? 'bg-yellow-100 text-yellow-800' : exam.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {exam.status}
                                            </div>
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <Link href={`/start-exam/${exam.examLink}`} target="_blank" className='text-supportingMegenda underline'>View</Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {assignedExam.success &&  <TablePagination pagination={assignedExam.pagination} setPage={setPage} setLimit={setLimit} pageLimit={pageLimit} /> }
                </div>}
            {!assignedExam.success && !assignedExam.error && <Skeleton />}
        </>
    )
}
