import type { Request, Response } from "express";

import { respondWithJSON, respondWithError } from "./json.js";


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
        respondWithError(res, 400, "Chirp is too long");
        return;
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
