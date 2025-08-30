import type { Request, Response, NextFunction } from "express";
import { config } from "../config.js";

// Ch 5. Error Handling Lv 2. Custom Errors
// 400
export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}
// Ch 5. Error Handling Lv 2. Custom Errors
// 401
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
  }
}
// Ch 5. Error Handling Lv 2. Custom Errors
// 403
export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
  }
}
// Ch 5. Error Handling Lv 2. Custom Errors
// 404
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

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
    // res.status(500).json({
    //     error: "Something went wrong on our end",
    // });
    // Ch 5. Error Handling Lv 2. Custom Errors
    // Update the error middleware 
    // to set the status code based on the thrown error. 
    // Extract the error message and send that back to the user.
    if (err instanceof BadRequestError) {
        res.status(400).json({
            error: err.message,
        });
    } else if (err instanceof UnauthorizedError) {
        res.status(401).json({
            error: err.message,
        });
    } else if (err instanceof ForbiddenError) {
        res.status(403).json({
            error: err.message,
        });
    } else if (err instanceof NotFoundError) {
        res.status(404).json({
            error: err.message,
        });
    } else {
        res.status(500).json({
            error: `Something went wrong on our end\n${err.message}`,
        });
    }
}

// Ch 2. Routing Lv 2. API Config
export function middlewareMetricsInc(req: Request, res: Response, next: NextFunction) {
  config.api.fileServerHits += 1
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