// Ch 2. Routing Lv 2. API Config
// Create a type that will hold any stateful, in-memory data we'll need to keep track of
type APIConfig = {
  fileserverHits: number;
};

// Ch 2. Routing Lv 2. API Config
// Create a config object that will hold the stateful data
export const config: APIConfig = {
    fileserverHits: 0,
};