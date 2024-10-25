'use client';

import { FC } from 'react';
import { Button } from '@mantine/core';
import type { ButtonProps, ElementProps } from '@mantine/core';
import styles from './_styles.module.scss';
import { cn } from '@/lib/utils';

interface FormButtonProps
  extends ButtonProps,
    ElementProps<'button', keyof ButtonProps> {}

const FormButton: FC<FormButtonProps> = ({
  className,
  children,
  type = 'submit',
  ...props
}) => {
  return (
    <Button
      variant="filled"
      // color="blue"
      fullWidth
      type={type}
      className={cn(styles['form-btn'], className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default FormButton;
