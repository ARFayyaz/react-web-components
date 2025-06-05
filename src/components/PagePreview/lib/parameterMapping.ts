import type { FormField } from './types';

export function validateParameterMapping(
  formFields: FormField[],
  gridColumns: string[],
  mapping: Record<string, string>
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  Object.entries(mapping).forEach(([formField, gridColumn]) => {
    if (!formFields.find((f) => f.name === formField)) {
      errors.push(`Form field "${formField}" does not exist`);
    }
    if (!gridColumns.includes(gridColumn)) {
      errors.push(`Grid column "${gridColumn}" does not exist`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function mapGridDataToFormValues(
  gridData: Record<string, any>,
  mapping: Record<string, string>
): Record<string, any> {
  const formValues: Record<string, any> = {};

  Object.entries(mapping).forEach(([formField, gridColumn]) => {
    formValues[formField] = gridData[gridColumn];
  });

  return formValues;
}
