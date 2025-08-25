import type { Request, Response } from "express";

import { respondWithJSON, respondWithError } from "./json.js";


// Ch 4. JSON Lv 2. JSON
export async function handlerChirpsValidate(req: Request, res: Response) {
    type parameters = {
        body: string;
    };

    let body = ""; // 1. Initialize

    // 2. Listen for data events
    req.on("data", (chunk) => {
        body += chunk;
    });

    let params: parameters;
    // 3. Listen for end events
    req.on("end", () => {
        try {
            params = JSON.parse(body);
        } catch (err: unknown) {
            respondWithError(res, 400, "Something went wrong")
        }

        const maxChirpLength = 140;
        if (params.body.length > maxChirpLength) {
            respondWithError(res, 400, "Chirp is too long");
            return;
        }

        respondWithJSON(res, 200, {
            valid: true,
        });
  });
}
