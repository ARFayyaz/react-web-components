import { createRoot } from "react-dom/client";
import { Alert } from "../components/Alert";
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

class AlertWC extends HTMLElement {
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
    return ["message", "type", "style"];
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
    const message = this.getAttribute("message") || "This is an alert!";
    const type = (this.getAttribute("type") || "info") as
      | "success"
      | "error"
      | "info";
    const styleAttr = this.getAttribute("style");
    const style = parseStyleString(styleAttr);
    this.reactRoot.render(
      <Alert message={message} type={type} style={style} />
    );
  }
}

customElements.define("react-alert", AlertWC);
