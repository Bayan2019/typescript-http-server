import express from "express";
// import path from "path";
import { handlerReadiness } from "./api/readiness.js";
import { middlewareLogResponses, middlewareMetricsInc } from "./api/middlewares.js";
import { handlerMetric } from "./api/metric.js";

const app = express();
const PORT = 8080;

// Ch 2. Routing Lv 1. Middleware
// Use the middleware at the application level. Since it's subscribing to all finish events, it doesn't matter where you set it.
app.use(middlewareLogResponses)
// Ch 2. Routing Lv 2. API Config
// Use the express.static middleware alongside app.use to mount the /app path
// app.use("/app", express.static("./src/app"));
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

// Ch 1. Servers Lv 2. Custom Handlers
// Use the .get method to add a handler for the /healthz path.
app.get("/healthz", handlerReadiness);

// Ch 2. Routing Lv 2. API Config
// Register that handler in the express app on the /metrics path
app.get("/metrics", handlerMetric)

// Ch 2. Routing Lv 2. API Config
// Register that handler in the express app on the /reset path
app.get("/reset", handlerMetric)

// Set the server to listen on port 8080 using the .listen() method
// app.listen("8080")
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});