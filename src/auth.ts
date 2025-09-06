import bcrypt  from "bcrypt";
// import { hash } from "crypto";
import { JwtPayload } from "jsonwebtoken";

import jwt from 'jsonwebtoken';
import { BadRequestError, UnauthorizedError } from "./api/middlewares";

// Ch 7. Authentification Lv 6. JWTs
// Set this to chirpy
const TOKEN_ISSUER = "chirpy";

// Ch 7. Authentification Lv 6. JWTs
// used the Pick utility function to narrow the JwtPayload
type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;


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

// Ch 7. Authentification Lv 6. JWTs
export function makeJWT(userID: string, expiresIn: number, secret: string): string {
    // Use Math.floor(Date.now() / 1000) to get the current time in seconds.
    const issuedAt = Math.floor(Date.now() / 1000);
    // Use iat + expiresIn to set the expiration
    const expiresAt = issuedAt + expiresIn
    // Use jwt.sign(payload, secret, [options]).
    const token = jwt.sign(
      {
        iss: TOKEN_ISSUER,
        sub: userID,
        iat: issuedAt,
        exp: expiresAt,
      } satisfies payload, 
      secret,
      { algorithm: "HS256" },) 

    return token;
}

// Ch 7. Authentification Lv 6. JWTs
export function validateJWT(tokenString: string, secret: string): string {
  let decoded: payload;
  try {
    // Use the jwt.verify(token, secret)
    decoded = jwt.verify(tokenString, secret) as JwtPayload;
  } catch (e) {
    throw new UnauthorizedError("Invalid token");
  }
  if (decoded.iss !== TOKEN_ISSUER) {
    throw new UnauthorizedError("Invalid issuer");
  }

  if (!decoded.sub) {
    throw new UnauthorizedError("No user ID in token")
  }
    
  return decoded.sub;
}

// Ch 7. Authentification Lv 7. Authentication With JWTs
export function getBearerToken(req: Request): string {
  let bearer: string;
  bearer = "Bearer "
  return bearer;
}