import express from "express";
import path from "path";

const app = express();
const PORT = 8080;

// Use the static middleware in Express to serve the file
app.use(express.static("."));

// Set the server to listen on port 8080 using the .listen() method
// app.listen("8080")
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});