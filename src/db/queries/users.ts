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