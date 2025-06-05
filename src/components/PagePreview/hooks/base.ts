export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  crudServiceUrl?: string,
  token?: string,
  apiKey?: string
) {
  try {
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    // Get CRUD service URL from settings
    if (!crudServiceUrl) {
      throw new ApiError(400, 'CRUD service URL is required - check settings');
    }

    // Get auth token with fallback options
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    } else {
      console.error('No auth token available from any source');
    }

    if (apiKey) {
      headers.set('X-API-Key', apiKey);
    }

    // Build full URL using CRUD service URL
    const fullUrl = new URL(url.replace(/^\/+/, ''), crudServiceUrl).toString();

    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    if (!response?.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: 'An unexpected error occurred' }));
      throw new ApiError(
        response.status,
        error.detail || 'Request failed',
        error.details
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      500,
      error instanceof Error ? error.message : 'An unexpected error occurred'
    );
  }
}
