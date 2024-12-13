import * as Yup from 'yup';
import * as XLSX from "xlsx";

const requiredHeaders = [
    "Question",
    "Option- A",
    "Option- B",
    "Option- C",
    "Option- D",
    "Right option",
    "Complexity",
];

export const questionInitialValues = {
    categoryId: '',
    subcategoryId: '',
    file: ''
}

export const questionValidation = Yup.object({
    categoryId: Yup.string()
        .required('Category is required!'),
    subcategoryId: Yup.string()
        .required('Sub Category is required!'),
    file: Yup.mixed<File>()
        .required("File is required")
        .test("fileType", "Unsupported file format", (file) =>
            file ? ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"].includes(file.type) : false
        )
        .test("fileSize", "File size too large (max 2MB)", (file) => (file ? file.size <= 2 * 1024 * 1024 : false))
        .test("validHeaders", "File is missing required columns", async (file) => {
            if (!file) return false;

            try {
                const buffer = Buffer.from(await file.arrayBuffer());
                const workbook = XLSX.read(buffer, { type: "buffer" });
                const sheetName = workbook.SheetNames[0];
                const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

                // Explicitly cast the first row (headers) to an array of strings
                const headers = sheetData[0] as string[] | undefined;

                if (!headers) return false; // No headers present
                return requiredHeaders.every((header) => headers.includes(header));
            } catch (error) {
                console.error("Error reading file:", error);
                return false;
            }
        }),

});

export interface questionType {
    categoryId: string,
    subcategoryId: string,
    file: any
}