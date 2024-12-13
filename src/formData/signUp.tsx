import * as Yup from 'yup';

export const signUpInitialValues = {
    name: '',
    email: '',
    password: ''
}

export const signUpValidation = Yup.object({
    name: Yup.string()
        .required('Name is required!'),
    email: Yup.string().email()
        .required('Email is required!'),
    password: Yup.string()
        .required('Password is required!.')
        .min(4, 'Password is too short - should be 4 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')

});

export interface signUpType {
    name: string,
    email: string,
    password: string
}