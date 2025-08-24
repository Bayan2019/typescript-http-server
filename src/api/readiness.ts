import type { Request, Response } from "express";

export async function handlerReadiness(_: Request, res: Response) {
    // Ch 1. Servers Lv 2. Custom Handlers
    // Set the Content-Type header using .set
  res.set("Content-Type", "text/plain; charset=utf-8");
    // Ch 1. Servers Lv 2. Custom Handlers
    // Send the body text using .send
  res.send("OK");
}