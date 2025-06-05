// Add to existing types.ts
export type LogLevel = "debug" | "info" | "warn" | "error";

export interface DataSource {
  system: string;
  objectType: string;
  action: string;
  searchParams?: Record<string, string>;
  isServerSidePagination?: boolean;
  disableRowSelection?: boolean;
  allowMultipleRowSelection?: boolean;
  params: Record<
    string,
    {
      value: string;
      sourceField?: string;
      required?: boolean;
      transform?:
        | "toString"
        | "toNumber"
        | "toLowerCase"
        | "toUpperCase"
        | "toBoolean"
        | "toArray";
    }
  >;
}

export interface AuthZConfig {
  resourceType: string;
  actions: string[];
  resourceAttributes?: Record<string, any>;
}

export interface MatrixConfig {
  rowField: string; // Field from data source to use for row labels
  columnField: string; // Field from data source to use for column headers
  selectedItems?: Array<{ rowValue: string; columnValue: string }>; // Pre-selected items
}

export interface FormField {
  id: string;
  type: string;
  label: string;
  name: string;
  layout?: string;
  required: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  placeholder?: string;
  showCountrySelect?: boolean;
  options?: Array<{ value: string; label: string }>;
  minValue?: number | null;
  maxValue?: number | null;
  rows?: number | null;
  dataSource?: DataSource | null;
  valueField?: string | null;
  displayFields?: string[] | null;
  columnOrder?: string[] | null;
  regexPattern?: string;
  visibilityToggle?: boolean;
  searchParams?: Record<string, string>;
  dependentOn?: string | null;
  matrixConfig?: MatrixConfig | null;
}

export interface FormDefinition {
  id: string;
  title: string;
  description: string;
  crudServiceUrl: string;
  workflowName: string;
  fields: FormField[];
  isViewOnly?: boolean;
}

export interface PageConfig {
  id: string;
  title: string;
  description: string;
  crudServiceUrl: string;
  grids: Array<{
    id: string;
    name: string;
    gridConfig: GridConfig | null;
    actions: ActionConfig[];
  }>;
}

export interface GridConfig {
  id: string;
  columns: string[];
  dataSource: {
    system: string;
    objectType: string;
    action: string;
    params: Record<string, any>;
    searchParams?: Record<string, string>;
    isServerSidePagination?: boolean;
    disableRowSelection?: boolean;
    allowMultipleRowSelection?: boolean;
  };
}

export interface ActionConfig {
  id: string;
  authzConfig?: AuthZConfig;
  label: string;
  contextual: boolean;
  acceptsArrayOfItems?: boolean;
  formId: string;
  workflowName: string;
  parameterMapping: Record<string, string>;
}

export interface ValidationError {
  field: string;
  message: string;
}
