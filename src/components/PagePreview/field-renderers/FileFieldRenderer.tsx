import type { FormField } from '../lib/types';

interface FileFieldRendererProps {
  field: FormField;
  value: File | null;
  onChange: (value: File | null) => void;
}

export function FileFieldRenderer({
  field,
  value,
  onChange,
  ...rest
}: FileFieldRendererProps) {
  return (
    <div className='mt-1'>
      <input
        type='file'
        accept={field.regexPattern}
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        required={field.required}
        className='block w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-900/30 file:text-white hover:file:bg-primary-900/50'
        {...rest}
      />
      {value && (
        <p className='mt-2 text-sm text-white/60'>
          Selected file: {value.name}
        </p>
      )}
    </div>
  );
}
