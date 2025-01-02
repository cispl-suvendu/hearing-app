'use server'

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers";

interface DeleteCardProps {
    pathName: string,
    id: string,
    tags: string,
}

export const handleDelete = async ({ pathName, id, tags }: DeleteCardProps) => {
    const cookieStore = await cookies();
    const loginToken = cookieStore.get("login_token")?.value;
    const url = `${process.env.NEXT_API_URL}/api/${pathName}/${id}`;
    const data = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${loginToken}`,
        },
    });

    if (tags) {
        revalidateTag(tags);
    }

    const response = await data.json();
    return response;

}