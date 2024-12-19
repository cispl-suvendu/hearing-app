"use server";
import { cookies } from "next/headers";

interface GetAllDataProps {
  pathName: string;
  tag?: string;
  query?: string;
  currentPage?: number;
  limit?: number;
};

export async function getAllData(
  {
    pathName,
    tag,
    query,
    currentPage,
    limit
  }: GetAllDataProps
) {
  // Base URL
  const cookieStore = await cookies();
  const loginToken = cookieStore.get("login_token")?.value;
  const url = `${process.env.NEXT_API_URL}/api/${pathName}`;

  // Conditionally construct query parameters
  const params = new URLSearchParams();
  if (query) params.append("query", query);
  if (currentPage) params.append("page", currentPage.toString());
  if (limit) params.append("limit", limit.toString());

  // Complete URL with query parameters
  const fullUrl = `${url}${params.toString() ? `?${params.toString()}` : ""}`;

  try {
    const data = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginToken}`, // Add the token to Authorization header
      },
      next: tag ? { tags: [tag] } : undefined,
    });

    if (!data.ok) {
      throw new Error(`Failed to fetch data: ${data.status} ${data.statusText}`);
    }

    const response = await data.json();
    return response;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return error.message;
  }
}
