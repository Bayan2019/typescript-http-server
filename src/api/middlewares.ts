import type { Request, Response, NextFunction } from "express";
import { config } from "../config.js";

// Ch 5. Error Handling Lv 1. Error-Handling Middleware
// Create and mount an error-handling middleware 
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
    // Ch 5. Error Handling Lv 1. Error-Handling Middleware
    // It should log the error using console.log
    // console.error(err.message);
    console.log(err.message)
    // Ch 5. Error Handling Lv 1. Error-Handling Middleware
    // that responds with 500 for unhandled errors
    res.status(500).json({
        error: "Something went wrong on our end",
    });
}

// Ch 2. Routing Lv 2. API Config
export function middlewareMetricsInc(req: Request, res: Response, next: NextFunction) {
  config.fileserverHits += 1
  next();
}

// Ch 2. Routing Lv 1. Middleware
export async function middlewareLogResponses(req: Request, res: Response, next: NextFunction) {
    res.on("finish", () => {
        // next();
        // Ch 2. Routing Lv 1. Middleware
        // Grab the status code from the response object
        const statusCode = res.statusCode
        if (statusCode >= 300) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`)
        }

    });
    next();    
}