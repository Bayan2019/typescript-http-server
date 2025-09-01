import { hashSync } from "bcrypt";
// import { hash } from "crypto";

export function hashPassword(password: string) {
    const hashedPassword = hashSync(password, 10)
    return hashPassword
}