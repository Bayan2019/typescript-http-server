import express from "express";
// import path from "path";
import { handlerReadiness } from "./api/readiness.js";

const app = express();
const PORT = 8080;

// Use the static middleware in Express to serve the file
// app.use(express.static("."));
// Use the express.static middleware alongside app.use to mount the /app path
app.use("/app", express.static("./src/app"));

// Ch 1. Servers Lv 2. Custom Handlers
// Use the .get method to add a handler for the /healthz path.
app.get("/healthz", handlerReadiness);

// Set the server to listen on port 8080 using the .listen() method
// app.listen("8080")
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});