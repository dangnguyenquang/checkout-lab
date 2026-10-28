import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-semibold tracking-tight">
          Checkout Lab
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/demo/forms" className="transition-colors hover:text-foreground">
            Controlled vs Uncontrolled
          </Link>
          <Link href="/checkout" className="transition-colors hover:text-foreground">
            Checkout
          </Link>
        </nav>
      </div>
    </header>
  );
}
