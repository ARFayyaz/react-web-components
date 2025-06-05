import type { FormField } from './lib/types';
import { TextFieldRenderer } from './field-renderers/TextFieldRenderer';
import { EmailFieldRenderer } from './field-renderers/EmailFieldRenderer';
import { PhoneFieldRenderer } from './field-renderers/PhoneFieldRenderer';
import { PasswordFieldRenderer } from './field-renderers/PasswordFieldRenderer';
import { RangeFieldRenderer } from './field-renderers/RangeFieldRenderer';
import { AutocompleteFieldRenderer } from './field-renderers/AutocompleteFieldRenderer';
import { NumberFieldRenderer } from './field-renderers/NumberFieldRenderer';
import { SelectFieldRenderer } from './field-renderers/SelectFieldRenderer';
import { TextAreaFieldRenderer } from './field-renderers/TextAreaFieldRenderer';
import { CheckboxFieldRenderer } from './field-renderers/CheckboxFieldRenderer';
import { DateFieldRenderer } from './field-renderers/DateFieldRenderer';
import { TimeFieldRenderer } from './field-renderers/TimeFieldRenderer';
import { FileFieldRenderer } from './field-renderers/FileFieldRenderer';
import { useFieldDependencies } from './hooks/useFieldDependencies';

interface PreviewFieldProps {
  field: FormField;
  value: any;
  formValues: Record<string, any>;
  onChange: (value: any) => void;
  error?: string;
}

export function PreviewField({
  field,
  value,
  formValues,
  onChange,
  error,
}: PreviewFieldProps) {
  // Check field dependencies
  const {
    isValid,
    errors: dependencyErrors,
    dependencyParams,
  } = useFieldDependencies(field, formValues, onChange);

  const renderField = () => {
    const commonProps = {
      field,
      value,
      onChange,
      readOnly: field.readOnly,
    };

    switch (field.type) {
      case 'text':
        return <TextFieldRenderer {...commonProps} />;
      case 'password':
        return <PasswordFieldRenderer {...commonProps} />;
      case 'email':
        return <EmailFieldRenderer {...commonProps} error={error} />;
      case 'phone':
        return <PhoneFieldRenderer {...commonProps} error={error} />;
      case 'textarea':
        return <TextAreaFieldRenderer {...commonProps} />;
      case 'number':
        return <NumberFieldRenderer {...commonProps} />;
      case 'range':
        return <RangeFieldRenderer {...commonProps} />;
      case 'select':
        return <SelectFieldRenderer {...commonProps} />;
      case 'autocomplete':
        return <AutocompleteFieldRenderer {...commonProps} />;
      case 'checkbox':
        return <CheckboxFieldRenderer {...commonProps} />;
      case 'date':
        return <DateFieldRenderer {...commonProps} />;
      case 'time':
        return <TimeFieldRenderer {...commonProps} />;
      case 'file':
        return <FileFieldRenderer {...commonProps} />;

      default:
        return null;
    }
  };

  return (
    <div>
      <label className='block text-sm font-medium text-white'>
        {field.label}
        {field.required && <span className='text-red-500 ml-1'>*</span>}
        {error && <span className='text-red-500 text-sm ml-2'>{error}</span>}
        {!isValid && dependencyErrors.length > 0 && (
          <span className='text-amber-500 text-sm ml-2'>
            {dependencyErrors.join(', ')}
          </span>
        )}
      </label>
      {renderField()}
    </div>
  );
}
