import { createRoot } from "react-dom/client";
import { Counter } from "../components/Counter";
import { injectStyles } from "../utils/shadowDomStyles";

class CounterWC extends HTMLElement {
  private root: ShadowRoot;
  private reactRoot: ReturnType<typeof createRoot>;

  constructor() {
    super();
    // Create a shadow root
    this.root = this.attachShadow({ mode: "open" });
    // Create a container for React
    const container = document.createElement("div");
    this.root.appendChild(container);
    // Create React root
    this.reactRoot = createRoot(container);

    // Inject styles into shadow DOM
    injectStyles(this.root);
  }

  // Called when the element is added to the DOM
  connectedCallback() {
    this.render();
  }

  // Called when the element is removed from the DOM
  disconnectedCallback() {
    this.reactRoot.unmount();
  }

  // Called when observed attributes change
  static get observedAttributes() {
    return ["initial-count", "label"];
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const initialCount = parseInt(
      this.getAttribute("initial-count") || "0",
      10
    );
    const label = this.getAttribute("label") || "Counter";

    this.reactRoot.render(
      <Counter initialCount={initialCount} label={label} />
    );
  }
}

// Register the custom element
customElements.define("react-counter", CounterWC);
