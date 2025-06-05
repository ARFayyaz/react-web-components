import { useState, useEffect } from 'react';
import type { GridConfig } from '../lib/types';
import { fetchWithAuth } from './base';

export function usePageData(
  config?: { dataSource: GridConfig['dataSource'] },
  crudServiceUrl?: string,
  token?: string,
  apiKey?: string
) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!config?.dataSource) {
        setData(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchWithAuth(
          'execute',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system: config.dataSource.system,
              object_type: config.dataSource.objectType,
              action: config.dataSource.action,
              params: {
                ...config.dataSource.params,
                ...(config.dataSource.searchParams &&
                Object.keys(config.dataSource.searchParams).length > 0
                  ? { search: config.dataSource.searchParams }
                  : {}),
              },
            }),
          },
          crudServiceUrl,
          token,
          apiKey
        );
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch data')
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [config?.dataSource, crudServiceUrl, token, apiKey]);

  return { data, isLoading, error };
}
