import { z } from "zod";

/**
 * Vietnamese mobile number: 0xxxxxxxxx, 84xxxxxxxxx or +84xxxxxxxxx
 * Valid prefixes after the 0: 03x, 05x, 07x, 08x, 09x
 * (Used in Step 3a)
 */
export const VN_PHONE_REGEX = /^(0|\+?84)(3[2-9]|5[25689]|7[06-9]|8[1-9]|9\d)\d{7}$/;

/** Lets users type "090 123 4567", "090.123.4567" or "090-123-4567" */
export const normalizePhone = (value: string) => value.replace(/[\s.-]/g, "");

/** Convert to the 0xxxxxxxxx form for comparing / storing */
export const toLocalPhone = (value: string) =>
  normalizePhone(value).replace(/^\+?84/, "0");

/**
 * STEP 2 + 3a (live coding): write the rules for each field.
 * Right now the schema only checks "is a string", so `npm run try:schema` does not pass yet.
 *
 *  fullName : trim, required, 2-60 characters, letters (Unicode) and spaces only
 *  phone    : trim, required, Vietnamese mobile number (use VN_PHONE_REGEX + normalizePhone)
 *  address  : trim, required, 10-200 characters
 *  note     : trim, at most 200 characters (empty is valid)
 *
 * Write all error messages in English.
 */
export const checkoutSchema = z.object({
  fullName: z.string(), // TODO
  phone: z.string(), // TODO
  address: z.string(), // TODO
  note: z.string(), // TODO
});

/** Type inferred from the schema, no hand-written interface needed */
export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
