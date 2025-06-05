import React, { useState } from 'react';

interface CounterProps {
  initialCount?: number;
  label?: string;
}

export const Counter: React.FC<CounterProps> = ({
  initialCount = 0,
  label = 'Counter',
}) => {
  const [count, setCount] = useState(initialCount);

  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        display: 'inline-block',
      }}
    >
      <h3>{label}</h3>
      <p>Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: '8px 16px',
          marginRight: '8px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Increment
      </button>
      <button
        onClick={() => setCount(count - 1)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Decrement
      </button>
    </div>
  );
};
