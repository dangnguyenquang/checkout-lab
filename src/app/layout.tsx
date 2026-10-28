import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";
import { MSWProvider } from "@/mocks/msw-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Checkout Lab - Session 03",
  description: "Checkout Form & Zod Validation with React Hook Form, Zod, MSW and shadcn/ui",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-muted/40 antialiased" suppressHydrationWarning>
        <SiteHeader />
        <main className="mx-auto w-full max-w-5xl px-6 py-10">
          <MSWProvider>{children}</MSWProvider>
        </main>
      </body>
    </html>
  );
}
