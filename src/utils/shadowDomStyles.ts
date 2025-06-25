// This function injects styles into Shadow DOM
export function injectStyles(shadowRoot: ShadowRoot) {
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    /* Font and Typography Reset */
    *, *::before, *::after {
      box-sizing: border-box;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    }
    
    /* Styles from index.css */
    :root {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
      line-height: 1.5;
      font-weight: 400;
      color-scheme: light dark;
      color: rgba(255, 255, 255, 0.87);
      background-color: #242424;
      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Ensure all elements inherit the font */
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, a, button, input, textarea, select, label {
      font-family: inherit;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    body {
      margin: 0;
      display: flex;
      place-items: center;
      min-width: 320px;
      min-height: 100vh;
    }

    h1 {
      font-size: 3.2em;
      line-height: 1.1;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      :root {
        color: #213547;
        background-color: #ffffff;
      }
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }

    /* Basic TailwindCSS utilities for web components */
    
    /* Layout & Spacing */
    .mt-1 { margin-top: 4px; } /* 0.25rem */
    .mt-2 { margin-top: 8px; } /* 0.5rem */
    .mt-6 { margin-top: 24px; } /* 1.5rem */
    .mb-4 { margin-bottom: 16px; } /* 1rem */
    .mb-6 { margin-bottom: 24px; } /* 1.5rem */
    .mx-4 { margin-left: 16px; margin-right: 16px; } /* 1rem */
    .ml-1 { margin-left: 4px; } /* 0.25rem */
    .ml-2 { margin-left: 8px; } /* 0.5rem */
    .p-2 { padding: 8px; } /* 0.5rem */
    .p-3 { padding: 12px; } /* 0.75rem */
    .p-4 { padding: 16px; } /* 1rem */
    .p-6 { padding: 24px; } /* 1.5rem */
    .px-4 { padding-left: 16px; padding-right: 16px; } /* 1rem */
    .py-2 { padding-top: 8px; padding-bottom: 8px; } /* 0.5rem */
    .pt-4 { padding-top: 16px; } /* 1rem */
    .pr-3 { padding-right: 12px; } /* 0.75rem */
    .pr-10 { padding-right: 40px; } /* 2.5rem */
    .space-y-6 > * + * { margin-top: 24px; } /* 1.5rem */
    
    /* Display & Positioning */
    .block { display: block; }
    .flex { display: flex; }
    .inline-flex { display: inline-flex; }
    .absolute { position: absolute; }
    .relative { position: relative; }
    .fixed { position: fixed; }
    .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
    .inset-y-0 { top: 0; bottom: 0; }
    .top-0 { top: 0; }
    .top-4 { top: 16px; } /* 1rem */
    .top-8 { top: 32px; } /* 2rem */
    .right-0 { right: 0; }
    .right-4 { right: 16px; } /* 1rem */
    .right-8 { right: 32px; } /* 2rem */
    .left-0 { left: 0; }
    .z-10 { z-index: 10; }
    .z-50 { z-index: 50; }
    
    /* Flexbox */
    .flex-1 { flex: 1 1 0%; }
    .flex-col { flex-direction: column; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .justify-between { justify-content: space-between; }
    .justify-end { justify-content: flex-end; }
    
    /* Sizing */
    .w-full { width: 100%; }
    .h-2 { height: 8px; } /* 0.5rem */
    .h-\\[1px\\] { height: 1px; }
    .max-w-2xl { max-width: 672px; } /* 42rem */
    .max-h-60 { max-height: 240px; } /* 15rem */
    .max-h-\\[90vh\\] { max-height: 90vh; }
    
    /* Borders & Radius */
    .border { border-width: 1px; }
    .border-t { border-top-width: 1px; }
    .border-transparent { border-color: transparent; }
    .border-gray-200 { border-color: #e5e7eb; }
    .border-gray-300 { border-color: #d1d5db; }
    .border-red-200 { border-color: #fecaca; }
    .border-red-300 { border-color: #fca5a5; }
    .border-white\\/10 { border-color: rgba(255, 255, 255, 0.1); }
    .border-pulse-cyan\\/30 { border-color: rgba(34, 197, 94, 0.3); }
    .rounded { border-radius: 4px; } /* 0.25rem */
    .rounded-md { border-radius: 6px; } /* 0.375rem */
    .rounded-lg { border-radius: 8px; } /* 0.5rem */
    .rounded-xl { border-radius: 12px; } /* 0.75rem */
    
    /* Colors & Backgrounds */
    .bg-white { background-color: #ffffff; }
    .bg-black\\/70 { background-color: rgba(0, 0, 0, 0.7); }
    .bg-deep-space-blue\\/30 { background-color: rgba(15, 23, 42, 0.3); }
    .bg-deep-space-blue\\/50 { background-color: rgba(15, 23, 42, 0.5); }
    .bg-deep-space-blue\\/85 { background-color: rgba(15, 23, 42, 0.85); }
    .bg-red-50 { background-color: #fef2f2; }
    .bg-primary { background-color: #3b82f6; }
    .bg-primary-900\\/30 { background-color: rgba(30, 58, 138, 0.3); }
    .bg-primary-900\\/50 { background-color: rgba(30, 58, 138, 0.5); }
    .bg-cyan-gradient { background: linear-gradient(90deg, #06b6d4, #10b981); }
    
    /* Text */
    .text-white { color: #ffffff; }
    .text-white\\/50 { color: rgba(255, 255, 255, 0.5); }
    .text-white\\/60 { color: rgba(255, 255, 255, 0.6); }
    .text-white\\/70 { color: rgba(255, 255, 255, 0.7); }
    .text-red-500 { color: #ef4444; }
    .text-red-600 { color: #dc2626; }
    .text-red-900 { color: #7f1d1d; }
    .text-gray-600 { color: #4b5563; }
    .text-gray-900 { color: #111827; }
    .text-amber-500 { color: #f59e0b; }
    .text-xs { font-size: 12px; line-height: 16px; } /* 0.75rem; 1rem */
    .text-sm { font-size: 14px; line-height: 20px; } /* 0.875rem; 1.25rem */
    .text-2xl { font-size: 24px; line-height: 32px; } /* 1.5rem; 2rem */
    .font-bold { font-weight: 700; }
    .font-medium { font-weight: 500; }
    .text-center { text-align: center; }
    .text-left { text-align: left; }
    
    /* Shadows & Effects */
    .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
    .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
    .backdrop-blur-sm { backdrop-filter: blur(4px); }
    .backdrop-blur-md { backdrop-filter: blur(12px); }
    
    /* Overflow */
    .overflow-hidden { overflow: hidden; }
    .overflow-y-auto { overflow-y: auto; }
    
    /* Interactions */
    .cursor-pointer { cursor: pointer; }
    .appearance-none { appearance: none; }
    .accent-primary { accent-color: #3b82f6; }
    
    /* Hover states */
    .hover\\:bg-deep-space-blue\\/50:hover { background-color: rgba(15, 23, 42, 0.5); }
    .hover\\:bg-primary-600:hover { background-color: #2563eb; }
    .hover\\:text-white:hover { color: #ffffff; }
    .hover\\:text-gray-500:hover { color: #6b7280; }
    .hover\\:file:bg-primary-900\\/50:hover { background-color: rgba(30, 58, 138, 0.5); }
    
    /* Focus states */
    .focus\\:border-primary:focus { border-color: #3b82f6; }
    .focus\\:border-red-500:focus { border-color: #ef4444; }
    .focus\\:ring-primary:focus { ring-color: #3b82f6; }
    .focus\\:ring-red-500:focus { ring-color: #ef4444; }
    .focus\\:ring-2:focus { ring-width: 2px; }
    .focus\\:ring-offset-2:focus { ring-offset-width: 2px; }
    .focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
    
    /* States */
    .disabled\\:bg-primary-400:disabled { background-color: #93c5fd; }
    
    /* File input styles */
    .file\\:mr-4::file-selector-button { margin-right: 16px; } /* 1rem */
    .file\\:py-2::file-selector-button { padding-top: 8px; padding-bottom: 8px; } /* 0.5rem */
    .file\\:px-4::file-selector-button { padding-left: 16px; padding-right: 16px; } /* 1rem */
    .file\\:rounded-md::file-selector-button { border-radius: 6px; } /* 0.375rem */
    .file\\:border-0::file-selector-button { border: 0; }
    .file\\:text-sm::file-selector-button { font-size: 14px; line-height: 20px; } /* 0.875rem; 1.25rem */
    .file\\:font-medium::file-selector-button { font-weight: 500; }
    .file\\:bg-primary-900\\/30::file-selector-button { background-color: rgba(30, 58, 138, 0.3); }
    .file\\:text-white::file-selector-button { color: #ffffff; }
    
    /* Placeholder styles */
    .placeholder-red-300::placeholder { color: #fca5a5; }
  `;
  shadowRoot.appendChild(styleElement);
}
