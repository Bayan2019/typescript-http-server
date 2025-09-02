import { hashSync, compare } from "bcrypt";
// import { hash } from "crypto";

export function hashPassword(password: string) {
    const hashedPassword = hashSync(password, 10)
    return hashPassword
}

export async function verifyPassword(plainPassword: string, hashedPasswordFromDB: string): Promise<boolean> {
  try {
    const isMatch = await compare(plainPassword, hashedPasswordFromDB);
    return isMatch;
  } catch (error) {
    console.error('Error comparing password:', error);
    return false;
  }
}