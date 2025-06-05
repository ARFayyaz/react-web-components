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
    .mt-1 { margin-top: 0.25rem; }
    .block { display: block; }
    .w-full { width: 100%; }
    .rounded-md { border-radius: 0.375rem; }
    .border-white\\/10 { border-color: rgba(255, 255, 255, 0.1); }
    .bg-deep-space-blue\\/50 { background-color: rgba(15, 23, 42, 0.5); }
    .bg-deep-space-blue\\/85 { background-color: rgba(15, 23, 42, 0.85); }
    .text-white { color: #ffffff; }
    .text-white\\/50 { color: rgba(255, 255, 255, 0.5); }
    .text-red-500 { color: #ef4444; }
    .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
    .focus\\:border-primary:focus { border-color: #3b82f6; }
    .focus\\:ring-primary:focus { ring-color: #3b82f6; }
    .absolute { position: absolute; }
    .relative { position: relative; }
    .z-10 { z-index: 10; }
    .border { border-width: 1px; }
    .max-h-60 { max-height: 15rem; }
    .overflow-y-auto { overflow-y: auto; }
    .p-2 { padding: 0.5rem; }
    .hover\\:bg-deep-space-blue\\/50:hover { background-color: rgba(15, 23, 42, 0.5); }
    .cursor-pointer { cursor: pointer; }
    .space-y-6 > * + * { margin-top: 1.5rem; }
  `;
  shadowRoot.appendChild(styleElement);
}
