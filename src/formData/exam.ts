import * as Yup from 'yup';

export const examInitialValues = {
    title: '',
    categoryId: '',
    subcategoryId: '',
    difficulty: '',
    numQuestions: '',
    timeLimit: ''
}

export const examValidation = Yup.object({
    title: Yup.string()
        .required('Title is required!'),
    categoryId: Yup.string()
        .required('Category is required!'),
    subcategoryId: Yup.string()
        .required('Sub Category is required!'),
    difficulty: Yup.string()
        .required('Difficulty Level is required!'),
    numQuestions: Yup.string()
        .required('Number Of Questions is required!'),
    timeLimit: Yup.string()
        .required('Time Limit is required!'),
});

export interface examType {
    title: string,
    categoryId: string,
    subcategoryId: string,
    difficulty: string,
    numQuestions: string,
    timeLimit: string
}