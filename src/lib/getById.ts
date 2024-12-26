"use server";
import { cookies } from "next/headers";

export async function getDataById(
  pathName: string,
  param: string,
  id: string,
  tag?: string,
  currentPage?: number,
  limit?: number,
) {
  const params = new URLSearchParams();
  if (param) params.append(param, id);
  if (currentPage) params.append("page", currentPage.toString());
  if (limit) params.append("limit", limit.toString());
  const cookieStore = await cookies();
  const loginToken = cookieStore.get("login_token")?.value;
  const url = `${process.env.NEXT_API_URL}/api/${pathName}${params.toString() ? `?${params.toString()}` : ""}`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginToken}`,
    },
    next: tag ? { tags: [tag] } : undefined,
  };

  const data = await fetch(url, options);
  // if (!data.ok) {
  //   throw new Error(`Failed to fetch data: ${data.status} ${data.statusText}`);
  // }

  const response = await data.json();
  //   if (!response) {
  //     throw new Error("No data found!");
  //   }

  return response;
}
