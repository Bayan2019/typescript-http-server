import type { Request, Response } from "express";
import { config } from "../config.js";

// Ch 2. Routing Lv 2. API Config
export async function handlerMetric(_: Request, res: Response) {
    // Ch 3. Architecture Lv 2. Admin Namespace
    // Make sure you use the Content-Type header 
    // to set the response type to text/html; charset=utf-8
    res.set("Content-Type", "text/html; charset=utf-8");
    res.send(`<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${config.api.fileServerHits} times!</p>
  </body>
</html>`);
}