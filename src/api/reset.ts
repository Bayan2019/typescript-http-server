import type { Request, Response } from "express";
import { config } from "../config.js";

// Ch 2. Routing Lv 2. API Config
export async function handlerReset(_: Request, res: Response) {
    config.fileserverHits = 0
    res.write("Hits reset to 0");
    res.end();
}