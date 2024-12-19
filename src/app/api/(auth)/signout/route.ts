import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("login_token"); // Delete the login token cookie
  return NextResponse.json({ success: true });
}
