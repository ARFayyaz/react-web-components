import { createRoot } from 'react-dom/client';
import { Button } from '../components/Button';

function parseStyleString(
  styleString: string | null
): React.CSSProperties | undefined {
  if (!styleString) return undefined;
  const styleObj: Record<string, string> = {};
  styleString.split(';').forEach((rule) => {
    const [key, value] = rule.split(':');
    if (key && value) {
      styleObj[key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase())] =
        value.trim();
    }
  });
  return styleObj as React.CSSProperties;
}

class ButtonWC extends HTMLElement {
  private root: ShadowRoot;
  private reactRoot: ReturnType<typeof createRoot>;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    const container = document.createElement('div');
    this.root.appendChild(container);
    this.reactRoot = createRoot(container);
  }

  static get observedAttributes() {
    return ['label', 'color', 'style'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.reactRoot.unmount();
  }

  private render() {
    const label = this.getAttribute('label') || 'Click Me';
    const color = this.getAttribute('color') || '#007bff';
    const styleAttr = this.getAttribute('style');
    const style = parseStyleString(styleAttr);
    this.reactRoot.render(<Button label={label} color={color} style={style} />);
  }
}

customElements.define('react-button', ButtonWC);
