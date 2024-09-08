import SigninForm from '@/features/signin';
import styles from './_styles.module.scss';
import { Container } from '@mantine/core';

const Signin = () => {
  return (
    <section className={styles['signin-section']}>
      <Container className={styles['container']}>
        <SigninForm />
      </Container>
    </section>
  );
};

export default Signin;
