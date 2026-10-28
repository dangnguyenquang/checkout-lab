import type { CheckoutFormValues } from "@/lib/schemas/checkout";
import type { ApiErrorBody, OrderResponse } from "@/lib/schemas/order";

/** Error returned by the API, carrying the status and per-field errors (if any) */
export class ApiError extends Error {
  readonly status: number;
  readonly fieldErrors: ApiErrorBody["errors"];

  constructor(message: string, status: number, fieldErrors?: ApiErrorBody["errors"]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

/**
 * STEP 4 (live coding): call POST /api/orders
 *  1. fetch with method POST, a JSON header, and values as the body
 *  2. response.json() can fail (not JSON) -> catch it and treat the result as null
 *  3. if !response.ok -> parse the error with apiErrorSchema, then throw new ApiError(...)
 *  4. if ok -> parse with orderResponseSchema and return it (validate data from the API)
 */
export async function createOrder(values: CheckoutFormValues): Promise<OrderResponse> {
  void values; // TODO: remove this line when you're done
  throw new ApiError("createOrder is not implemented yet", 501);
}
