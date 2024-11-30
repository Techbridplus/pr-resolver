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
import { LoginSchema } from '../../schemas';
import { z } from 'zod';
import { login } from '@/actions/login';


const LoginForm  = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending,startTransition]=useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const Submit = (values:z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(()=>{
      login(values).then((data)=>{
          setError(data?.error);
          setSuccess(data?.success);
      })
    });
  }
  
  return (
    <div className='h-full'>
      <CardWrapper
        headerLabel="Login" 
        backButtonLabel="Don't have an account? Sign up" 
        backButtonHref="sign-up" 
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
            <FormError  message={error }/>
            <FormSuccess message={success}/>
            <Button
              type="submit"
              className="w-full" 
              disabled={isPending} 
            >
              Login
            </Button>
          </form>
        </Form>

      </CardWrapper>
        
    </div>
  );
}

export default LoginForm;