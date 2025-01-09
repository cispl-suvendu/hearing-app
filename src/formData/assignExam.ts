import * as Yup from 'yup';

// Initial values
export const assignExamInitialValues = {
    userName: [''], // Array to handle multiple user names
    userEmail: [''], // Array to handle multiple user emails
    status: 'assigned', // Default status
};

// Validation schema
export const assignExamValidation = Yup.object({
    userName: Yup.array()
        .of(Yup.string().required('Name is required!'))
        .min(1, 'At least one user name is required!'),
    userEmail: Yup.array()
        .of(Yup.string().email('Invalid email format!').required('Email is required!'))
        .min(1, 'At least one user email is required!'),
    status: Yup.string().required('Status is required!'),
});

// Type definition
export interface assignExamType {
    userName: string[]; // Array of user names
    userEmail: string[]; // Array of user emails
    status: string; // Status
}
