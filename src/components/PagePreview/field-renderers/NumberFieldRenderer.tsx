import type { FormField } from '../lib/types';

interface NumberFieldRendererProps {
  field: FormField;
  value: number;
  onChange: (value: number | null) => void;
}

export function NumberFieldRenderer({
  field,
  value,
  onChange,
  ...rest
}: NumberFieldRendererProps) {
  return (
    <input
      type={field.type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
      min={field.minValue ?? undefined}
      max={field.maxValue ?? undefined}
      placeholder={field.placeholder}
      required={field.required}
      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary'
      {...rest}
    />
  );
}
