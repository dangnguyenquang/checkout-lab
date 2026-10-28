import { z } from "zod";

/**
 * LAB - Write the Zod schema for a User Profile
 *
 * Requirements (form data is always a string, even the date of birth):
 *  1. displayName : required, trim, 2-40 characters
 *  2. email       : required, valid email format
 *  3. phone       : NOT required ("" is allowed); if present it must be a valid Vietnamese phone number
 *                   ("090 123 4567" and "+84912345678" are both fine)
 *  4. dateOfBirth : required, YYYY-MM-DD format, not in the future, and at least 16 years old
 *  5. website     : NOT required ("" is allowed); if present it must be a valid URL
 *  6. bio         : NOT required, at most 160 characters
 *
 * Write all error messages in English.
 * Check your work:  npm run lab:check
 */
export const userProfileSchema = z.object({
  displayName: z.string(), // TODO 1
  email: z.string(), // TODO 2
  phone: z.string(), // TODO 3
  dateOfBirth: z.string(), // TODO 4
  website: z.string(), // TODO 5
  bio: z.string(), // TODO 6
});

export type UserProfileValues = z.infer<typeof userProfileSchema>;
