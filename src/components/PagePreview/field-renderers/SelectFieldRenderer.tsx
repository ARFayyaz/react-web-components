import type { FormField } from "../lib/types";

interface SelectFieldRendererProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}

export function SelectFieldRenderer({
  field,
  value,
  onChange,
  ...rest
}: SelectFieldRendererProps) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      required={field.required}
      className='mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary'
      {...rest}
    >
      <option value=''>{field.placeholder || "Select an option"}</option>
      {field.options?.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
