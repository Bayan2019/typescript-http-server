import type { Request, Response } from "express";
import { respondWithJSON } from "./json.js";
import { BadRequestError } from "./middlewares.js";
import { createUser } from "../db/queries/users.js";
import { hashPassword } from "../auth.js";
import { NewUser } from "src/db/schema.js";

// Ch 7. Authentification Lv 1. Authentication with Password
// You can use the Omit utility type 
// to create a new UserResponse type 
// that excludes the hashed_password field.
export type UserResponse = Omit<NewUser, "hashedPassword">;

// Ch 6. Storage Lv 6. Create User
export async function handlerCreateUser(req: Request, res: Response) {
    type parameters = {
        // Ch 6. Storage Lv 6. Create User
        // It accepts an email as JSON in the request body
        email: string;
        // Ch 7. Authentification Lv 1. Authentication with Password
        // The body parameters should now require a new password field:
        password: string;
    };
    const params: parameters = req.body;

    // if (!params.password || !params.email) {
    if (!params.email) {
        throw new BadRequestError("Missing email field");
    }
    // Ch 7. Authentification Lv 1. Authentication with Password
    if (!params.password) {
        throw new BadRequestError("Missing password field");
    }
    // Ch 7. Authentification Lv 1. Authentication with Password
    // Use your hashPassword function 
    // to hash the password before storing it in the database.
    const hashedPassword: string = await hashPassword(params.password);
    // Ch 6. Storage Lv 6. Create User
    const user = await createUser({ 
        email: params.email, 
        passwordHashed: hashedPassword 
    } satisfies NewUser);

    if (!user) {
        throw new Error("Could not create user");
    }

    // Ch 6. Storage Lv 6. Create User
    // and returns the user's ID, email, and timestamps 
    // in the response body
    respondWithJSON(res, 201, {
        id: user.id,
        email: params.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    } satisfies UserResponse)
}

