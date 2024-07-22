'use client';

import { FC, ForwardRefExoticComponent, RefAttributes } from 'react';
import { Button, ButtonProps } from '../shadcn-ui/ui/button';
import { cn } from '../lib/utils';

interface FormButtonProps extends ButtonProps {}

const FormButton: FC<FormButtonProps> = ({
  className,
  children,
  type = 'submit',
  ...props
}) => {
  return (
    <Button
      type={type}
      className={cn('w-full bg-violet-700 hover:bg-violet-700/80', className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default FormButton;
