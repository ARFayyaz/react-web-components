// This function injects the main CSS (including TailwindCSS) into Shadow DOM
export function injectStyles(shadowRoot: ShadowRoot) {
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = '/src/index.css';
  shadowRoot.appendChild(linkElement);

  // Alternative: inline styles injection
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    /* Basic TailwindCSS utilities for web components */
    
    /* Layout & Spacing */
    .mt-1 { margin-top: 0.25rem; }
    .mt-2 { margin-top: 0.5rem; }
    .mt-6 { margin-top: 1.5rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-6 { margin-bottom: 1.5rem; }
    .mx-4 { margin-left: 1rem; margin-right: 1rem; }
    .p-2 { padding: 0.5rem; }
    .p-3 { padding: 0.75rem; }
    .p-4 { padding: 1rem; }
    .p-6 { padding: 1.5rem; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
    .pt-4 { padding-top: 1rem; }
    .space-y-6 > * + * { margin-top: 1.5rem; }
    
    /* Display & Positioning */
    .block { display: block; }
    .flex { display: flex; }
    .absolute { position: absolute; }
    .relative { position: relative; }
    .fixed { position: fixed; }
    .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
    .top-0 { top: 0; }
    .top-4 { top: 1rem; }
    .right-4 { right: 1rem; }
    .left-0 { left: 0; }
    .z-10 { z-index: 10; }
    .z-50 { z-index: 50; }
    
    /* Flexbox */
    .flex-1 { flex: 1 1 0%; }
    .flex-col { flex-direction: column; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .justify-between { justify-content: space-between; }
    
    /* Sizing */
    .w-full { width: 100%; }
    .max-w-2xl { max-width: 42rem; }
    .max-h-60 { max-height: 15rem; }
    .max-h-\\[90vh\\] { max-height: 90vh; }
    .h-\\[1px\\] { height: 1px; }
    
    /* Borders & Radius */
    .border { border-width: 1px; }
    .border-t { border-top-width: 1px; }
    .border-transparent { border-color: transparent; }
    .border-gray-200 { border-color: #e5e7eb; }
    .border-red-200 { border-color: #fecaca; }
    .border-white\\/10 { border-color: rgba(255, 255, 255, 0.1); }
    .border-pulse-cyan\\/30 { border-color: rgba(34, 197, 94, 0.3); }
    .rounded-md { border-radius: 0.375rem; }
    .rounded-lg { border-radius: 0.5rem; }
    .rounded-xl { border-radius: 0.75rem; }
    
    /* Colors & Backgrounds */
    .bg-white { background-color: #ffffff; }
    .bg-black\\/70 { background-color: rgba(0, 0, 0, 0.7); }
    .bg-deep-space-blue\\/50 { background-color: rgba(15, 23, 42, 0.5); }
    .bg-deep-space-blue\\/85 { background-color: rgba(15, 23, 42, 0.85); }
    .bg-red-50 { background-color: #fef2f2; }
    .bg-primary { background-color: #3b82f6; }
    .bg-cyan-gradient { background: linear-gradient(90deg, #06b6d4, #10b981); }
    
    /* Text */
    .text-white { color: #ffffff; }
    .text-white\\/50 { color: rgba(255, 255, 255, 0.5); }
    .text-white\\/70 { color: rgba(255, 255, 255, 0.7); }
    .text-red-500 { color: #ef4444; }
    .text-red-600 { color: #dc2626; }
    .text-gray-600 { color: #4b5563; }
    .text-gray-900 { color: #111827; }
    .text-2xl { font-size: 1.5rem; line-height: 2rem; }
    .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
    .font-bold { font-weight: 700; }
    .font-medium { font-weight: 500; }
    .text-center { text-align: center; }
    
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
    .hover\\:bg-deep-space-blue\\/50:hover { background-color: rgba(15, 23, 42, 0.5); }
    .hover\\:bg-primary-600:hover { background-color: #2563eb; }
    .hover\\:text-white:hover { color: #ffffff; }
    .focus\\:border-primary:focus { border-color: #3b82f6; }
    .focus\\:ring-2:focus { ring-width: 2px; }
    .focus\\:ring-primary:focus { ring-color: #3b82f6; }
    .focus\\:ring-offset-2:focus { ring-offset-width: 2px; }
    .focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
    
    /* States */
    .disabled\\:bg-primary-400:disabled { background-color: #93c5fd; }
  `;
  shadowRoot.appendChild(styleElement);
}
