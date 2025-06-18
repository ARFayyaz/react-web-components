import { createRoot } from "react-dom/client";
import { PagePreview } from "../components/PagePreview/PagePreview";
import { injectStyles } from "../utils/shadowDomStyles";

class PagePreviewWC extends HTMLElement {
  private root: ShadowRoot;
  private reactRoot: ReturnType<typeof createRoot>;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    // Inject TailwindCSS styles into Shadow DOM
    injectStyles(this.root);

    const container = document.createElement("div");
    this.root.appendChild(container);
    this.reactRoot = createRoot(container);
  }

  static get observedAttributes() {
    return [
      "workflow-name",
      "token",
      "api-key",
      "crud-service-url",
      "active-rows-data",
      "pre-populated-data",
      "parameter-mapping",
    ];
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
    const workflowName = this.getAttribute("workflow-name") || "";
    const token = this.getAttribute("token") || "";
    const apiKey = this.getAttribute("api-key") || undefined;
    const crudServiceUrl =
      this.getAttribute("crud-service-url") ||
      "https://crud.ocg.labs.empowernow.ai";

    // Parse JSON attributes
    let activeRowsData = null;
    let prePopulatedData = {};
    let parameterMapping = {};

    try {
      const activeRowsDataAttr = this.getAttribute("active-rows-data");
      if (activeRowsDataAttr) {
        activeRowsData = JSON.parse(activeRowsDataAttr);
      }
    } catch (e) {
      console.warn("Invalid active-rows-data JSON:", e);
    }

    try {
      const prePopulatedDataAttr = this.getAttribute("pre-populated-data");
      if (prePopulatedDataAttr) {
        prePopulatedData = JSON.parse(prePopulatedDataAttr);
      }
    } catch (e) {
      console.warn("Invalid pre-populated-data JSON:", e);
    }

    try {
      const parameterMappingAttr = this.getAttribute("parameter-mapping");
      if (parameterMappingAttr) {
        parameterMapping = JSON.parse(parameterMappingAttr);
      }
    } catch (e) {
      console.warn("Invalid parameter-mapping JSON:", e);
    }

    const handleShowNotification = (
      message: string,
      type: "success" | "error"
    ) => {
      // Dispatch custom event that can be listened to from outside
      this.dispatchEvent(
        new CustomEvent("notification", {
          detail: { message, type },
          bubbles: true,
        })
      );

      // Also log to console as fallback
      console.log(`${type.toUpperCase()}: ${message}`);
    };

    this.reactRoot.render(
      <PagePreview
        workflowName={workflowName}
        token={token}
        apiKey={apiKey}
        crudServiceUrl={crudServiceUrl}
        activeRowsData={activeRowsData}
        prePopulatedData={prePopulatedData}
        parameterMapping={parameterMapping}
        handleShowNotification={handleShowNotification}
      />
    );
  }
}

customElements.define("react-page-preview", PagePreviewWC);
