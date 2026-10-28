"use client";

import { useRef, useState, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { Minus, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Counts how many times a component renders.
 * It deliberately writes to a ref during render: this is an observation tool, not
 * a pattern to use in real code (needs reactStrictMode: false for an accurate count).
 */
function useRenderCount() {
  const count = useRef(0);
  // eslint-disable-next-line react-hooks/refs
  count.current += 1;
  // eslint-disable-next-line react-hooks/refs
  return count.current;
}

function Panel({ title, renders, children }: { title: string; renders: number; children: ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Badge variant="secondary" data-testid="render-count">
          Render: {renders}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">{children}</CardContent>
    </Card>
  );
}

/** 1. Uncontrolled: the DOM holds the value, React only reads it when needed (via ref) */
function UncontrolledPanel() {
  const renders = useRenderCount();
  const inputRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState("");

  return (
    <Panel title="1. Uncontrolled (useRef)" renders={renders}>
      <Input ref={inputRef} defaultValue="" placeholder="Try typing, the render count stays the same" />
      <Button
        type="button"
        variant="secondary"
        className="self-start"
        onClick={() => setSubmitted(inputRef.current?.value ?? "")}
      >
        Read value
      </Button>
      <p className="text-sm text-muted-foreground">Value read: {submitted || "(not read yet)"}</p>
    </Panel>
  );
}

/** 2. Controlled: React state is the source of truth, every keystroke = 1 render */
function ControlledPanel() {
  const renders = useRenderCount();
  const [value, setValue] = useState("");

  return (
    <Panel title="2. Controlled (useState)" renders={renders}>
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Try typing, every key renders once"
      />
      <p className="text-sm text-muted-foreground">Live display: {value.length} characters</p>
    </Panel>
  );
}

/** A purely "controlled" component: it only takes value + onChange, with no ref to the input */
function QuantityStepper({
  id,
  value,
  onChange,
}: {
  id: string;
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="flex items-center gap-3" id={id}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Decrease"
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <Minus />
      </Button>
      <output className="w-8 text-center font-medium">{value}</output>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Increase"
        onClick={() => onChange(value + 1)}
      >
        <Plus />
      </Button>
    </div>
  );
}

type DemoValues = { email: string; quantity: number };

/** 3 + 4. React Hook Form: register (uncontrolled) and Controller (controlled) */
function HookFormPanel() {
  const renders = useRenderCount();
  const [liveMode, setLiveMode] = useState(false);
  const [submitted, setSubmitted] = useState("");
  const { register, control, watch, handleSubmit } = useForm<DemoValues>({
    defaultValues: { email: "", quantity: 1 },
  });

  // watch() at component level re-renders the whole form after every value change
  // eslint-disable-next-line react-hooks/incompatible-library
  const liveEmail = liveMode ? watch("email") : undefined;

  return (
    <Panel title="3 + 4. React Hook Form" renders={renders}>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit((values) => setSubmitted(JSON.stringify(values)))}
      >
        <Label htmlFor="demo-email">register(&quot;email&quot;) - uncontrolled</Label>
        <Input id="demo-email" placeholder="email@example.com" {...register("email")} />

        <Label htmlFor="demo-qty">Controller - a custom controlled component</Label>
        <Controller
          name="quantity"
          control={control}
          render={({ field }) => (
            <QuantityStepper id="demo-qty" value={field.value} onChange={field.onChange} />
          )}
        />

        <Label className="font-normal">
          <input
            type="checkbox"
            checked={liveMode}
            onChange={(event) => setLiveMode(event.target.checked)}
          />
          Turn on watch(&quot;email&quot;) to see the value live
        </Label>
        {liveMode && <p className="text-sm text-muted-foreground">Email being typed: {liveEmail}</p>}

        <Button type="submit" variant="secondary" className="self-start">
          Submit
        </Button>
        <p className="text-sm text-muted-foreground">Submit result: {submitted || "(not submitted yet)"}</p>
      </form>
    </Panel>
  );
}

export function FormsDemo() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <UncontrolledPanel />
      <ControlledPanel />
      <HookFormPanel />
    </div>
  );
}
