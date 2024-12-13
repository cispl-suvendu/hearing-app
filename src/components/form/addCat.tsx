import React from 'react';
import { useFormik } from 'formik';
import { postAllData } from '@/lib/postAll';
import toast from 'react-hot-toast';
import { catInitialValues, catType, catValidation } from '@/formData/cat';

export default function AddCat() {

    const formik = useFormik({
        initialValues: catInitialValues,
        validationSchema: catValidation,
        onSubmit: (values: catType) => {
            handleSubmit(values)
        }
    })

    const handleSubmit = async (values: catType) => {
        const {name, description} = values
        const payload = {
            name,
            description,
            createdBy:'6720cb43966bb22e30a741e2'
        }
        const { success, message, error } = await postAllData('category', payload, 'allCat')
        if (success) {
            formik.resetForm()
            toast.success('Successfully created!');
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
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        className='inputStyle'
                        placeholder='Name'
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className='errorMsg'>{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className='inptHldr flex-1'>
                    <input
                        type="text"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        className='inputStyle'
                        placeholder='Description'
                    />
                    {formik.touched.description && formik.errors.description ? (
                        <div className='errorMsg'>{formik.errors.description}</div>
                    ) : null}
                </div>
                <div className='btnHldr'>
                    <button type="submit" className='btnPrimary'>Add</button>
                </div>
            </div>
        </form>
    );
}
