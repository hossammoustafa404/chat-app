'use client';

import { FC } from 'react';
import { z } from 'zod';
import { FormButton } from '@/shared/ui';
import Link from 'next/link';
import { useForm } from '@mantine/form';
import { Box, PasswordInput, Stack, TextInput } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { signinSchema } from '../model';
import styles from './_styles.module.scss';
import type { BoxProps } from '@mantine/core';

interface SigninFormProps extends BoxProps {}

const SigninForm: FC<SigninFormProps> = ({ className, ...props }) => {
  const form = useForm({
    mode: 'uncontrolled',
    name: 'signin-form',
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(signinSchema),
  });

  const handleSubmit = (values: z.infer<typeof signinSchema>) => {
    console.log({ values });
  };

  return (
    <Box className={styles['signin-form-wrapper']} {...props}>
      <form
        onSubmit={form.onSubmit(handleSubmit, (errors) => {
          const firstErrorPath = Object.keys(errors)[0];
          form.getInputNode(firstErrorPath)?.focus();
        })}
        className={styles['signin-form']}
      >
        <Stack className={styles['inputs-wrapper']}>
          <TextInput
            key={form.key('email')}
            label="Email"
            placeholder="Enter your email"
            withAsterisk
            {...form.getInputProps('email')}
          />
          <PasswordInput
            key={form.key('password')}
            label="Password"
            placeholder="Enter your password"
            withAsterisk
            {...form.getInputProps('password')}
          />
        </Stack>
        <FormButton className={styles['submit-btn']}>Sign in</FormButton>
      </form>

      <footer className={styles['']}>
        Don't have an account?{' '}
        <Link href="/auth/signup" className={styles['signup-link']}>
          Sign up
        </Link>
      </footer>
    </Box>
  );
};

export default SigninForm;
