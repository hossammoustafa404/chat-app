import SignupForm from '@/features/signup';
import { Center, Container } from '@mantine/core';
import styles from './_styles.module.scss';

const Signup = () => {
  return (
    <section className={styles['signup-section']}>
        <Container className={styles['container']}>
          <SignupForm />
        </Container>
    </section>
  );
};

export default Signup;
