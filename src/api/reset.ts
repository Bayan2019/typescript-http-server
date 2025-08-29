import type { Request, Response } from "express";
import { config } from "../config.js";
import { respondWithError } from "./json.js";
import { ForbiddenError } from "./middlewares.js";
import { reset } from "src/db/queries/users.js";

// Ch 2. Routing Lv 2. API Config
export async function handlerReset(_: Request, res: Response) {
    // Ch 6. Storage Lv 6. Create User
    // If PLATFORM is not equal to "dev", 
    // this endpoint should return a 403 Forbidden
    if (config.api.platform !== "dev") {
        console.log(config.api.platform);
        throw new ForbiddenError("Reset is only allowed in dev environment.");
    }
    config.api.fileServerHits = 0
    // Ch 6. Storage Lv 6. Create User
    await reset()
    res.write("Hits reset to 0");
    res.end();
}