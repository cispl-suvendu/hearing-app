import * as Yup from 'yup';

export const signInInitialValues = {
    email: '',
    password: ''
}

export const signInValidation = Yup.object({
    email: Yup.string().email()
        .required('Email is required!'),
    password: Yup.string()
        .required('Password is required!.')
        .min(6, 'Password is too short - should be 4 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')

});

export interface signInType {
    email: string,
    password: string
}