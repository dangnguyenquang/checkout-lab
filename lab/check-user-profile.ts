/**
 * Auto-grader for the User Profile schema.
 *   npm run lab:check      -> grades lab/user-profile.starter.ts (the student's work)
 *   npm run lab:solution   -> grades lab/user-profile.solution.ts (the solution)
 *
 * Needs Node >= 22.18 (runs TypeScript directly, no build step).
 */
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

type SafeParse = { success: boolean };
type SchemaLike = { safeParse: (input: unknown) => SafeParse };

const target = process.argv[2] ?? "lab/user-profile.starter.ts";
const mod: { userProfileSchema: SchemaLike } = await import(
  pathToFileURL(resolve(process.cwd(), target)).href
);
const schema = mod.userProfileSchema;

const valid = {
  displayName: "Nguyen Van A",
  email: "a@example.com",
  phone: "0912345678",
  dateOfBirth: "2000-05-20",
  website: "https://example.com",
  bio: "Hello there!",
};

const cases: { name: string; input: Record<string, string>; ok: boolean }[] = [
  { name: "Complete valid profile", input: valid, ok: true },
  { name: "Optional fields left empty (phone, website, bio)", input: { ...valid, phone: "", website: "", bio: "" }, ok: true },
  { name: "Phone with spaces '090 123 4567'", input: { ...valid, phone: "090 123 4567" }, ok: true },
  { name: "Phone in +84 form", input: { ...valid, phone: "+84912345678" }, ok: true },
  { name: "bio of exactly 160 characters", input: { ...valid, bio: "a".repeat(160) }, ok: true },

  { name: "empty displayName", input: { ...valid, displayName: "" }, ok: false },
  { name: "displayName with only spaces", input: { ...valid, displayName: "   " }, ok: false },
  { name: "displayName of 1 character", input: { ...valid, displayName: "A" }, ok: false },
  { name: "displayName of 41 characters", input: { ...valid, displayName: "a".repeat(41) }, ok: false },
  { name: "malformed email", input: { ...valid, email: "abc" }, ok: false },
  { name: "empty email", input: { ...valid, email: "" }, ok: false },
  { name: "Phone with a wrong prefix", input: { ...valid, phone: "0112345678" }, ok: false },
  { name: "Phone with missing digits", input: { ...valid, phone: "091234" }, ok: false },
  { name: "date of birth is not a date", input: { ...valid, dateOfBirth: "hom-qua" }, ok: false },
  { name: "date of birth in the future", input: { ...valid, dateOfBirth: "2999-01-01" }, ok: false },
  { name: "under 16 years old", input: { ...valid, dateOfBirth: "2018-01-01" }, ok: false },
  { name: "website is not a URL", input: { ...valid, website: "abc" }, ok: false },
  { name: "bio of 161 characters", input: { ...valid, bio: "a".repeat(161) }, ok: false },
];

let passed = 0;
for (const testCase of cases) {
  const actual = schema.safeParse(testCase.input).success;
  const pass = actual === testCase.ok;
  if (pass) passed += 1;
  const expected = testCase.ok ? "valid" : "rejected";
  console.log(`${pass ? "PASS" : "FAIL"}  ${testCase.name}  (expected: ${expected})`);
}

console.log(`\n${passed}/${cases.length} tests passed (${target})`);
process.exit(passed === cases.length ? 0 : 1);
