import '../../styles/_global.scss';
import '@mantine/core/styles.css';
import { ColorSchemeScript, Stack } from '@mantine/core';
import styles from './_styles.module.scss';
import AppMantineProvider from '../model/AppMantineProvider';

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
