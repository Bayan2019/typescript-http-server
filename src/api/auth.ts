import type { Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "./middlewares";
import { getUserByEmail } from "../db/queries/users";
import { checkPasswordHash } from "../auth";
import { respondWithJSON } from "./json";
import { UserResponse } from "./users";

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
    } satisfies UserResponse);
}