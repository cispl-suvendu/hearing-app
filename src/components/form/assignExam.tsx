'use client'
import React from 'react';
import { IExam } from '@/type'
import { useFormik } from 'formik';
import { postAllData } from '@/lib/postAll';
import toast from 'react-hot-toast';
import { assignExamInitialValues, assignExamType, assignExamValidation } from '@/formData/assignExam';
import { useAuthContext } from '@/context/authContext';

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

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className='flex justify-between gap-2'>
                    <div className='inptHldr flex-1'>
                        <input
                            type="text"
                            name="userName"
                            onChange={formik.handleChange}
                            value={formik.values.userName}
                            className='inputStyle'
                            placeholder='Full Name'
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.userName && formik.errors.userName ? (
                            <div className='errorMsg'>{formik.errors.userName}</div>
                        ) : null}
                    </div>
                    <div className='inptHldr flex-1'>
                        <input
                            type="text"
                            name="userEmail"
                            onChange={formik.handleChange}
                            value={formik.values.userEmail}
                            className='inputStyle'
                            placeholder='Email'
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.userEmail && formik.errors.userEmail ? (
                            <div className='errorMsg'>{formik.errors.userEmail}</div>
                        ) : null}
                    </div>
                    <div className='btnHldr'>
                        <button type="submit" className='btnPrimary' disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}>{formik.isSubmitting ? 'Please Wait...' : !(formik.isValid && formik.dirty) ? 'Add info' : 'Assign'}</button>
                    </div>
                </div>
            </form>
        </>
    );
}
