'use client'
import React, { useState, KeyboardEvent, useEffect } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";

export default function MultiInput({ formik, filedName, label }: any) {
    const [value, setValue] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            setValue((prevValue) => [...prevValue, input]);
            setInput('');
            formik.setFieldTouched(filedName, true, true);
        }
    };

    const handleRemove = (id: number) => {
        const newValues = value.filter((_val, index) => index !== id);
        setValue(newValues);
    };

    useEffect(() => {
        formik.setFieldValue(filedName, value);
    }, [value]);

    return (
        <div>
            <div className='text-grayText mb-2'>{label}</div>
            <div className='relative'>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Type your data and hit enter'
                    className={`inputStyle !pl-[76px] ${formik.touched[filedName] && formik.errors[filedName] ? 'inputErrorStyle' : ''}`}
                    name={filedName}
                    onBlur={() => formik.setFieldTouched(filedName, true, true)}
                />
                <span className='bg-skyLight absolute left-0 top-0 h-full text-supportingMegenda flex items-center justify-center text-xs px-2 border rounded'>
                    Added: {value.length}
                </span>
            </div>
            {value.length > 0 && (
                <div className='mt-4'>
                    <ul className='flex flex-wrap gap-2'>
                        {value.map((val, index) => (
                            <li 
                                key={index} 
                                className='bg-skyLight text-xs px-2 py-1 rounded-xl flex gap-2 items-center cursor-pointer' 
                                onClick={() => handleRemove(index)}
                            >
                                {val} <IoCloseCircleOutline />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {formik.touched[filedName] && formik.errors[filedName] ? (
                <div className='errorMsg'>{formik.errors[filedName]}</div>
            ) : null}
        </div>
    );
}
