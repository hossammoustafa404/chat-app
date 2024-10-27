import { ChatNav } from '@/components';
import styles from './_styles.module.scss';

const Chat = () => {
  return (
    <>
      <ChatNav className={styles['chat-nav']} />
      <section className={styles['chat-wrapper']}>
        <header className={styles['header']}>header</header>
        <div className={styles['chat']}>chat</div>
        <footer className={styles['footer']}>footer</footer>
      </section>
    </>
  );
};

export default Chat;
