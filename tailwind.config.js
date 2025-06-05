/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-space-blue': {
          50: '#f0f4ff',
          100: '#e0e7ff',
          500: '#3b82f6',
          900: '#1e3a8a',
          950: '#0f172a',
        },
        primary: {
          DEFAULT: '#3b82f6',
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
};
