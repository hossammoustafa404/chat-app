'use client';

import { ChatNav } from '@/components';
import styles from './_home-styles.module.scss';

const Home = () => {
  return (
    <>
      <ChatNav />
      <section className={styles['welcome-section']}>
        <p>Welcome</p>
      </section>
    </>
  );
};

export default Home;
