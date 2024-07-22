'use client';

import { Form } from '@/shared/shadcn-ui/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupFormSchema } from '../lib';
import { z } from 'zod';
import { CustomInput, FormButton } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';
import { FC, HTMLAttributes } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/shared/shadcn-ui/ui/button';

interface SignupFormProps extends HTMLAttributes<HTMLDivElement> {}

const SignupForm: FC<SignupFormProps> = ({ className }) => {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
    },
  });

  const onSubmit = () => {
    console.log('Submitted');
  };

  return (
    <div
      className={cn(
        'basis-[35rem] p-12 rounded-md border-1 shadow-md bg-white',
        className
      )}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-4">
            <CustomInput
              type="text"
              name="firstName"
              control={form.control}
              placeholder="Enter your first name"
              className="sm:basis-1/2"
            />
            <CustomInput
              type="text"
              name="lastName"
              control={form.control}
              placeholder="Enter your last name"
              className="sm:basis-1/2"
            />
          </div>

          <CustomInput
            type="email"
            name="email"
            control={form.control}
            placeholder="Enter your email"
          />
          <CustomInput
            type="text"
            name="username"
            control={form.control}
            placeholder="Enter your username"
          />
          <CustomInput
            type="password"
            name="password"
            control={form.control}
            placeholder="Enter your password"
          />
          <FormButton className="mt-4">Sign up</FormButton>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link
          href="/"
          className={cn(buttonVariants({ variant: 'link' }), 'p-0')}
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
