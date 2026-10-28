import { CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrderResponse } from "@/lib/schemas/order";

type OrderSuccessProps = {
  order: OrderResponse;
  onReset: () => void;
};

export function OrderSuccess({ order, onReset }: OrderSuccessProps) {
  return (
    <Card aria-live="polite">
      <CardHeader className="items-center text-center">
        <CircleCheck className="size-12 text-green-600" aria-hidden="true" />
        <CardTitle className="text-xl">Order placed!</CardTitle>
        <CardDescription>
          Thank you, {order.customer.fullName}. Your order has been received.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <dl className="flex flex-col gap-2 rounded-lg bg-muted p-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Order ID</dt>
            <dd className="font-semibold" data-testid="order-id">
              {order.orderId}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Phone</dt>
            <dd className="font-semibold">{order.customer.phone}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Created at</dt>
            <dd className="font-semibold">{new Date(order.createdAt).toLocaleString("en-US")}</dd>
          </div>
        </dl>
      </CardContent>

      <CardFooter className="justify-center">
        <Button type="button" variant="outline" onClick={onReset}>
          Place another order
        </Button>
      </CardFooter>
    </Card>
  );
}
