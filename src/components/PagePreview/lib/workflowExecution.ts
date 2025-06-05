import { fetchWithAuth } from '../hooks/base';

export class WorkflowError extends Error {
  constructor(message: string, public readonly details?: any) {
    super(message);
    this.name = 'WorkflowError';
  }
}

export async function resumeGraphWorkflow(
  correlationId: string | null,
  inputData: Record<string, any>,
  crudServiceUrl?: string,
  token?: string,
  apiKey?: string
): Promise<any> {
  try {
    // Call backend API endpoint which will handle CRUD service URL
    return await fetchWithAuth(
      `/workflow/resume/${correlationId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: inputData || {},
        }),
      },
      crudServiceUrl,
      token,
      apiKey
    );
  } catch (error) {
    console.error('Workflow execution failed:', error);
    throw new WorkflowError(
      error instanceof Error ? error.message : 'Failed to execute workflow',
      { originalError: error }
    );
  }
}

export async function executeGraphWorkflow(
  workflowName: string,
  inputData: Record<string, any>,
  crudServiceUrl?: string,
  token?: string,
  apiKey?: string
): Promise<any> {
  try {
    if (!workflowName?.trim()) {
      throw new WorkflowError('Workflow name is required');
    }

    console.error('Executing workflow', {
      workflowName,
      inputDataKeys: inputData ? Object.keys(inputData) : {},
    });

    // Call backend API endpoint which will handle CRUD service URL
    return await fetchWithAuth(
      '/workflow/start',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workflow_name: workflowName,
          data: inputData || {},
        }),
      },
      crudServiceUrl,
      token,
      apiKey
    );
  } catch (error) {
    console.error('Workflow execution failed:', error);
    throw new WorkflowError(
      error instanceof Error ? error.message : 'Failed to execute workflow',
      { originalError: error }
    );
  }
}
