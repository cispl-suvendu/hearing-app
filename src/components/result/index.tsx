import React from 'react'
import AnsCard from './asnCard'

export default function ResultComponent({ data }: { data: any }) {
    return (
        <div className='bg-white p-12 rounded-xl w-8/12 mx-auto'>
            <div className={`${data?.score >= 5 ? 'bg-green-100 border border-green-500' : 'bg-red-100 border border-red-500'} px-6 py-2 text-center font-bold text-md rounded-md`}>You have scored {data?.score} out of {data?.total_marks}</div>
            <div>
                {data?.result.map((item: any, index: number) => {
                    return (
                        <AnsCard question={item} key={index} />
                    )
                })}
            </div>
        </div>
    )
}
