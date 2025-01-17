"use server";
import { z } from "zod";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields=LoginSchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "Invalid fields"};
    }

    const {email,password}=validatedFields.data;

    try{
        await signIn("credentials",{
            email,
            password,
        });
        return {success: "Logged in"};
    }catch(e){
        if(e instanceof AuthError){
            switch(e.type){
                case "CredentialsSignin": return {error: "Invalid credentials"};
                default: return {success: "something went wrong"};
            }
        }
        throw e;
    }

}