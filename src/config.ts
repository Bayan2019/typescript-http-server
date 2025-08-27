import type { MigrationConfig } from "drizzle-orm/migrator";

// Ch 6. Storage Lv 4. Automatic Migrations
type Config = {
  api: APIConfig;
  db: DBConfig;
};

// Ch 2. Routing Lv 2. API Config
// Create a type that will hold any stateful, in-memory data we'll need to keep track of
type APIConfig = {
  fileServerHits: number;
  // Ch 6. Storage Lv 3. Drizzle Queries
  // Add a dbURL property to the config object.
  // dbURL: string;
  // Ch 6. Storage Lv 4. Automatic Migrations
  port: number;
};

// Ch 6. Storage Lv 4. Automatic Migrations
type DBConfig = {
  url: string;
  migrationConfig: MigrationConfig;
};

// Ch 6. Storage Lv 4. Automatic Migrations
const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/db/migrations",
};

// Ch 6. Storage Lv 3. Drizzle Queries
// call process.loadEnvFile() 
// to load the environment variables in our .env fil
process.loadEnvFile()

// Ch 6. Storage Lv 3. Drizzle Queries
function envOrThrow(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

// Ch 2. Routing Lv 2. API Config
// Create a config object that will hold the stateful data
// export const config: APIConfig = {
//     fileserverHits: 0,
//     // Ch 6. Storage Lv 3. Drizzle Queries
//     // Load the DB_URL environment variable into the dbURL property
//     dbURL: envOrThrow("DB_URL"),
// };
// Ch 6. Storage Lv 4. Automatic Migrations
export const config: Config = {
  api: {
    fileServerHits: 0,
    port: Number(envOrThrow("PORT")),
  },
  db: {
    url: envOrThrow("DB_URL"),
    migrationConfig: migrationConfig,
  },
};