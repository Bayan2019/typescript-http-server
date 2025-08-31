import express from "express";
// import path from "path";
import { Request } from "express";
import { handlerReadiness } from "./api/readiness.js";
import { errorHandler, middlewareLogResponses, middlewareMetricsInc } from "./api/middlewares.js";
import { handlerMetric } from "./api/metric.js";
import { handlerReset } from "./api/reset.js";
import { handlerCreateChirp, handlerGetChirp, handlerGetChirps } from "./api/chirps.js";
import { config } from "./config.js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { handlerCreateUser } from "./api/users.js";


// Ch 6. Storage Lv 4. Automatic Migrations
const migrationClient = postgres(config.db.url, { max: 1 });
await migrate(drizzle(migrationClient), config.db.migrationConfig);


const app = express();
// const PORT = 8080;

// Ch 4. JSON Lv 3. JSON Middleware 
// Register the express.json() middleware in your server.
app.use(express.json())
// Ch 2. Routing Lv 1. Middleware
// Use the middleware at the application level. Since it's subscribing to all finish events, it doesn't matter where you set it.
app.use(middlewareLogResponses)
// Ch 2. Routing Lv 2. API Config
// Use the express.static middleware alongside app.use to mount the /app path
// app.use("/app", express.static("./src/app"));
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

// Ch 1. Servers Lv 2. Custom Handlers
// Use the .get method to add a handler for the /healthz path.
// app.get("/api/healthz", handlerReadiness);
// Ch 6. Storage Lv 4. Automatic Migrations
app.get("/api/healthz", (req, res, next) => {
  Promise.resolve(handlerReadiness(req, res)).catch(next)
});

// Ch 2. Routing Lv 2. API Config
// Register that handler in the express app on the /metrics path
// Ch 3. Architecture Lv 2. Admin Namespace
// Swap out the GET /api/metrics endpoint, 
// which just returns plain text, 
// for a GET /admin/metrics
// app.get("/admin/metrics", handlerMetric)
// Ch 6. Storage Lv 4. Automatic Migrations
app.get("/admin/metrics", (req, res, next) => {
  Promise.resolve(handlerMetric(req, res)).catch(next)
})

// Ch 2. Routing Lv 2. API Config
// Register that handler in the express app on the /reset path
// Ch 3. Architecture Lv 2. Admin Namespace
// Update the GET /api/reset to GET /admin/reset.
// Ch 4. JSON Lv 1. HTTP Clients
// Update the /admin/reset endpoint to only accept POST 
// instead of GET requests.
// app.post("/admin/reset", handlerReset)
// Ch 6. Storage Lv 4. Automatic Migrations
app.post("/admin/reset", (req, res, next) => {
  Promise.resolve(handlerReset(req, res)).catch(next)
})


// Ch 4. JSON Lv 2. JSON
// Add a new endpoint to the Chirpy API that accepts 
// a POST request at /api/validate_chirp
// app.post("/api/validate_chirp", handlerChirpsValidate)
// Ch 5. Error Handling Lv 1. Error-Handling Middleware
// Handle errors in your async route handlers using try/catch 
// or .catch(next)
// Ch 6. Storage Lv 7. Create Chirp
// Delete the /api/validate_chirp endpoint 
// that we created before, 
// but port all that logic into this one.
app.post("/api/chirps", (req, res, next) => {
  Promise.resolve(handlerCreateChirp(req, res)).catch(next);
});

// Ch 6. Storage Lv 6. Create User
// Add a new endpoint to your server POST /api/users 
// that allows users to be created
app.post("/api/users", (req, res, next) => {
  Promise.resolve(handlerCreateUser(req, res)).catch(next);
})

// Ch 6. Storage Lv 10. Get All Chirps
// Add a GET /api/chirps endpoint 
// that returns all chirps in the database
app.get("/api/chirps", (req, res, next) => {
  Promise.resolve(handlerGetChirps(req, res)).catch(next);
})

// Ch 6. Storage Lv 11. Get Chirp
app.get("/api/chirps/:chirpId", (req, res, next) => {
  Promise.resolve(handlerGetChirp(req, res)).catch(next);
})

// Ch 5. Error Handling Lv 1. Error-Handling Middleware
app.use("/api", errorHandler);

// Set the server to listen on port 8080 using the .listen() method
// app.listen("8080")
app.listen(config.api.port, () => {
  console.log(`Server is running at http://localhost:${config.api.port}`);
});