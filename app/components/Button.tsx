import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean; 
};

const LoadingSpinner = () => (
  <svg 
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    ></circle>
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);


export default function Button(props: ButtonProps) {
  const { children, loading = false, className, disabled, ...rest } = props;

  const baseClasses = 
    "inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 " +
    "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500";

  // Define disabled/loading classes
  const disabledClasses = (disabled || loading) 
    ? "opacity-50 cursor-not-allowed" 
    : "";

  return (
    <button 
      disabled={disabled || loading}
      
      className={`${baseClasses} ${disabledClasses} ${className}`}
      
      {...rest}
    >
      {loading && <LoadingSpinner />}
      {children ?? 'Click'}
    </button>
  );
}