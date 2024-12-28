"use client";
import  {FcGoogle} from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { SocialLogin } from '@/actions/socialLogin';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
type SocialLoginResult = {
    error?: string;
    url?: string;
};
type SocialProps = {
    onError: (message: string) => void;
};
export const Social = ({ onError }: SocialProps) => {
    const router = useRouter();
    const handleClick = async (provider: "google"|"github") => {
        try{
            const result: SocialLoginResult = await SocialLogin(provider);
            
        }catch(err){
            console.log("In social.tsx",err);
            onError("Unexpected error during sign-in. Please try again.");
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