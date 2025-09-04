import type { Request, Response } from "express";
import { respondWithJSON } from "./json.js";
import { BadRequestError, UnauthorizedError } from "./middlewares.js";
import { createUser, getUserByEmail } from "../db/queries/users.js";
import { hashPassword, checkPasswordHash } from "../auth.js";
import { boolean } from "drizzle-orm/gel-core/index.js";
import { NewUser } from "src/db/schema.js";

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
    const user = await createUser({ email: params.email, passwordHashed: hashedPassword } satisfies NewUser);

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

// Ch 7. Authentification Lv 1. Authentication with Password
// This endpoint should allow a user to login. 
export async function handlerLogin(req: Request, res: Response) {
    // It should accept this body:
    type parameters = {
        email: string;
        password: string;
    };
    const params: parameters = req.body;
    if (!params.email) {
        throw new BadRequestError("Missing email field");
    }
    if (!params.password) {
        throw new BadRequestError("Missing password field");
    }
    const user = await getUserByEmail(params.email);
    //  If either the user lookup or the password comparison errors, 
    // just return a 401 Unauthorized response with the message
    if (!user) {
        throw new UnauthorizedError("No user with such email")
    }
    // Once you have the user, check to see if their password matches
    const isPasswordRight = await checkPasswordHash(params.password, user.passwordHashed)
    //  If either the user lookup or the password comparison errors, 
    // just return a 401 Unauthorized response with the message
    if (!isPasswordRight) {
        throw new UnauthorizedError("Password is incorrect")
    }
    respondWithJSON(res, 200, {
        id: user.id,
        email: params.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    })
}