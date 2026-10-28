import { NextResponse } from "next/server";
import { processOrder } from "@/mocks/order-logic";

/**
 * The second way to mock: a Next.js Route Handler.
 * Used when NEXT_PUBLIC_API_MOCKING is off (or in a production build):
 * MSW does not intercept the request, so it lands here.
 */
export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const payload: unknown = await request.json().catch(() => null);
  const result = processOrder(payload);

  return NextResponse.json(result.body, { status: result.status });
}
