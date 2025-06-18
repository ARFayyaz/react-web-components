import { createRoot } from "react-dom/client";
import { Input } from "../components/Input";
import { injectStyles } from "../utils/shadowDomStyles";

function parseStyleString(
  styleString: string | null
): React.CSSProperties | undefined {
  if (!styleString) return undefined;
  const styleObj: Record<string, string> = {};
  styleString.split(";").forEach((rule) => {
    const [key, value] = rule.split(":");
    if (key && value) {
      styleObj[key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase())] =
        value.trim();
    }
  });
  return styleObj as React.CSSProperties;
}

class InputWC extends HTMLElement {
  private root: ShadowRoot;
  private reactRoot: ReturnType<typeof createRoot>;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    const container = document.createElement("div");
    this.root.appendChild(container);
    this.reactRoot = createRoot(container);

    // Inject styles into shadow DOM
    injectStyles(this.root);
  }

  static get observedAttributes() {
    return ["placeholder", "style"];
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
    const placeholder = this.getAttribute("placeholder") || "Type something...";
    const styleAttr = this.getAttribute("style");
    const style = parseStyleString(styleAttr);
    this.reactRoot.render(<Input placeholder={placeholder} style={style} />);
  }
}

customElements.define("react-input", InputWC);
