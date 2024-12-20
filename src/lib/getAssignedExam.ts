"use server";

interface GetAllDataProps {
    pathName: string;
    id: string
};

export async function getAssignedExam(
    {
        pathName,
        id,
    }: GetAllDataProps
) {

    const url = `${process.env.NEXT_API_URL}/api/${pathName}/${id}`;

    try {
        const data = await fetch(url, {
            method: "GET"
        });

        const response = await data.json();
        return response;
    } catch (error: any) {
        console.error("Error fetching data:", error);
        return error.message;
    }
}
