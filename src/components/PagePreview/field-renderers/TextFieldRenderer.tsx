import type { FormField } from "../lib/types";

interface TextFieldRendererProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}

export function TextFieldRenderer({
  field,
  value,
  onChange,
  ...rest
}: TextFieldRendererProps) {
  return (
    <input
      type={field.type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      pattern={field.regexPattern || undefined}
      required={field.required}
      className='mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary'
      {...rest}
    />
  );
}
