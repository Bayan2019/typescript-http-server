import bcrypt  from "bcrypt";
// import { hash } from "crypto";

// Ch 7. Authentification Lv 1. Authentication with Password
export async function hashPassword(password: string) {
  const saltRounds = 10;
  // Hash the password using the bcrypt.hash function. 
  return bcrypt.hash(password, saltRounds)
}

// Ch 7. Authentification Lv 1. Authentication with Password
export async function checkPasswordHash(plainPassword: string, hashedPasswordFromDB: string): Promise<boolean> {
  // Use the bcrypt.compare function 
  // to compare the password in the HTTP request 
  // with the password that is stored in the database
  return bcrypt.compare(plainPassword, hashedPasswordFromDB)
}