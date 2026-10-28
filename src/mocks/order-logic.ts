import { z } from "zod";
import { checkoutSchema, toLocalPhone } from "@/lib/schemas/checkout";
import type { ApiErrorBody, OrderResponse } from "@/lib/schemas/order";

/** Phone numbers that "trigger" errors so the UI error states can be demoed */
export const BLOCKED_PHONE = "0900000000"; // -> 422 with an error on the phone field
export const SERVER_ERROR_PHONE = "0999999999"; // -> 500 general error

export type MockResult =
  | { status: 201; body: OrderResponse }
  | { status: 422 | 500; body: ApiErrorBody };

function randomOrderId() {
  const code = Math.random().toString(36).slice(2, 10).toUpperCase().padEnd(8, "0");
  return `ORD-${code}`;
}

/**
 * The "fake backend" logic shared by the MSW handler and the Route Handler,
 * so both ways of mocking give the same result.
 */
export function processOrder(payload: unknown): MockResult {
  // The server doesn't trust the client: validate again with the same schema
  const parsed = checkoutSchema.safeParse(payload);

  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    const errors = Object.fromEntries(
      Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]]),
    );
    return { status: 422, body: { message: "Invalid data", errors } };
  }

  const phone = toLocalPhone(parsed.data.phone);

  if (phone === BLOCKED_PHONE) {
    return {
      status: 422,
      body: {
        message: "Could not create the order",
        errors: { phone: "This phone number is restricted from placing orders" },
      },
    };
  }

  if (phone === SERVER_ERROR_PHONE) {
    return {
      status: 500,
      body: { message: "The server is busy, please try again in a few minutes" },
    };
  }

  return {
    status: 201,
    body: {
      orderId: randomOrderId(),
      status: "created",
      createdAt: new Date().toISOString(),
      customer: { fullName: parsed.data.fullName, phone },
    },
  };
}
