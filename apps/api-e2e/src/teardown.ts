import { StartedMongoDBContainer } from "@testcontainers/mongodb";
import { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { StartedTestContainer } from "testcontainers";

interface GlobalThis {
  __MONGO_CONTAINER__: StartedMongoDBContainer;
  __POSTGRES_CONTAINER__: StartedPostgreSqlContainer;
  __KEYCLOAK_CONTAINER__: StartedTestContainer;
}

declare const globalThis: GlobalThis;

export default async function globalTeardown() {
  console.log("\n🧹 Cleaning up test containers...\n");

  // Stop Keycloak container
  if (globalThis.__KEYCLOAK_CONTAINER__) {
    console.log("📦 Stopping Keycloak container...");
    await globalThis.__KEYCLOAK_CONTAINER__.stop();
    console.log("✅ Keycloak container stopped");
  }

  // Stop PostgreSQL container
  if (globalThis.__POSTGRES_CONTAINER__) {
    console.log("📦 Stopping PostgreSQL container...");
    await globalThis.__POSTGRES_CONTAINER__.stop();
    console.log("✅ PostgreSQL container stopped");
  }

  // Stop MongoDB container
  if (globalThis.__MONGO_CONTAINER__) {
    console.log("📦 Stopping MongoDB container...");
    await globalThis.__MONGO_CONTAINER__.stop();
    console.log("✅ MongoDB container stopped");
  }

  console.log("\n✅ E2E test cleanup complete!\n");
}
