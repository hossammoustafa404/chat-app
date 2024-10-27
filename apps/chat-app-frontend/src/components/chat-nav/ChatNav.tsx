import { FC, HTMLAttributes } from 'react';
import styles from './_styles.module.scss';
import { cn } from '@/lib/utils';

interface Props extends HTMLAttributes<HTMLElement> {}

const ChatNav: FC<Props> = ({ className }) => {
  return (
    <section className={cn(styles[`chat-nav`], className)}>
      <header className={styles['header']}>header</header>
      <ul className={styles['chat-list']}>Chat list</ul>
    </section>
  );
};

export default ChatNav;
