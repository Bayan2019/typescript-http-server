import type { Request, Response } from "express";

import { respondWithJSON } from "./json.js";
import { BadRequestError } from "./middlewares.js";


// Ch 4. JSON Lv 2. JSON
export async function handlerChirpsValidate(req: Request, res: Response) {
    type parameters = {
        body: string;
    };

    // Ch 4. JSON Lv 3. JSON Middleware 
    // use the middleware instead of manually reading the request body
    const params: parameters = req.body;
    const maxChirpLength = 140;
    if (params.body.length > maxChirpLength) {
        // respondWithError(res, 400, "Chirp is too long");
        // Ch 5. Error Handling Lv 1. Error-Handling Middleware
        // throw an error in the route handler
        // throw new Error("Chirp is too long");
        // Ch 5. Error Handling Lv 2. Custom Errors
        // Replace the generic Error 
        // that was thrown in the validation handler 
        // with an error that maps to 400 (bad request)
        // Set the error message as 
        // "Chirp is too long. Max length is 140"
        throw new BadRequestError("Chirp is too long. Max length is 140")
    }

    // Ch 4. JSON Lv 3. The Profane
    const words = params.body.split(" ");

  const badWords = ["kerfuffle", "sharbert", "fornax"];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const loweredWord = word.toLowerCase();
    if (badWords.includes(loweredWord)) {
      words[i] = "****";
    }
  }

  const cleaned = words.join(" ");

    respondWithJSON(res, 200, {
        cleanedBody: cleaned,
    })
}
