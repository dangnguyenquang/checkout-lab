/**
 * Quickly try checkoutSchema in the terminal (no browser needed):
 *
 *   npm run try:schema
 *
 * Each row is an input value and the expected result. Add rules in
 * src/lib/schemas/checkout.ts and run it again to see which rows turn PASS.
 * Needs Node >= 22.18 (runs TypeScript directly, no build step).
 */
type SafeParseResult =
  | { success: true }
  | { success: false; error: { issues: { path: PropertyKey[]; message: string }[] } };

// Load by URL so Node runs the project's .ts file directly (the "@/" alias doesn't work here)
const schemaUrl = new URL("../src/lib/schemas/checkout.ts", import.meta.url).href;
const { checkoutSchema }: { checkoutSchema: { safeParse: (input: unknown) => SafeParseResult } } =
  await import(schemaUrl);

const valid = {
  fullName: "Nguyen Van A",
  phone: "0912345678",
  address: "12 Le Loi, District 1, Ho Chi Minh City",
  note: "",
};

type Row = [field: keyof typeof valid, value: string, shouldPass: boolean];

const rows: Row[] = [
  ["fullName", "Nguyễn Văn A", true],
  ["fullName", "Tran Thi Bich Ngoc", true],
  ["fullName", "A", false],
  ["fullName", "An123", false],
  ["fullName", "", false],
  ["fullName", "   ", false],

  ["phone", "0912345678", true],
  ["phone", "091 234 5678", true],
  ["phone", "091.234.5678", true],
  ["phone", "+84912345678", true],
  ["phone", "0112345678", false],
  ["phone", "091234567", false],
  ["phone", "09123456789", false],
  ["phone", "abc", false],
  ["phone", "", false],

  ["address", "12 Le Loi, D1, HCMC", true],
  ["address", "Hanoi", false],
  ["address", "", false],
  ["address", "x".repeat(201), false],

  ["note", "", true],
  ["note", "Deliver during office hours", true],
  ["note", "x".repeat(201), false],
];

const show = (value: string) =>
  JSON.stringify(value.length > 24 ? `${value.slice(0, 12)}…(${value.length} chars)` : value);

let passed = 0;
for (const [field, value, shouldPass] of rows) {
  const result = checkoutSchema.safeParse({ ...valid, [field]: value });
  const issue = result.success ? undefined : result.error.issues.find((i) => i.path[0] === field);
  const accepted = !issue;
  const ok = accepted === shouldPass;
  if (ok) passed += 1;

  const expected = shouldPass ? "valid   " : "rejected";
  const actual = issue ? `error: ${issue.message}` : "valid";
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${field.padEnd(8)} ${show(value).padEnd(36)} expected: ${expected}  actual: ${actual}`,
  );
}

console.log(`\n${passed}/${rows.length} rows passed`);
process.exit(passed === rows.length ? 0 : 1);
