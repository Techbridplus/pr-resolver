"use client";
import React, { useState, useTransition } from 'react';
import { CardWrapper } from './card-wrapper';
import  {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
} from '@/components/ui/form';
import { SignUpSchema } from '@/schemas/index';
import { z } from 'zod';
import { set } from 'mongoose';

import { signup  } from '@/actions/signup';

const SignupForm  = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending,startTransition]=useTransition();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });
  const Submit = (values:z.infer<typeof SignUpSchema>) => {
    setError("");
    setSuccess("");
    startTransition(()=>{
      signup(values).then((data)=>{
        setError(data.error);
        setSuccess(data.success);
      })
    });
  }
  
  return (
    <div className='h-full'>
      <CardWrapper
        headerLabel="Create an account" 
        backButtonLabel="Already have an account?" 
        backButtonHref="sign-in" 
        showSocial={true}
        >

        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(Submit)}
            className='space-y-6'
          >
            <div className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({field})=>(
                  <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Gaurav Joshi"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
                )}
              >

                
              </FormField>
              <FormField
                control={form.control}
                name="email"
                render={({field})=>(
                  <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="joshi@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
                )}
              >

                
              </FormField>
              <FormField
                control={form.control}
                name="password"
                render={({field})=>(
                  <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
                )}
              >

                
              </FormField>
              
            </div>
            <FormError  message={error}/>
            <FormSuccess message={success}/>
            <Button
              type="submit"
              className="w-full" 
              disabled={isPending} 
            >
              Sign up
            </Button>
          </form>
        </Form>

      </CardWrapper>
        
    </div>
  );
}

export default SignupForm;