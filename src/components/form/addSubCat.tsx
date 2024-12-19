import React from 'react';
import { useFormik } from 'formik';
import { subCatInitialValues, subCatValidation, subCatType } from '@/formData/subCat';
import { postAllData } from '@/lib/postAll';
import { Types } from 'mongoose';
import toast from 'react-hot-toast';

interface AddSubCatProps {
    catId: string,
    createdBy: Types.ObjectId | {
        _id: string;
        name: string;
        email: string;
    },
    reFetch: React.Dispatch<React.SetStateAction<boolean>>,
    closeAddForm: () => void
}

export default function AddSubCat({ catId, createdBy, reFetch, closeAddForm }: AddSubCatProps) {
    const formik = useFormik({
        initialValues: subCatInitialValues,
        validationSchema: subCatValidation,
        onSubmit: (values: subCatType) => {
            handleSubmit(values)
        }
    })

    const handleSubmit = async (values: subCatType) => {
        const payload = {
            name: values.subCatName,
            categoryId: catId,
            createdBy
        }
        const { success, message, error } = await postAllData('subCategory', payload, `subCat${catId}`)
        if (success) {
            reFetch(true)
            formik.resetForm()
            toast.success('Successfully created!');
            closeAddForm()
        }
        if (error) {
            toast.error(message);
        }
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='flex justify-between gap-2'>
                <div className='inptHldr flex-1'>
                    <input
                        type="text"
                        name="subCatName"
                        onChange={formik.handleChange}
                        value={formik.values.subCatName}
                        className='inputStyle'
                        placeholder='Category Name'
                    />
                    {formik.touched.subCatName && formik.errors.subCatName ? (
                        <div className='errorMsg'>{formik.errors.subCatName}</div>
                    ) : null}
                </div>
                <div className='btnHldr'>
                    <button type="submit" className='btnPrimary'>Add</button>
                </div>
            </div>
        </form>
    );
}
