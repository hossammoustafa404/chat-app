'use client';

import { Container } from '@mantine/core';
import styles from './_styles.module.scss';
import { SignupPayload, signupSchema } from './_model';
import { FormButton } from '@/components';
import Link from 'next/link';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { Box, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { signup } from '../auth-service';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

const Signup = () => {
  const router = useRouter();
  const session = useSession();

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

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.replace('/');
    }
  }, [session]);

  const handleSubmit = async (values: SignupPayload) => {
    try {
      await signup(values);
      signIn();
    } catch (err) {
      if (err instanceof AxiosError) {
        const errors: any = {};
        err.response?.data.errors.forEach((err: any) => {
          errors[err.field] = err.messages.join(', ');
        });
        form.setErrors(errors);
      }
    }
  };

  return (
    <section className={styles['signup-section']}>
      <Container className={styles['container']}>
        <Box className={styles['signup-form-wrapper']}>
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
      </Container>
    </section>
  );
};

export default Signup;
