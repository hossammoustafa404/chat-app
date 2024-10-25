'use client';

import { z } from 'zod';
import { FormButton } from '@/components';
import Link from 'next/link';
import { useForm } from '@mantine/form';
import { Box, PasswordInput, Stack, TextInput } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { SigninPayload, signinSchema } from './_model';
import styles from './_styles.module.scss';
import { Container } from '@mantine/core';
import { signin } from '../auth-service';

const Signin = () => {
  const form = useForm({
    mode: 'uncontrolled',
    name: 'signin-form',
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(signinSchema),
  });

  const handleSubmit = async (values: SigninPayload) => {
    const data = await signin(values);
    console.log({ data });
  };

  return (
    <section className={styles['signin-section']}>
      <Container className={styles['container']}>
        <Box className={styles['signin-form-wrapper']}>
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
      </Container>
    </section>
  );
};

export default Signin;
