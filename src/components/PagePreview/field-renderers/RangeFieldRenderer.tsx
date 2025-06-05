import type { FormField } from '../lib/types';

interface RangeFieldRendererProps {
  field: FormField;
  value: number;
  onChange: (value: number) => void;
}

export function RangeFieldRenderer({
  field,
  value,
  onChange,
  ...rest
}: RangeFieldRendererProps) {
  return (
    <div className='mt-1'>
      <input
        type='range'
        value={value || field.minValue || 0}
        onChange={(e) => onChange(Number(e.target.value))}
        min={field.minValue!}
        max={field.maxValue!}
        className='w-full h-2 bg-deep-space-blue/30 rounded-lg appearance-none cursor-pointer accent-primary'
        {...rest}
      />
      <div className='flex justify-between text-xs text-white/60 mt-1'>
        <span>{field.minValue}</span>
        <span>{value || field.minValue || 0}</span>
        <span>{field.maxValue}</span>
      </div>
    </div>
  );
}
