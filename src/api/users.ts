import type { Request, Response } from "express";

// Ch 6. Storage Lv 6. Create User
// It accepts an email as JSON in the request body 
// and returns the user's ID, email, and timestamps in the response body
export async function handlerCreateUser(req: Request, res: Response) {
    type parameters = {
        email: string;
    };
    const params: parameters = req.body;
    
}