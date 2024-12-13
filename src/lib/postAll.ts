'use server'
import { revalidateTag } from 'next/cache'

export async function postAllData(
  pathName: string,
  body: Record<string, any> | FormData,
  tag?: string
) {
  const isFormData = body instanceof FormData;

  const headers: HeadersInit = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${process.env.NEXT_API_URL}/api/${pathName}`, {
    method: 'POST',
    headers,
    body: isFormData ? body : JSON.stringify(body),
  });

  const responseData = await response.json();

  // Optional: Handle tag-based revalidation if needed
  if (tag) {
    revalidateTag(tag);
  }

  return responseData;
}
