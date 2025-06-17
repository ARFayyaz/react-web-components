import { useState } from "react";
import type { FormField } from "../lib/types";

interface PasswordFieldRendererProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}

export function PasswordFieldRenderer({
  field,
  value,
  onChange,
  ...rest
}: PasswordFieldRendererProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='mt-1 relative'>
      <input
        type={showPassword ? "text" : "password"}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        pattern={field.regexPattern || undefined}
        required={field.required}
        className='p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary pr-10'
        {...rest}
      />
      <button
        type='button'
        onClick={() => setShowPassword(!showPassword)}
        className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500'
      >
        {showPassword ? <p>Hide</p> : <p>Show</p>}
      </button>
    </div>
  );
}
