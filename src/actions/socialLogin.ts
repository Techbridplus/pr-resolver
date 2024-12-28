"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const SocialLogin = async (provider:"google" | "github") => {

    try{
        const result = await signIn(provider,{
            callbackUrl: "/settings"
        });
        return result;
    }catch(e){
        throw e;
    }

}