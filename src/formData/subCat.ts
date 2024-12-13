import * as Yup from 'yup';

export const subCatInitialValues = {
    subCatName: ''
}

export const subCatValidation = Yup.object({
    subCatName: Yup.string()
        .required('Name is required!'),
});

export interface subCatType {
    subCatName: string
}