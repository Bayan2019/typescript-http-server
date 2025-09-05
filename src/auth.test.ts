import { describe, it, expect, beforeAll } from "vitest";
import { checkPasswordHash, hashPassword, validateJWT, makeJWT } from "./auth";
import { UnauthorizedError } from "./api/middlewares";

// Ch 7. Authentification Lv 6. JWTs
describe("Password Hashing", () => {
  const password1 = "correctPassword123!";
  const password2 = "anotherPassword456!";
  let hash1: string;
  let hash2: string;

  beforeAll(async () => {
    hash1 = await hashPassword(password1);
    hash2 = await hashPassword(password2);
  });

  it("should return true for the correct password", async () => {
    const result = await checkPasswordHash(password1, hash1);
    expect(result).toBe(true);
  });

  it("should return false when password doesn't match a different hash", async () => {
    const result = await checkPasswordHash(password1, hash2);
    expect(result).toBe(false);
  });

  it("should return false for an empty password", async () => {
    const result = await checkPasswordHash("", hash1);
    expect(result).toBe(false);
  });

  it("should return false for an invalid hash", async () => {
    const result = await checkPasswordHash(password1, "invalidhash");
    expect(result).toBe(false);
  });
});

// Ch 7. Authentification Lv 6. JWTs
describe("JWT Functions", () => {
    const secret = "secret";
    const wrongSecret = "wrong-secret";
    const userID = "some-unique-user-id"
    let validToken: string;


    beforeAll(async () => {
        validToken = makeJWT(userID, 3600, secret)
    });

    it("should validate a valid token", () => {
        const result = validateJWT(validToken, secret);
        expect(result).toBe(userID);
    });

    it("should throw an error for an invalid token string", () => {
        expect(() => validateJWT("invalid.token.string", secret)).toThrow(
            UnauthorizedError,
        );
    });

    it("should throw an error when the token is signed with wrong secret", () => {
        expect(() => validateJWT(validToken, wrongSecret)).toThrow(
            UnauthorizedError,
        );
    });
});