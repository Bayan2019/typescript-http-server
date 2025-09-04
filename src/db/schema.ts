import { pgTable, timestamp, varchar, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  email: varchar("email", { length: 256 }).unique().notNull(),
  // Ch 7. Authentication Lv 1. Authentication With Passwords
  // Add a non-null VARCHAR column to 
  // the users table called hashed_password
      // Ch 7. Authentication Lv 1. Authentication With Passwords
      // It should default to "unset" for existing users.
  passwordHashed: varchar("hashed_password")
    .notNull()
      // Ch 7. Authentication Lv 1. Authentication With Passwords
      // It should default to "unset" for existing users.
    .default("unset"),
});

export type NewUser = typeof users.$inferInsert;

// Ch 6. Storage Lv 7. Create Chirp
export const chirps = pgTable("chirps", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  body: varchar("body").notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
});
// Ch 6. Storage Lv 7. Create Chirp
export type NewChirp = typeof chirps.$inferInsert;

