# Checkout Lab - Session 03 (starter, for students)

Checkout Form & Zod Validation with Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui, React Hook Form, Zod and Mock Service Worker (MSW).

Follow the **Student Guide** (`student-guide.md`). The UI and the plumbing are already built, so you only write the 4 files listed below.

## Run the project

You need Node 22.18 or newer.

```bash
npm install
npm run dev     # http://localhost:3000
```

## The 4 files you will write

| File | Step | What to do |
|---|---|---|
| `src/lib/schemas/checkout.ts` | 2, 3a | Write the Zod rules for the 4 fields |
| `src/components/checkout/checkout-form.tsx` | 3b, 5 | Wire up React Hook Form + Zod and the submit states |
| `src/mocks/handlers.ts` | 4 | The MSW handler for `POST /api/orders` |
| `src/lib/api/orders.ts` | 4 | The `createOrder()` function |

## Useful commands

| Command | What it does |
|---|---|
| `npm run try:schema` | Try `checkoutSchema` against 22 sample values (all rules in place = 22/22) |
| `npm run lab:check` | Grade the User Profile lab (`lab/user-profile.starter.ts`) |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint check |

## Phone numbers that trigger server errors

| Number | Result |
|---|---|
| `0900000000` | 422, error shown on the phone field |
| `0999999999` | 500, general error message |
| any other valid number | 201, order ID like `ORD-XXXXXXXX` |
