import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { postAllData } from '@/lib/postAll';
import toast from 'react-hot-toast';
import { questionInitialValues, questionValidation, questionType } from '@/formData/question';
import { ICategory, ISubcategory } from '@/type';
import { useAuthContext } from '@/context/authContext';

interface AddQuestionProps {
    categories: ICategory[],
    subCategories: ISubcategory[]
}

export default function AddQuestion({ categories, subCategories }: AddQuestionProps) {
    const { user } = useAuthContext()

    const formik = useFormik({
        initialValues: questionInitialValues,
        validationSchema: questionValidation,
        onSubmit: (values: questionType) => {
            handleSubmit(values);
        }
    });

    const handleSubmit = async (values: questionType) => {
        const { categoryId, subcategoryId, file } = values;

        // Create a FormData object to append the form fields
        const formData = new FormData();
        formData.append('categoryId', categoryId);
        formData.append('subcategoryId', subcategoryId);
        formData.append('createdBy', user?.id);
        if (file) {
            formData.append('file', file);
        }

        // Send the FormData to your API
        const { success, message, error } = await postAllData('question', formData, 'allQuestion');

        if (success) {
            formik.resetForm();
            toast.success(message);
            formik.setFieldValue('file', '')
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
                {formik.values.categoryId && <div className='inptHldr flex-1'>
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
                </div>}
                <div className='inptHldr flex-1'>
                    <input
                        type='file'
                        className='inputStyle'
                        onChange={(e) => formik.setFieldValue('file', e.currentTarget.files?.[0])}
                        name='file'
                    />
                    {formik.touched.file && formik.errors.file ? (
                        <div className='errorMsg'>{formik.errors.file as string}</div> // Ensure it's a string
                    ) : null}
                </div>
                <div className='btnHldr'>
                    <button type="submit" className='btnPrimary' disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}>{formik.isSubmitting ? 'Please Wait...' : !(formik.isValid && formik.dirty) ? 'Add your info' : 'Add'}</button>
                </div>
            </div>
        </form>
    );
}
