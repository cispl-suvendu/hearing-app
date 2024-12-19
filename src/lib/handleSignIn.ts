'use server'
import { postAllData } from "./postAll"
import { signInType } from "@/formData/signIn"
import { cookies } from "next/headers"

export const handleSignIn = async (values: signInType) => {
    const cookieStore = await cookies()
    const response = await postAllData('signin', values)
    if (response.success) {
        cookieStore.set({
            name: 'login_token',
            value: response.data,
            httpOnly: true,
            path: '/',
        })
    }
    return response
}