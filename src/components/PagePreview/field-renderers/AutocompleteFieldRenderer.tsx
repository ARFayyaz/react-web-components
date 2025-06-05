import React, { useState, useEffect } from 'react';
import { usePageData } from '../hooks/usePageData';

interface AutocompleteFieldRendererProps {
  field: any;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export const AutocompleteFieldRenderer: React.FC<
  AutocompleteFieldRendererProps
> = ({ field, value, onChange, disabled, readOnly }) => {
  const [inputValue, setInputValue] = useState<string>(value || '');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  const [debouncedValue, setDebouncedValue] = useState<string>(inputValue);

  const params = {
    ...field.dataSource?.params,
  };

  const { data, isLoading, error } = usePageData(
    field.dataSource && shouldFetch
      ? {
          dataSource: {
            system: field.dataSource.system || '',
            objectType: field.dataSource.objectType || '',
            action: field.dataSource.action || '',
            params: {
              ...params,
            },
            searchParams: Object.fromEntries(
              Object.entries({ TextToSearch: debouncedValue }).filter(
                ([_, value]) => value !== ''
              )
            ),
          },
        }
      : undefined
  );

  const options = data?.result || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setShowDropdown(true);
    setShouldFetch(true); // Allow fetching when typing
  };

  const handleOptionSelect = (option: any) => {
    setInputValue(option[field.displayFields[0] || '']);
    setShowDropdown(false);
    setShouldFetch(false); // Prevent fetching when selecting
    onChange(option[field.valueField || '']);
  };

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  return (
    <div className='relative'>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        disabled={disabled || readOnly}
        placeholder={field.placeholder || 'Search...'}
        className='mt-1 block w-full rounded-md border-white/10 bg-deep-space-blue/50 text-white shadow-sm focus:border-primary focus:ring-primary'
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />
      {showDropdown && (
        <ul className='absolute z-10 bg-deep-space-blue/85 border border-white/10 w-full max-h-60 overflow-y-auto'>
          {isLoading ? (
            <li className='p-2 text-white/50'>Loading options...</li>
          ) : error ? (
            <li className='p-2 text-red-500'>Error loading options</li>
          ) : options.length === 0 ? (
            <li className='p-2 text-white/50'>No options found</li>
          ) : (
            options.map((option: any, index: number) => (
              <li
                key={index}
                className='p-2 hover:bg-deep-space-blue/50 cursor-pointer'
                onClick={() => handleOptionSelect(option)}
              >
                {option[field.displayFields[0] || '']}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
