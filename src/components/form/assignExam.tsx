'use client'
import React from 'react';
import { IExam } from '@/type'
import { useFormik } from 'formik';
import { postAllData } from '@/lib/postAll';
import toast from 'react-hot-toast';
import { assignExamInitialValues, assignExamType, assignExamValidation } from '@/formData/assignExam';
import { useAuthContext } from '@/context/authContext';
import MultiInput from './multiInput';

interface AssignExamProps {
    exam: IExam,
    reFetch: React.Dispatch<React.SetStateAction<boolean>>,
    closeAddForm: () => void
}

export default function AssignExam({ exam, reFetch, closeAddForm }: AssignExamProps) {
    const { user } = useAuthContext()
    const formik = useFormik({
        initialValues: assignExamInitialValues,
        validationSchema: assignExamValidation,
        onSubmit: (values: assignExamType) => {
            handleSubmit(values)
        }
    })

    const handleSubmit = async (values: assignExamType) => {
        const payload = {
            ...values,
            examId: exam._id,
            assignedBy: user?.id
        }
        const { success, message, error } = await postAllData('examAssignment', payload)
        if (success) {
            formik.resetForm()
            toast.success(message);
            reFetch(true)
            closeAddForm()
        }
        if (!success) {
            formik.setSubmitting(false)
            toast.error(message);
        }
        if (error) {
            formik.setSubmitting(false)
            toast.error(error)
        }
    }

    console.log("formik.values", formik)

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className='flex justify-between gap-2'>
                    <div className='inptHldr flex-1'>
                        <MultiInput formik={formik} filedName="userName" label="Assignee name" />
                    </div>
                    <div className='inptHldr flex-1'>
                        <MultiInput formik={formik} filedName="userEmail" label="Assignee email" />
                    </div>
                </div>
                <div className='flex justify-end mt-4'>
                <div className='btnHldr'>
                    <button type="button" className='btnPrimary' disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)} onClick={()=>formik.handleSubmit()}>{formik.isSubmitting ? 'Please Wait...' : !(formik.isValid && formik.dirty) ? 'Add info' : 'Assign'}</button>
                </div>
                </div>
            </form>
        </>
    );
}
