"use server";
import { z } from "zod";
import bcrypt from 'bcrypt';
import { SignUpSchema } from "@/schemas";
import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { getUserByEmail } from "@/data/user";

export const signup = async (values: z.infer<typeof SignUpSchema>) => {
    await dbConnect();
    const validatedFields=SignUpSchema.safeParse(values);
    
    if(!validatedFields.success){
        return {error: "Invalid fields"};
    }
    const {email,password,name}=validatedFields.data;
    const hashedPassword=await bcrypt.hash(password,10);

    const existingUser=await getUserByEmail(email);

    if(existingUser){
        return {error: "User already exists"};
    }
    const newUser=await UserModel.create({
        
            email,
            password:hashedPassword,
            name

        
    });
    if(!newUser){
        console.error("User not created");
        return {error: "User not created"};
    }
    console.log("nwe user",newUser);    

    // TODO : send verification email
    return {success: "User created"};

}