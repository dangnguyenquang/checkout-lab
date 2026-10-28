import { z } from "zod";
import { checkoutSchema } from "./checkout";

/**
 * Validate at the "data boundary": not only what the user types,
 * but also what the API returns must be parsed before it is used.
 */
export const orderResponseSchema = z.object({
  orderId: z.string().regex(/^ORD-[A-Z0-9]{8}$/, "Invalid order ID format"),
  status: z.literal("created"),
  createdAt: z.iso.datetime(),
  customer: z.object({
    fullName: z.string(),
    phone: z.string(),
  }),
});

export type OrderResponse = z.infer<typeof orderResponseSchema>;

/** Standard API error body: a general message + per-field errors (if any) */
export const apiErrorSchema = z.object({
  message: z.string(),
  errors: z.partialRecord(checkoutSchema.keyof(), z.string()).optional(),
});

export type ApiErrorBody = z.infer<typeof apiErrorSchema>;
