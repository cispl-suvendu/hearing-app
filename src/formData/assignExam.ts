import * as Yup from 'yup';

export const assignExamInitialValues = {
    userName: '',
    userEmail: '',
    status:'assigned'
}

export const assignExamValidation = Yup.object({
    userName: Yup.string()
        .required('Name is required!'),
        userEmail: Yup.string().email()
        .required('Email is required!'),
        status: Yup.string()
        .required('Status is required!'),
});

export interface assignExamType {
    userName: string,
    userEmail: string,
    status:string
}