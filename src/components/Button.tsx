import React, { useState } from 'react';

interface ButtonProps {
  label?: string;
  color?: string;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  label = 'Click Me',
  color = '#007bff',
  style,
}) => {
  const [count, setCount] = useState(0);

  return (
    <button
      style={{
        backgroundColor: color,
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        ...style,
      }}
      onClick={() => setCount(count + 1)}
    >
      {label} ({count})
    </button>
  );
};
