'use client';

import { Form } from '@/shared/shadcn-ui/ui/form';
import CustomInput from '@/shared/ui/CustomInput';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signinFormSchema } from '../lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';
import { Button, buttonVariants } from '@/shared/shadcn-ui/ui/button';
import { FormButton } from '@/shared/ui';
import Link from 'next/link';

interface SigninFormProps extends HTMLAttributes<HTMLDivElement> {}

const SigninForm: FC<SigninFormProps> = ({ className, ...props }) => {
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = () => {
    console.log('Submitted');
  };
  return (
    <div
      className={cn(
        'basis-[28rem] p-12 rounded-md border-1 shadow-md bg-white',
        className
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <CustomInput
            control={form.control}
            type="email"
            name="email"
            // label="Email"
            placeholder="Enter your email"
          />
          <CustomInput
            control={form.control}
            type="password"
            name="password"
            className="mt-8"
            // label="Password"
            placeholder="Enter your password"
          />
          <FormButton type="submit">Signin</FormButton>
        </form>
      </Form>
      <div className="flex gap-1 items-center justify-center mt-4">
        <p>Don't have an account?</p>
        <Link
          href="/auth/signup"
          className={cn(buttonVariants({ variant: 'link' }), 'p-0')}
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default SigninForm;