import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata = { title: "Checkout - Checkout Lab" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
