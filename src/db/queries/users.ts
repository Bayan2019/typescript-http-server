import { eq } from 'drizzle-orm';

import { db } from "../index.js";
import { NewUser, users } from "../schema.js";

export async function createUser(user: NewUser) {
  const [result] = await db
    .insert(users)
    .values(user)
    .onConflictDoNothing()
    .returning();
  return result;
}

// Ch 6. Storage Lv 6. Create User
// to delete all users in the database 
// (but don't mess with the schema)
export async function reset() {
  await db.delete(users);
}

// Ch 7. Authentification Lv 1. Authentication with Password
// You'll need a new query to look up a user by their email address
export async function getUserByEmail(email:string) {
  const results = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
    // .onConflictDoNothing()
    // .returning();
    if (results.length === 0) {
      return;
    }
  return results[0];
}