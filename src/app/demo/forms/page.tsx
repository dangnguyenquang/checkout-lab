import { FormsDemo } from "@/components/demo/forms-demo";

export const metadata = { title: "Controlled vs Uncontrolled - Checkout Lab" };

export default function FormsDemoPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Controlled vs Uncontrolled</h1>
        <p className="text-muted-foreground">
          Type into each field and watch the Render counter. When should you pick which approach?
        </p>
      </div>
      <FormsDemo />
    </div>
  );
}
