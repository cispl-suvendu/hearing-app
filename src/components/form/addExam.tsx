'use client'
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { postAllData } from '@/lib/postAll';
import toast from 'react-hot-toast';
import { examInitialValues, examType, examValidation } from '@/formData/exam';
import { ICategory, ISubcategory } from '@/type';
import { timeLimit } from '@/constant/timeLimit';
import { numQuestions } from '@/constant/numQuestions';
import { difficultyLevel } from '@/constant/difficulty';
import { useAuthContext } from '@/context/authContext';

interface ExamInterface {
    categories: ICategory[],
    subCategories: ISubcategory[]
}

export default function AddExam({ categories, subCategories }: ExamInterface) {

    const { user } = useAuthContext()

    const formik = useFormik({
        initialValues: examInitialValues,
        validationSchema: examValidation,
        onSubmit: (values: examType) => {
            handleSubmit(values);
        }
    });

    const handleSubmit = async (values: examType) => {

        const payload = {
            ...values,
            createdBy: user?.id
        }

        const { success, message, error } = await postAllData('exam', payload, 'allExam');

        if (success) {
            formik.resetForm();
            toast.success(message);
        }

        if (!success) {
            toast.error(message);
        }

        if (error) {
            toast.error(error);
        }
    };

    const subCategoryById = formik.values.categoryId ? subCategories.filter((cat: ISubcategory) => cat.categoryId._id as unknown as string === formik.values.categoryId) : subCategories

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='flex justify-between gap-2'>
                <div className='inptHldr flex-1'>
                    <input type='text' value={formik.values.title} onChange={formik.handleChange} name='title' placeholder='Title' className='inputStyle' />
                    {formik.touched.title && formik.errors.title ? (
                        <div className='errorMsg'>{formik.errors.title as string}</div> // Ensure it's a string
                    ) : null}
                </div>
                <div className='inptHldr flex-1'>
                    <select value={formik.values.categoryId} onChange={formik.handleChange} className='inputStyle' name='categoryId'>
                        <option value=''>Select Category</option>
                        {categories.map((cat: ICategory) => {
                            return (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            )
                        })}
                    </select>
                    {formik.touched.categoryId && formik.errors.categoryId ? (
                        <div className='errorMsg'>{formik.errors.categoryId as string}</div> // Ensure it's a string
                    ) : null}
                </div>
                <div className='inptHldr flex-1'>
                    <select value={formik.values.subcategoryId} onChange={formik.handleChange} className='inputStyle' name='subcategoryId'>
                        <option value=''>Select Sub Category</option>
                        {subCategoryById.map((cat: ICategory) => {
                            return (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            )
                        })}
                    </select>
                    {formik.touched.subcategoryId && formik.errors.subcategoryId ? (
                        <div className='errorMsg'>{formik.errors.subcategoryId as string}</div> // Ensure it's a string
                    ) : null}
                </div>
                <div className='inptHldr flex-1'>
                    <select value={formik.values.difficulty} onChange={formik.handleChange} className='inputStyle' name='difficulty'>
                        <option value=''>Select Difficulty Level</option>
                        {difficultyLevel.map(item => {
                            return (
                                <option key={item.id} value={item.id}>{item.key}</option>
                            )
                        })}
                    </select>
                    {formik.touched.difficulty && formik.errors.difficulty ? (
                        <div className='errorMsg'>{formik.errors.difficulty as string}</div>
                    ) : null}
                </div>
                <div className='inptHldr flex-1'>
                    <select value={formik.values.numQuestions} onChange={formik.handleChange} className='inputStyle' name='numQuestions'>
                        <option value=''>Select Number of Questions</option>
                        {numQuestions.map(item => {
                            return (
                                <option key={item} value={item}>{item}</option>
                            )
                        })}
                    </select>
                    {formik.touched.numQuestions && formik.errors.numQuestions ? (
                        <div className='errorMsg'>{formik.errors.numQuestions as string}</div>
                    ) : null}
                </div>
                <div className='inptHldr flex-1'>
                    <select value={formik.values.timeLimit} onChange={formik.handleChange} className='inputStyle' name='timeLimit'>
                        <option value=''>Select Time Limit</option>
                        {timeLimit.map(item => {
                            return (
                                <option key={item} value={item}>{item}</option>
                            )
                        })}
                    </select>
                    {formik.touched.timeLimit && formik.errors.timeLimit ? (
                        <div className='errorMsg'>{formik.errors.timeLimit as string}</div>
                    ) : null}
                </div>
                <div className='btnHldr'>
                    <button type="submit" className='btnPrimary' disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}>{formik.isSubmitting ? 'Please Wait...' : !(formik.isValid && formik.dirty) ? 'Add your info' : 'Add'}</button>
                </div>
            </div>
        </form>
    );
}
