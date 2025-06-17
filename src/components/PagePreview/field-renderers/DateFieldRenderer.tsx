import type { FormField } from "../lib/types";

interface DateFieldRendererProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}

export function DateFieldRenderer({
  field,
  value,
  onChange,
  ...rest
}: DateFieldRendererProps) {
  return (
    <input
      type='date'
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      required={field.required}
      className='mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary'
      {...rest}
    />
  );
}
