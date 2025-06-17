import type { FormField } from "../lib/types";

interface EmailFieldRendererProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function EmailFieldRenderer({
  field,
  value,
  onChange,
  error,
  ...rest
}: EmailFieldRendererProps) {
  return (
    <div>
      <input
        type='email'
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder || "Enter email address"}
        required={field.required}
        className={`mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-primary focus:border-primary ${
          error
            ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300"
        }`}
        {...rest}
      />
      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  );
}
