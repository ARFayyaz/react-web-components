import type { FormField } from "../lib/types";

interface TextAreaFieldRendererProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}

export function TextAreaFieldRenderer({
  field,
  value,
  onChange,
  ...rest
}: TextAreaFieldRendererProps) {
  return (
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      required={field.required}
      rows={field.rows || 3}
      className='mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary'
      {...rest}
    />
  );
}
