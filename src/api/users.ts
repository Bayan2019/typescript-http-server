import type { Request, Response } from "express";
import { respondWithJSON } from "./json.js";
import { BadRequestError } from "./middlewares.js";
import { createUser } from "../db/queries/users.js";

// Ch 6. Storage Lv 6. Create User
export async function handlerCreateUser(req: Request, res: Response) {
    type parameters = {
        // Ch 6. Storage Lv 6. Create User
        // It accepts an email as JSON in the request body
        email: string;
    };
    const params: parameters = req.body;

    if (!params.email) {
        throw new BadRequestError("Missing required fields");
    }
    // Ch 6. Storage Lv 6. Create User
    const user = await createUser({ email: params.email });

    // Ch 6. Storage Lv 6. Create User
    // and returns the user's ID, email, and timestamps 
    // in the response body
    respondWithJSON(res, 201, {
        id: user.id,
        email: params.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    })
}