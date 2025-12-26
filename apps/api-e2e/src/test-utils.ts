interface GlobalThis {
  __API_URL__: string;
  __KEYCLOAK_URL__: string;
}

declare const globalThis: GlobalThis;

export const getApiUrl = (): string => {
  return (
    process.env.API_URL || globalThis.__API_URL__ || "http://localhost:3000"
  );
};

export const getKeycloakUrl = (): string => {
  return (
    process.env.KEYCLOAK_URL ||
    globalThis.__KEYCLOAK_URL__ ||
    "http://localhost:8080"
  );
};

export const fetchApi = async (
  path: string,
  options?: RequestInit,
): Promise<Response> => {
  const url = `${getApiUrl()}${path}`;
  return fetch(url, options);
};

export const fetchKeycloak = async (
  path: string,
  options?: RequestInit,
): Promise<Response> => {
  const url = `${getKeycloakUrl()}${path}`;
  return fetch(url, options);
};

/**
 * Wait for a service to be ready by polling a health endpoint
 */
export const waitForService = async (
  url: string,
  maxAttempts = 30,
  intervalMs = 2000,
): Promise<boolean> => {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(2000),
      });
      if (response.ok) {
        return true;
      }
    } catch {
      // Continue waiting
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  return false;
};
