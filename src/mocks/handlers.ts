import type { RequestHandler } from "msw";

/**
 * STEP 4 (live coding): write the handler for POST /api/orders
 *  1. await delay(1200) so the spinner is visible
 *  2. read the body: await request.json() (treat a failure as null)
 *  3. call processOrder(payload) from "./order-logic"
 *  4. return HttpResponse.json(result.body, { status: result.status })
 *
 * While this list is empty, MSW does not intercept /api/orders and the request goes to
 * the Route Handler src/app/api/orders/route.ts (same result), so the form still works.
 */
export const handlers: RequestHandler[] = [];
