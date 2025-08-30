import type { Request, Response } from "express";

import { respondWithJSON } from "./json.js";
import { BadRequestError } from "./middlewares.js";
import { createChirp, getAllChirps } from "../db/queries/chirps.js";
import { UUID } from "crypto";

// Ch 4. JSON Lv 2. JSON
// Ch 6. Storage Lv 7. Create Chirp
export async function handlerCreateChirp(req: Request, res: Response) {
    // Ch 6. Storage Lv 7. Create Chirp
    // It accepts a JSON payload with a body field:
    type parameters = {
        body: string;
        userId: string;
    };

    // Ch 4. JSON Lv 3. JSON Middleware 
    // use the middleware instead of 
    // manually reading the request body
    const params: parameters = req.body;
    // Ch 4. JSON Lv 3. The Profane
    const cleaned = validateChirp(params.body);

    // Ch 6. Storage Lv 7. Create Chirp
    // If the chirp is valid, you should save it in the database
    const userID: UUID = params.userId as UUID;
    const chirp = await createChirp({
      body: cleaned,
      user_id: userID,
    }) 

    respondWithJSON(res, 201, {
        id: chirp.id,
        body: cleaned,
        createdAt: chirp.createdAt,
        updatedAt: chirp.updatedAt,
        userId: chirp.user_id,
    })
}

// Ch 5. Error Handling Lv 1. Error-Handling Middleware
// throw an error in the route handler
// Ch 5. Error Handling Lv 2. Custom Errors
// Replace the generic Error 
// that was thrown in the validation handler 
// with an error that maps to 400 (bad request)     
function validateChirp(body: string) {
  const maxChirpLength = 140;
  if (body.length > maxChirpLength) {
    // Set the error message as 
    // "Chirp is too long. Max length is 140"
    throw new BadRequestError(
      `Chirp is too long. Max length is ${maxChirpLength}`,
    );
  }

  const badWords = ["kerfuffle", "sharbert", "fornax"];
  return getCleanedBody(body, badWords);
}

// Ch 4. JSON Lv 3. The Profane
function getCleanedBody(body: string, badWords: string[]) {
  const words = body.split(" ");

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const loweredWord = word.toLowerCase();
    if (badWords.includes(loweredWord)) {
      words[i] = "****";
    }
  }

  const cleaned = words.join(" ");
  return cleaned;
}

// Ch 6. Storage Lv 10. Get All Chirps
export async function handlerGetChirps(req: Request, res: Response) {
  const chirps = await getAllChirps();
  respondWithJSON(res, 200, chirps.map((chirp) => ({
    id: chirp.id,
    createdAt: chirp.createdAt,
    updatedAt: chirp.updatedAt,
    body: chirp.body,
    userId: chirp.user_id,
  })))
}
