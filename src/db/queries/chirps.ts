import { asc, eq } from 'drizzle-orm';
import { db } from "../index.js";
import { NewChirp, chirps } from "../schema.js";
import { UUID } from 'crypto';

// Ch 6. Storage Lv 7. Create Chirp
export async function createChirp(chirp: NewChirp) {
  const [result] = await db
    .insert(chirps)
    .values(chirp)
    // .onConflictDoNothing()
    .returning();
  return result;
}

// Ch 6. Storage Lv 10. Get All Chirps
// Add a new query that retrieves 
// all chirps in ascending order by created_at.
export async function getAllChirps() {
  const results = await db
    .select()
    .from(chirps)
    .orderBy(asc(chirps.createdAt))
  return results;
}

// Ch 6. Storage Lv 11. Get Chirp
export async function getChirpByID(id: string) {
  const results = await db
    .select()
    .from(chirps)
    .where(eq(chirps.id, id));
  if (results.length === 0) {
    return;
  }
  return results[0];
}