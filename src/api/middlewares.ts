import type { Request, Response, NextFunction } from "express";

// Ch 2. Routing Lv 1. Middleware
export async function middlewareLogResponses(req: Request, res: Response, next: NextFunction) {

    res.on("finish", () => {
        // next();
        // Ch 2. Routing Lv 1. Middleware
        // Grab the status code from the response object
        const statusCode = res.statusCode
        if (statusCode !== 200) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`)
        }

    });
    next();
    
}