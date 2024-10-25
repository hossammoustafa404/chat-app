import '../styles/_global.scss';
import '@mantine/core/styles.css';

import { AppMantineProvider } from '../model';
import { ColorSchemeScript, Stack } from '@mantine/core';
import styles from './_styles.module.scss';

export const metadata = {
  title: 'Chat App',
  description: 'Generated by create-nx-workspace',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <AppMantineProvider>
          <Stack mih="100vh">
            <main className={styles['main-content']}>{children}</main>
          </Stack>
        </AppMantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;