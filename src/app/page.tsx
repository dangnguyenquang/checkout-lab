import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BLOCKED_PHONE, SERVER_ERROR_PHONE } from "@/mocks/order-logic";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Session 03 - Checkout Form &amp; Zod Validation
        </h1>
        <p className="text-muted-foreground">
          Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + React Hook Form + Zod + MSW
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Link href="/demo/forms" className="group">
          <Card className="h-full transition-colors group-hover:border-primary">
            <CardHeader>
              <CardTitle>1. Controlled vs Uncontrolled</CardTitle>
              <CardDescription>
                Count renders to see the difference between useState, useRef and React Hook Form.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/checkout" className="group">
          <Card className="h-full transition-colors group-hover:border-primary">
            <CardHeader>
              <CardTitle>2. Checkout Form</CardTitle>
              <CardDescription>
                Zod schema, clear error messages, a mock API and a confirmation screen.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Phone numbers that demo server errors</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <code className="rounded bg-muted px-1.5 py-0.5">{BLOCKED_PHONE}</code>: the server returns
              422 and the error is attached to the phone field
            </li>
            <li>
              <code className="rounded bg-muted px-1.5 py-0.5">{SERVER_ERROR_PHONE}</code>: the server
              returns 500 and a general error is shown
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
