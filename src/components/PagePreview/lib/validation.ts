import type { FormField, ValidationError } from './types';

function validateFormField(
  field: FormField,
  value: any
): ValidationError | null {
  if (field.required && !value && value !== 0) {
    return {
      field: field.name,
      message: `${field.label} is required`,
    };
  }

  if (field.type === 'number') {
    if (field.minValue !== null && value < field.minValue!) {
      return {
        field: field.name,
        message: `${field.label} must be at least ${field.minValue}`,
      };
    }
    if (field.maxValue !== null && value > field.maxValue!) {
      return {
        field: field.name,
        message: `${field.label} must be at most ${field.maxValue}`,
      };
    }
  }

  if (field.type === 'text' && field.regexPattern) {
    const regex = new RegExp(field.regexPattern);
    if (!regex.test(value)) {
      return {
        field: field.name,
        message: `${field.label} has an invalid format`,
      };
    }
  }

  if (field.type === 'email') {
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return {
        field: field.name,
        message: 'Please enter a valid email address',
      };
    }
  }

  if (field.type === 'phone') {
    if (!value?.number) {
      return {
        field: field.name,
        message: 'Phone number is required',
      };
    }
    // Basic phone number validation - allows digits, spaces, parentheses, and hyphens
    if (!/^[0-9\-\(\)\s]+$/.test(value.number)) {
      return {
        field: field.name,
        message: 'Please enter a valid phone number',
      };
    }
  }

  return null;
}

export function validateFormData(
  fields: FormField[],
  formData: Record<string, any>
): ValidationError[] {
  const errors: ValidationError[] = [];

  fields.forEach((field) => {
    const error = validateFormField(field, formData[field.name]);
    if (error) {
      errors.push(error);
    }
  });

  return errors;
}
