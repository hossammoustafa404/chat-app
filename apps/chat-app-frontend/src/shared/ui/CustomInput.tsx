'use client';

import type { Control } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../shadcn-ui/ui/form';
import { FC, HTMLInputTypeAttribute, useState } from 'react';
import { Input } from '../shadcn-ui/ui/input';
import { cn } from '../lib/utils';
import { Button } from '../shadcn-ui/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface CustomInputProps {
  control: any; // Need to edit;
  name: string;
  type: HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
}

const CustomInput: FC<CustomInputProps> = ({
  control,
  name,
  label,
  type,
  placeholder,
  description,
  className,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : type}
                placeholder={placeholder}
                {...field}
                className={cn(type === 'password' ? 'pr-8' : '')}
              />
              {type === 'password' && (
                <Button
                  onClick={handleShowPassword}
                  variant="ghost"
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
                  type="button"
                >
                  {showPassword ? (
                    <EyeOff className="w-4" />
                  ) : (
                    <Eye className="w-4" />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-sm" />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
