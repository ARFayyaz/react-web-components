import { useState, useEffect } from 'react';
import type { FormField } from '../lib/types';

interface DependencyValidation {
  isValid: boolean;
  errors: string[];
  dependencyParams: Record<string, any>;
}

export function useFieldDependencies(
  field: FormField,
  formValues: Record<string, any>,
  onChange: (value: any) => void
): DependencyValidation {
  const [validation, setValidation] = useState<DependencyValidation>({
    isValid: true,
    errors: [],
    dependencyParams: {},
  });

  useEffect(() => {
    if (!field.dataSource?.params) {
      setValidation({ isValid: true, errors: [], dependencyParams: {} });
      return;
    }

    const errors: string[] = [];
    const params: Record<string, any> = {};

    // Check each parameter that has a source field
    Object.entries(field.dataSource.params).forEach(([key, param]) => {
      if (typeof param === 'object' && param.sourceField) {
        const sourceValue = formValues[param.sourceField];

        // Check if required source field has a value
        if (param.required && !sourceValue && sourceValue !== 0) {
          errors.push(`${param.sourceField} is required`);
        }

        if (sourceValue !== undefined && sourceValue !== null) {
          let transformedValue = sourceValue;

          // Apply transformation if specified
          if (param.transform) {
            switch (param.transform) {
              case 'toString':
                transformedValue = String(sourceValue);
                break;
              case 'toNumber':
                transformedValue = Number(sourceValue);
                if (isNaN(transformedValue)) {
                  errors.push(`${param.sourceField} must be a number`);
                }
                break;
              case 'toLowerCase':
                transformedValue = String(sourceValue).toLowerCase();
                break;
              case 'toUpperCase':
                transformedValue = String(sourceValue).toUpperCase();
                break;
              case 'toBoolean':
                transformedValue = Boolean(sourceValue);
                break;
              case 'toArray':
                transformedValue = Array.isArray(sourceValue)
                  ? sourceValue
                  : [sourceValue];
                break;
            }
          }

          params[key] = transformedValue;
        }
      } else {
        // Static value
        params[key] = param.value;
      }
    });

    setValidation({
      isValid: errors.length === 0,
      errors,
      dependencyParams: params,
    });

    // Clear field value if dependencies are invalid
    if (errors.length > 0) {
      onChange(null);
    }
  }, [field.dataSource?.params, formValues, onChange]);

  return validation;
}
