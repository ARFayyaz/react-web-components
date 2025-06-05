import React, { useState } from 'react';

interface InputProps {
  placeholder?: string;
  style?: React.CSSProperties;
}

export const Input: React.FC<InputProps> = ({
  placeholder = 'Type something...',
  style,
}) => {
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'inline-block', ...style }}>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '16px',
        }}
      />
      <div style={{ marginTop: '8px', color: '#555' }}>Value: {value}</div>
    </div>
  );
};
