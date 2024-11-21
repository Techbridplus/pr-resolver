"use client";
import  {FcGoogle} from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import {signIn } from "next-auth/react";
export const Social = () => {
    const handleClick = async (provider: "google"|"github") => {
        try {
            const result = await signIn(provider, { callbackUrl: '/settings' });
            console.log("result ",result);
          } catch (error) {
            console.log("social error ");
            // console.error("Error during sign-in:", error);
          }
    }

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button size={"lg"}
                className='w-full'
                variant="outline"
                onClick={() => {handleClick('google')}}
            >
                <FcGoogle className='h-10 w-10'/>

            </Button>
            <Button size={"lg"}
                className='w-full'
                variant="outline"
                onClick={() => {handleClick('github')}}
            >
                <FaGithub className='h-7 w-7'/>
                
            </Button>
        </div>
    );
}