'use client';

import { FC, ForwardRefExoticComponent, RefAttributes } from 'react';
import { Button, ButtonProps } from '../shadcn-ui/ui/button';
import { cn } from '../lib/utils';

interface FormButtonProps extends ButtonProps {}

const FormButton: FC<FormButtonProps> = ({ className, children, ...props }) => {
  return (
    <Button
      type="submit"
      className={cn(
        'w-full mt-12 bg-violet-700 hover:bg-violet-700/80',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default FormButton;
