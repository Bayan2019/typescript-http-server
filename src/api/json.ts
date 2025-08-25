import type { Response } from "express";

// Ch 4. JSON Lv 2. JSON
export function respondWithError(res: Response, code: number, message: string) {
  respondWithJSON(res, code, { error: message });
}

// Ch 4. JSON Lv 2. JSON
export function respondWithJSON(res: Response, code: number, payload: any) {
  res.header("Content-Type", "application/json");
  const body = JSON.stringify(payload);
  res.status(code).send(body);
}