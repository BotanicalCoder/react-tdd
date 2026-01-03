import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError; 
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 mb-4">
        <label 
          htmlFor={props.id || props.name} 
          aria-labelledby={label||props.name}
          className="text-sm font-semibold text-gray-700"
        >
          {label}
        </label>

        <input
          ref={ref} 
          className={`
            px-3 py-2 border rounded-md focus:outline-none focus:ring-2
            ${error 
              ? 'border-red-500 focus:ring-red-200' 
              : 'border-gray-300 focus:ring-blue-200'
            }
            ${className}
          `}
          id={props.id||props.name}
          disabled={props.disabled ?? false}
          {...props} 
        />

        {error && (
          <span className="text-xs text-red-500 mt-1" role="alert">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;