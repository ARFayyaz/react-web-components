# React Web Components

A collection of reusable, framework-agnostic web components built with React, TypeScript, and Vite.

## Overview

This library provides a set of web components that can be used in any web application, regardless of the frontend framework. Each component is built with React but compiled to standard web components that work with:

- Vanilla JavaScript/HTML
- React applications
- Vue applications
- Angular applications
- Any other web framework

## Features

- **Framework-agnostic**: Use in any web application
- **TypeScript support**: Full type safety and intellisense
- **Shadow DOM**: Proper encapsulation and style isolation
- **Modern build tools**: Built with Vite for optimal performance
- **ESM & UMD builds**: Support for both module systems

## Available Components

- **Button**: Customizable button component
- **Input**: Text input with validation
- **Counter**: Interactive counter component
- **Alert**: Notification/alert component
- **PagePreview**: Complex form preview component with workflow integration

## Installation

```bash
npm install @arfayyaz/react-web-components
```

## Usage

### As Web Components (Framework-agnostic)

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/@arfayyaz/react-web-components@latest/dist/react-web-components.umd.cjs"></script>
  </head>
  <body>
    <react-button type="primary">Click me!</react-button>
    <react-counter initial="0"></react-counter>
    <react-input placeholder="Enter text..."></react-input>
  </body>
</html>
```

### As ES Modules

```javascript
import '@arfayyaz/react-web-components';

// Components are now available as custom elements
document.body.innerHTML = `
    <react-button type="primary">Click me!</react-button>
    <react-counter initial="5"></react-counter>
`;
```

### In React Applications

```jsx
import '@arfayyaz/react-web-components';

function App() {
  return (
    <div>
      <react-button type='primary'>Click me!</react-button>
      <react-counter initial='0'></react-counter>
    </div>
  );
}
```

## Development

This project uses Vite + React + TypeScript for development.

### Setup

```bash
npm install
npm run dev
```

### Building

```bash
npm run build
```

### Component Structure

Each component follows this pattern:

- React component in `src/components/`
- Web component wrapper in `src/web-components/`
- Automatic registration and export

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

MIT License
