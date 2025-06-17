import type { FormField } from "../lib/types";

interface TimeFieldRendererProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}

export function TimeFieldRenderer({
  field,
  value,
  onChange,
  ...rest
}: TimeFieldRendererProps) {
  return (
    <input
      type='time'
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      required={field.required}
      className='mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary'
      {...rest}
    />
  );
}
