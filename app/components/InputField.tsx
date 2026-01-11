'use client';

import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldError as ShadcnFieldError,
} from './ui/field';
import { Input } from './ui/input';
import { cn } from '~/lib/utils';

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  error?: FieldError;
  labelClassName?: string;
  containerClassName?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      description,
      error,
      className,
      labelClassName,
      containerClassName,
      id,
      name,
      ...props
    },
    ref
  ) => {
    const inputId = id || name;

    return (
      <Field className={cn('w-full', containerClassName)}>
        <FieldLabel
          htmlFor={inputId}
          className={cn('text-sm font-medium', labelClassName)}
        >
          {label}
        </FieldLabel>

        {description && !error && (
          <FieldDescription className="text-xs text-muted-foreground mt-0.5 mb-1.5">
            {description}
          </FieldDescription>
        )}

        <Input
          ref={ref}
          id={inputId}
          name={name}
          className={cn(
            error && 'border-destructive focus-visible:ring-destructive/30',
            className,
             error ? 'border-red-500 focus:ring-red-200' 
              : 'border-gray-300 focus:ring-blue-200'
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />

        {error && <ShadcnFieldError
         id={`${inputId}-error`}
            className="text-xs font-medium text-destructive mt-1.5 "
            role="alert"
        >{error.message}</ShadcnFieldError>}
      </Field>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;