import React, { useState } from 'react';

interface AlertProps {
  message?: string;
  type?: 'success' | 'error' | 'info';
  style?: React.CSSProperties;
}

export const Alert: React.FC<AlertProps> = ({
  message = 'This is an alert!',
  type = 'info',
  style,
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  let bgColor = '#2196f3';
  if (type === 'success') bgColor = '#4caf50';
  if (type === 'error') bgColor = '#f44336';

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: 'white',
        padding: '12px 20px',
        borderRadius: '4px',
        marginBottom: '10px',
        position: 'relative',
        minWidth: '200px',
        display: 'inline-block',
        ...style,
      }}
    >
      {message}
      <button
        onClick={() => setVisible(false)}
        style={{
          position: 'absolute',
          right: 8,
          top: 8,
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer',
        }}
        aria-label='Close'
      >
        ×
      </button>
    </div>
  );
};
