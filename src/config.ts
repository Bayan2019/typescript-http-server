
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
// Create a type that will hold any stateful, in-memory data we'll need to keep track of
type APIConfig = {
  fileserverHits: number;
  // Ch 6. Storage Lv 3. Drizzle Queries
  // Add a dbURL property to the config object.
  dbURL: string;
};

// Ch 2. Routing Lv 2. API Config
// Create a config object that will hold the stateful data
export const config: APIConfig = {
    fileserverHits: 0,
    // Ch 6. Storage Lv 3. Drizzle Queries
    // Load the DB_URL environment variable into the dbURL property
    dbURL: envOrThrow("DB_URL"),
};