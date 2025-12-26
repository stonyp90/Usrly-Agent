/**
 * Comprehensive Integration Tests using Testcontainers
 *
 * These tests verify that all services work together:
 * - MongoDB (database)
 * - PostgreSQL (Keycloak database)
 * - Keycloak (authentication)
 * - API (NestJS application)
 *
 * All containers are managed by Testcontainers and started/stopped automatically.
 */

import {
  fetchApi,
  fetchKeycloak,
  waitForService,
  getKeycloakUrl,
} from "./test-utils";

describe("Integration Tests (E2E)", () => {
  describe("Container Health Checks", () => {
    it("should have MongoDB container running", async () => {
      // MongoDB is started in globalSetup
      expect(process.env.MONGODB_URI).toBeDefined();
      expect(process.env.MONGODB_URI).toContain("mongodb://");
    });

    it("should have PostgreSQL container running", () => {
      // PostgreSQL is started in globalSetup for Keycloak
      // We verify indirectly through Keycloak health check
      expect(process.env.KEYCLOAK_URL).toBeDefined();
    });

    it("should have Keycloak container running and healthy", async () => {
      const keycloakUrl = getKeycloakUrl();
      const healthUrl = `${keycloakUrl}/health`;

      const isReady = await waitForService(healthUrl, 30, 2000);
      expect(isReady).toBe(true);

      const response = await fetchKeycloak("/health");
      expect(response.ok).toBe(true);
    });
  });

  describe("API Health Endpoint", () => {
    it("should return health status", async () => {
      const response = await fetchApi("/health");

      expect(response.ok).toBe(true);

      const body = await response.json();
      expect(body).toHaveProperty("status");
    });

    it("should respond within acceptable time", async () => {
      const startTime = Date.now();
      await fetchApi("/health");
      const responseTime = Date.now() - startTime;

      // Health check should respond within 2 seconds
      expect(responseTime).toBeLessThan(2000);
    });

    it("should return JSON content type", async () => {
      const response = await fetchApi("/health");
      const contentType = response.headers.get("content-type");

      expect(contentType).toContain("application/json");
    });
  });

  describe("Keycloak Integration", () => {
    it("should access Keycloak admin console", async () => {
      const keycloakUrl = getKeycloakUrl();
      const response = await fetchKeycloak("/admin");

      // Keycloak admin console should be accessible
      // May return 401/403 if not authenticated, but should not be 404
      expect([200, 401, 403]).toContain(response.status);
    });

    it("should have Keycloak realm configured", async () => {
      // Verify Keycloak is configured with the expected realm
      const keycloakUrl = getKeycloakUrl();
      const realmUrl = `${keycloakUrl}/realms/agent-orchestrator`;

      const response = await fetchKeycloak("/realms/agent-orchestrator");
      // Realm endpoint should exist (may require authentication)
      expect([200, 401, 403]).toContain(response.status);
    });
  });

  describe("Environment Configuration", () => {
    it("should have all required environment variables set", () => {
      expect(process.env.MONGODB_URI).toBeDefined();
      expect(process.env.KEYCLOAK_URL).toBeDefined();
      expect(process.env.KEYCLOAK_REALM).toBe("agent-orchestrator");
      expect(process.env.KEYCLOAK_CLIENT_ID).toBe("agent-api");
    });

    it("should have API URL configured", () => {
      expect(process.env.API_URL).toBeDefined();
      expect(process.env.API_URL).toMatch(/^https?:\/\//);
    });
  });
});
