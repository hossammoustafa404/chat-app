'use client';

import { signupSchema } from '../model';
import { z } from 'zod';
import { FormButton } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';
import { FC } from 'react';
import Link from 'next/link';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { Box, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import styles from './_styles.module.scss';
import type { BoxProps } from '@mantine/core';

interface SignupFormProps extends BoxProps {}

const SignupForm: FC<SignupFormProps> = ({ className, ...props }) => {
  const form = useForm({
    mode: 'uncontrolled',
    name: 'signup-form',
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: zodResolver(signupSchema),
  });

  const handleSubmit = (values: z.infer<typeof signupSchema>) => {
    console.log({ values });
  };

  return (
    <Box className={cn(styles['signup-form-wrapper'], className)} {...props}>
      <form
        onSubmit={form.onSubmit(handleSubmit, (errors) => {
          const firstErrorPath = Object.keys(errors)[0];
          form.getInputNode(firstErrorPath)?.focus();
        })}
        noValidate
        className={styles['signup-form']}
      >
        <Stack>
          <Group className={styles['']} grow preventGrowOverflow={false}>
            <TextInput
              key={form.key('firstName')}
              label="First Name"
              withAsterisk
              placeholder="Enter your first name"
              {...form.getInputProps('firstName')}
            />
            <TextInput
              key={form.key('lastName')}
              label="Last Name"
              withAsterisk
              placeholder="Enter your last name"
              {...form.getInputProps('lastName')}
            />
          </Group>

          <TextInput
            key={form.key('email')}
            label="Email"
            withAsterisk
            placeholder="Enter your email"
            {...form.getInputProps('email')}
          />
          <TextInput
            key={form.key('username')}
            label="Username"
            placeholder="Enter your username"
            {...form.getInputProps('username')}
          />
          <PasswordInput
            key={form.key('password')}
            label="Password"
            withAsterisk
            placeholder="Enter your password"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            key={form.key('confirmPassword')}
            label="Confirm Password"
            withAsterisk
            placeholder="Re-enter your password"
            {...form.getInputProps('confirmPassword')}
          />
        </Stack>

        <FormButton className={styles['submit-btn']}>Sign up</FormButton>
      </form>

      <footer>
        Already have an account?{' '}
        <Link href="/auth/signin" className={styles['signin-link']}>
          Sign in
        </Link>
      </footer>
    </Box>
  );
};

export default SignupForm;
