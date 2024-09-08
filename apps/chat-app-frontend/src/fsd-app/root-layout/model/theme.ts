import { createTheme, CSSVariablesResolver } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'violet',
});

export const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--mantine-spacing-2xl': '2.7rem',
  },
  light: {
    '--mantine-color-body': '#7b2eda',
  },
  dark: {},
});
