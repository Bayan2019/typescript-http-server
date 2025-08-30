import { db } from "../index.js";
import { NewChirp, chirps } from "../schema.js";

// Ch 6. Storage Lv 7. Create Chirp
export async function createChirp(chirp: NewChirp) {
  const [result] = await db
    .insert(chirps)
    .values(chirp)
    // .onConflictDoNothing()
    .returning();
  return result;
}