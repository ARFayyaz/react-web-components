import type { FormField } from '../lib/types';

interface CheckboxFieldRendererProps {
  field: FormField;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function CheckboxFieldRenderer({
  field,
  value,
  onChange,
  ...rest
}: CheckboxFieldRendererProps) {
  return (
    <div className='mt-1'>
      <label className='inline-flex items-center'>
        <input
          type='checkbox'
          checked={value || false}
          onChange={(e) => onChange(e.target.checked)}
          required={field.required}
          className='rounded border-gray-300 text-primary focus:ring-primary'
          {...rest}
        />
        <span className='ml-2 text-sm text-gray-600'>{field.placeholder}</span>
      </label>
    </div>
  );
}
