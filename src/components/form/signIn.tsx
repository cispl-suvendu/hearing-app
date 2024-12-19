'use client'
import React from 'react'
import { LiaHireAHelper } from "react-icons/lia";
import Link from 'next/link';
import { useFormik } from 'formik';
import { postAllData } from '@/lib/postAll';
import toast from 'react-hot-toast';
import { signInInitialValues, signInType, signInValidation } from '@/formData/signIn';
import { useRouter } from 'next/navigation';
import { handleSignIn } from '@/lib/handleSignIn';

export default function SignIn() {

    const router = useRouter()

    const formik = useFormik({
        initialValues: signInInitialValues,
        validationSchema: signInValidation,
        onSubmit: (values: signInType) => {
            handleSubmit(values)
        }
    })

    const handleSubmit = async (values: signInType) => {
        const response = await handleSignIn(values)
        const { success, message, error } = response
        if (success) {
            formik.resetForm()
            toast.success(message);
            router.replace('/dashboard')
        }
        if (!success) {
            toast.error(error);
        }
    }

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className='site-logo mb-4'>
                        <Link href='/'>
                            <LiaHireAHelper className='logo-icon' />
                            <h1>Logo Here</h1>
                        </Link>
                    </div>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                SignIn
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className='errorMsg'>{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className='errorMsg'>{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <button
                                    type="submit"
                                    className="btnPrimary w-full"
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
