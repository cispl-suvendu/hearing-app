"use server";

interface GetAllDataProps {
    pathName: string;
    id: string
};

interface PostAllDataProps {
    pathName: string;
    id: string,
    body: Record<string, any> | FormData
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


export async function postAssignedExam(
    {
        pathName,
        id,
        body
    }: PostAllDataProps
) {

    const url = `${process.env.NEXT_API_URL}/api/${pathName}/${id}`;

    try {
        const data = await fetch(url, {
            method: "POST",
            body:JSON.stringify(body),
        });

        const response = await data.json();
        return response;
    } catch (error: any) {
        console.error("Error fetching data:", error);
        return error.message;
    }
}
