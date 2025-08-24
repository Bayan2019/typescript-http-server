import type { Request, Response } from "express";
import { config } from "../config.js";

// Ch 2. Routing Lv 2. API Config
export async function handlerMetric(_: Request, res: Response) {
    res.send(`Hits: ${config.fileserverHits}`);
}