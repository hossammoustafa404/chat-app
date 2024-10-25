'use client';

import { MantineProvider } from '@mantine/core';
import React, { FC, ReactNode } from 'react';
import { cssVariablesResolver, theme } from '../lib';

interface Props {
  children: ReactNode;
}

const AppMantineProvider: FC<Props> = ({ children }) => {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={cssVariablesResolver}>
      {children}
    </MantineProvider>
  );
};

export default AppMantineProvider;
