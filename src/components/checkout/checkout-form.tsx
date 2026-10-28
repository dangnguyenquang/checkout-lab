"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * The UI is already built with shadcn/ui. Your job in this session is the wiring:
 *
 *  STEP 3b  useForm + zodResolver + register, show each field's error
 *           (add aria-invalid, data-invalid and <FieldError errors={[errors.xxx]} />)
 *  STEP 5   isSubmitting + spinner, onSubmit calls createOrder, setError for server errors,
 *           a general error Alert, the success screen (<OrderSuccess /> from ./order-success)
 */
export function CheckoutForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order details</CardTitle>
        <CardDescription>Fill in your delivery details and click Place order.</CardDescription>
      </CardHeader>

      {/* TODO Step 3b: replace the onSubmit below with handleSubmit(onSubmit) and add noValidate */}
      <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-6">
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fullName">Full name</FieldLabel>
              <Input id="fullName" autoComplete="name" placeholder="Nguyen Van A" />
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Phone number</FieldLabel>
              <Input id="phone" type="tel" autoComplete="tel" placeholder="0912345678" />
              <FieldDescription>
                Vietnamese mobile number, e.g. 0912345678 or +84912345678
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="address">Delivery address</FieldLabel>
              <Textarea
                id="address"
                rows={3}
                autoComplete="street-address"
                placeholder="House number, street, ward, district, city"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="note">Note</FieldLabel>
              <Textarea
                id="note"
                rows={2}
                placeholder="e.g. Deliver during office hours, call before arriving"
              />
              <FieldDescription>Optional</FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex-col items-stretch gap-4">
          {/* TODO Step 5: general error Alert (serverError) */}
          {/* TODO Step 5: disabled={isSubmitting} + spinner "Processing…" */}
          <Button type="submit">Place order</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
