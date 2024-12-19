'use client'
import React from 'react'
import { useFormik } from 'formik';
import { postAllData } from '@/lib/postAll';
import toast from 'react-hot-toast';
import { signUpInitialValues, signUpType, signUpValidation } from '@/formData/signUp';
import DOMPurify from 'dompurify';

export default function AddUser() {

    const formik = useFormik({
        initialValues: signUpInitialValues,
        validationSchema: signUpValidation,
        onSubmit: (values: signUpType) => {
            handleSubmit(values)
        }
    })

    const handleSubmit = async (values: signUpType) => {
        const { success, message, error } = await postAllData('user', values, 'allUser')
        if (success) {
            formik.resetForm()
            toast.success(message);
        }
        if (!success) {
            toast.error(error);
        }
    }

    const setInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = DOMPurify.sanitize(e.target.value);
        formik.setFieldValue(e.target.name, sanitizedValue);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='flex justify-between gap-2'>
                <div className='inptHldr flex-1'>
                    <input
                        type="text"
                        name="name"
                        onChange={setInputVal}
                        value={formik.values.name}
                        className='inputStyle'
                        placeholder='Full Name'
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className='errorMsg'>{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className='inptHldr flex-1'>
                    <input
                        type="text"
                        name="email"
                        onChange={setInputVal}
                        value={formik.values.email}
                        className='inputStyle'
                        placeholder='Email'
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className='errorMsg'>{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className='inptHldr flex-1'>
                    <input
                        type="password"
                        name="password"
                        onChange={setInputVal}
                        value={formik.values.password}
                        className='inputStyle'
                        placeholder='Password'
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className='errorMsg'>{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className='btnHldr'>
                    <button type="submit" className='btnPrimary'>Add</button>
                </div>
            </div>
        </form>
    )
}
