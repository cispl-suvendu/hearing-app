import * as Yup from 'yup';

export const catInitialValues = {
    name: '',
    description: ''
}

export const catValidation = Yup.object({
    name: Yup.string()
        .required('Name is required!'),
    description: Yup.string()
        .required('Description is required!'),
});

export interface catType {
    name: string,
    description: string
}