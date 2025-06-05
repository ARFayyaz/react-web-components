import { FormPreview } from './FormPreview';
import { mapGridDataToFormValues } from './lib/parameterMapping';
import type { FormDefinition, ValidationError } from './lib/types';

interface FormModalProps {
  action?: string;
  initialData?: Record<string, any> | null;
  parameterMapping?: Record<string, string>;
  prePopulatedData?: Record<string, string>;
  onClose: () => void;
  form: FormDefinition;
  onSubmit?: (data: Record<string, any>) => Promise<void>;
  onError?: (errors: ValidationError[]) => void;
}

export function FormModal({
  form,
  initialData,
  parameterMapping = {},
  prePopulatedData,
  onSubmit,
  onClose,
}: FormModalProps) {
  // Map grid data to form values based on parameter mapping
  let mappedValues = initialData
    ? mapGridDataToFormValues(initialData, parameterMapping)
    : {};

  if (prePopulatedData) {
    mappedValues = { ...prePopulatedData, ...mappedValues };
  }

  return (
    <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-deep-space-blue/85 backdrop-blur-md rounded-xl shadow-xl max-w-2xl w-full mx-4 relative max-h-[90vh] flex flex-col overflow-hidden border-t border-pulse-cyan/30'>
        <div className='absolute top-0 left-0 right-0 h-[1px] bg-cyan-gradient' />
        <div className='p-6 flex-1 overflow-y-auto'>
          <button
            onClick={onClose}
            className='absolute right-4 top-4 text-white/70 hover:text-white'
            aria-label='Close'
          >
            X
          </button>
          <FormPreview
            form={form}
            initialValues={mappedValues}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
