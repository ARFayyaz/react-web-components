import React, { useEffect, useMemo, useState } from "react";
import type { FormDefinition, ValidationError } from "./lib/types";
import { validateFormData } from "./lib/validation";
import { executeGraphWorkflow } from "./lib/workflowExecution";
import { PreviewField } from "./PreviewField";

interface FormPreviewProps {
  form: FormDefinition;
  initialValues?: Record<string, any>;
  onSubmit?: (data: Record<string, any>) => Promise<void>;
  onError?: (errors: ValidationError[]) => void;
  crudServiceUrl?: string;
  token?: string;
  apiKey?: string;
  handleShowNotification?: (message: string, type: "success" | "error") => void;
}

export function FormPreview({
  form,
  initialValues = {},
  onSubmit,
  onError,
  crudServiceUrl,
  token,
  apiKey,
  handleShowNotification = (message: string, type: "success" | "error") => {},
}: FormPreviewProps) {
  // Memoize the default initialValues to ensure a stable reference
  const memoizedInitialValues = useMemo(() => initialValues, [form]);

  const [formData, setFormData] = useState<Record<string, any>>(
    memoizedInitialValues
  );
  const [errors, setErrors] = useState<
    Array<{ field: string; message: string }>
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(memoizedInitialValues);
  }, [memoizedInitialValues]);

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    setErrors((prev) => prev.filter((error) => error.field !== name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Return early if the form is in view-only mode
    if (form.isViewOnly) {
      handleShowNotification("Form is in view-only mode", "error");
      return;
    }

    // Validate form data
    const validationErrors = validateFormData(form.fields, formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default submission behavior
        await executeGraphWorkflow(
          form.workflowName,
          formData,
          crudServiceUrl,
          token,
          apiKey
        );
        handleShowNotification("Form submitted successfully", "success");
      }

      // Reset form after successful submission
      setFormData({});
      setErrors([]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Form submission failed";
      setErrors([
        {
          field: "_form",
          message,
        },
      ]);
      handleShowNotification(message, "error");
      onError?.(errors);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900'>{form.title}</h2>
        {form.description && (
          <p className='mt-2 text-gray-600'>{form.description}</p>
        )}
      </div>

      {errors.some((e) => e.field === "_form") && (
        <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600'>
          {errors.find((e) => e.field === "_form")?.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-6'>
        {form.fields
          .filter((field) => !field.hidden)
          .map((field) => (
            <PreviewField
              key={field.id}
              field={field}
              value={formData[field.name]}
              formValues={formData}
              onChange={(value) => handleFieldChange(field.name, value)}
              error={errors.find((e) => e.field === field.name)?.message}
            />
          ))}

        {!form.isViewOnly && (
          <div className='pt-4'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-primary-400'
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
