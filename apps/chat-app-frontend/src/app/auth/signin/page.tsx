'use client';

import { FormButton } from '@/components';
import Link from 'next/link';
import { useForm } from '@mantine/form';
import { Box, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { SigninPayload, signinSchema } from './_model';
import styles from './_styles.module.scss';
import { Container } from '@mantine/core';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Signin = () => {
  const [errMsg, setErrMsg] = useState('');
  const router = useRouter();
  const session = useSession();

  const form = useForm({
    mode: 'uncontrolled',
    name: 'signin-form',
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(signinSchema),
  });

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.replace('/');
    }
  }, [session]);

  const handleSubmit = async (values: SigninPayload) => {
    const data = await signIn('credentials', {
      ...values,
      redirect: false,
    });

    const { status, ok, url } = data || {};

    if (status === 401) {
      setErrMsg('Wrong Credentials');
    }

    if (ok && url) {
      let callbackUrl = url.split('?callbackUrl=')[1] ?? '/';
      callbackUrl = callbackUrl.replace(/%2F/g, '/');
      location.replace(callbackUrl);
    }
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
            {errMsg && <Text className={styles['err-msg']}>{errMsg}</Text>}
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
