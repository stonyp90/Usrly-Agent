import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from "@testcontainers/mongodb";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { GenericContainer, StartedTestContainer } from "testcontainers";

interface GlobalThis {
  __MONGO_CONTAINER__: StartedMongoDBContainer;
  __POSTGRES_CONTAINER__: StartedPostgreSqlContainer;
  __KEYCLOAK_CONTAINER__: StartedTestContainer;
  __API_URL__: string;
  __KEYCLOAK_URL__: string;
}

declare const globalThis: GlobalThis;

export default async function globalSetup() {
  console.log("\n🚀 Starting Testcontainers for E2E tests...\n");

  // Start PostgreSQL container for Keycloak
  console.log("📦 Starting PostgreSQL container...");
  const postgresContainer = await new PostgreSqlContainer("postgres:16-alpine")
    .withDatabase("keycloak")
    .withUsername("keycloak")
    .withPassword("keycloak")
    .start();
  globalThis.__POSTGRES_CONTAINER__ = postgresContainer;

  const postgresUri = postgresContainer.getConnectionUri();
  console.log(`✅ PostgreSQL started at: ${postgresUri}`);

  // Start Keycloak container
  console.log("📦 Starting Keycloak container...");
  try {
    const postgresHost = postgresContainer.getHost();
    const postgresPort = postgresContainer.getPort();

    const keycloakContainer = await new GenericContainer(
      "quay.io/keycloak/keycloak:23.0",
    )
      .withEnvironment({
        KEYCLOAK_ADMIN: "admin",
        KEYCLOAK_ADMIN_PASSWORD: "admin",
        KC_DB: "postgres",
        KC_DB_URL: `jdbc:postgresql://${postgresHost}:${postgresPort}/keycloak`,
        KC_DB_USERNAME: "keycloak",
        KC_DB_PASSWORD: "keycloak",
        KC_HOSTNAME_STRICT: "false",
        KC_PROXY: "edge",
        KC_HTTP_ENABLED: "true",
        KC_HEALTH_ENABLED: "true",
        KC_LOG_LEVEL: "INFO",
      })
      .withCommand(["start-dev"])
      .withExposedPorts(8080)
      .withStartupTimeout(180000) // 3 minutes for Keycloak
      .start();

    globalThis.__KEYCLOAK_CONTAINER__ = keycloakContainer;

    const keycloakPort = keycloakContainer.getMappedPort(8080);
    const keycloakUrl = `http://localhost:${keycloakPort}`;
    globalThis.__KEYCLOAK_URL__ = keycloakUrl;
    console.log(`✅ Keycloak container started at: ${keycloakUrl}`);

    // Wait for Keycloak to be ready (it takes time to initialize)
    console.log(
      "⏳ Waiting for Keycloak to be ready (this may take 2-3 minutes)...",
    );
    let keycloakReady = false;
    for (let i = 0; i < 90; i++) {
      try {
        const response = await fetch(`${keycloakUrl}/health`, {
          signal: AbortSignal.timeout(3000),
        });
        if (response.ok || response.status === 200) {
          keycloakReady = true;
          console.log(`✅ Keycloak is ready after ${i * 2} seconds`);
          break;
        }
      } catch (error) {
        // Continue waiting - container may still be starting
        if (i % 15 === 0 && i > 0) {
          console.log(`   Still waiting... (${i * 2}s elapsed)`);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    if (!keycloakReady) {
      console.log(
        "⚠️  Keycloak may not be fully ready, but continuing with tests...",
      );
      console.log(
        "   Some tests may fail if they require Keycloak authentication",
      );
    }
  } catch (error) {
    console.error("❌ Failed to start Keycloak container:", error);
    console.log(
      "⚠️  Continuing without Keycloak - authentication tests will fail",
    );
    // Set a default URL so tests can still run
    globalThis.__KEYCLOAK_URL__ = "http://localhost:8080";
  }

  // Start MongoDB container
  console.log("📦 Starting MongoDB container...");
  const mongoContainer = await new MongoDBContainer("mongo:7").start();
  globalThis.__MONGO_CONTAINER__ = mongoContainer;

  const mongoUri = mongoContainer.getConnectionString();
  console.log(`✅ MongoDB started at: ${mongoUri}`);

  // Set environment for tests
  process.env.MONGODB_URI = mongoUri;
  process.env.KEYCLOAK_URL = keycloakUrl;
  process.env.KEYCLOAK_REALM = "agent-orchestrator";
  process.env.KEYCLOAK_CLIENT_ID = "agent-api";
  process.env.KEYCLOAK_CLIENT_SECRET = "change-me";

  // Check if API is running locally
  const apiUrl = process.env.API_URL || "http://localhost:3000";
  globalThis.__API_URL__ = apiUrl;
  process.env.API_URL = apiUrl;

  try {
    const response = await fetch(`${apiUrl}/health`, {
      signal: AbortSignal.timeout(3000),
    });
    if (response.ok) {
      console.log(`✅ API available at: ${apiUrl}`);
    } else {
      console.log(`⚠️  API returned status ${response.status}`);
    }
  } catch {
    console.log(`\n⚠️  API not running at ${apiUrl}`);
    console.log("   Start the API with: npm run start:api");
    console.log("   Or set API_URL environment variable\n");
  }

  console.log("\n✅ E2E test environment ready!\n");
  console.log("📋 Container Summary:");
  console.log(`   - MongoDB: ${mongoUri}`);
  console.log(`   - PostgreSQL: ${postgresUri}`);
  console.log(`   - Keycloak: ${keycloakUrl}`);
  console.log(`   - API: ${apiUrl}\n`);
}
