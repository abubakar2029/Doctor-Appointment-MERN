import React from "react";

export type PrimaryInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  customClasses?: string;
};

const PrimaryInput = React.forwardRef<HTMLInputElement, PrimaryInputProps>(
  ({ customClasses, type = "text", className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`max-lg:w-full min-w-3/12 px-4 py-2.5 border border-teal-500 rounded-md text-gray-600 font-semibold placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 ${customClasses || ""} ${className || ""}`}
        {...props}
      />
    );
  }
);

PrimaryInput.displayName = "PrimaryInput";

export default PrimaryInput;