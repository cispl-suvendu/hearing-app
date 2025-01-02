'use client'
import React, { useEffect } from 'react'
import { MdOutlineDelete } from "react-icons/md";
import Modal from '../modal';
import { handleDelete } from '../../lib/handleDelete';
import toast from 'react-hot-toast';

interface DeleteCardProps {
    pathName: string,
    id: string,
    tags: string,
}

export default function DeleteCard({ pathName, id, tags }: DeleteCardProps) {
    const [open, setOpen] = React.useState(false)
    const [input, setInput] = React.useState('')
    const [inActive, setInActive] = React.useState(true)
    const checkInput = () => {
        if (input === 'confirm') {
            setInActive(false)
        }
    }

    useEffect(() => {
        if (open) {
            setInput('')
            setInActive(true)
        }
    }, [open])

    useEffect(() => {
        checkInput()
    }, [input])


    const startDelete = async () => {
        const respose = await handleDelete({ pathName, id, tags })
        if (respose?.success) {
            setOpen(false)
            toast.success(respose.message)
        }
        if (!respose?.success) {
            setOpen(false)
            toast.success(respose.message)
        }
    }


    return (
        <div>
            <MdOutlineDelete onClick={() => setOpen(true)} className='text-red-500 text-xl cursor-pointer hover:opacity-60' />
            {open && (<Modal open={open} close={setOpen}>
                <div className='max-w-4xl space-y-6 bg-white p-12 rounded'>
                    <div className='text-supportingSky font-bold text-xl'>Are you sure you want to delete this card?</div>
                    <div>
                        <input type='text' placeholder='Type DELETE to confirm' className='w-full border border-gray-200 p-2 rounded' onChange={(e) => setInput(e.target.value)} value={input} />
                    </div>
                    <div className='flex justify-end gap-4'>
                        <button className='bg-red-500 text-white px-4 py-2 rounded disabled:opacity-35 disabled:cursor-not-allowed' disabled={inActive} onClick={() => startDelete()}>Delete</button> <button onClick={() => setOpen(false)} className='bg-gray-200 text-gray-500 px-4 py-2 rounded'>Cancel</button>
                    </div>
                </div>
            </Modal>)}
        </div>
    )
}
