'use client';

import { ChatNav } from '@/components';
import styles from './_home-styles.module.scss';
import { useEffect } from 'react';
import { makeRequest } from '@/api/api-client';

const Home = () => {
  useEffect(() => {
    (async () => {
      const { data } = await makeRequest({ method: 'get', endpoint: 'users' });
      console.log(data);
      const { data: newData } = await makeRequest({
        isPrivate: false,
        method: 'get',
        endpoint: 'users',
      });
      console.log(newData);
    })();
  }, []);
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
