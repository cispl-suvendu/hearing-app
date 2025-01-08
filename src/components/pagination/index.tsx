'use client'
import React, { useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {
    pagination: {
        total: number,
        page: number,
        limit: number,
        totalPages: number
    }
}

export default function Pagination({ pagination }: PaginationProps) {
    const { total, page, limit, totalPages } = pagination
    const countArray = [];
    for (let i = 1; i <= totalPages; i++) {
        countArray.push(i)
    }
    const [pageLimit, setPageLimit] = useState(limit)
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    //const currentPageLimit = Number(searchParams.get('limit')) || 5;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        replace(`${pathname}?${params.toString()}`);
    };
    const createPageLimit = (pageLimit: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('limit', pageLimit.toString());
        replace(`${pathname}?${params.toString()}`);
        setPageLimit(Number(pageLimit))
    }
    return (
        <div className='mt-6 flex flex-col md:flex-row gap-6 justify-between'>
            <div className='bg-white px-4 rounded text-xs text-gray-500 flex items-center justify-center'>
                Shwoing {total > page * limit ? page * limit : total} of {total}
            </div>
            <div>
                <select className='bg-white px-2 py-3 rounded' onChange={(e) => createPageLimit(e.target.value)} value={pageLimit}>
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>50</option>
                    <option>100</option>
                </select>
            </div>
            <div className='flex gap-2 flex-wrap'>
                {countArray.map(i => {
                    return (
                        <div onClick={() => page !== i && createPageURL(i)} key={i} className={`px-4 py-2 rounded ${page == i ? 'bg-gray-500 text-white cursor-not-allowed' : 'cursor-pointer bg-white'}`}>{i}</div>
                    )
                })}
            </div>
        </div>
    )
}
