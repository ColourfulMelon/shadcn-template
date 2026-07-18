---
name: new-component
description: Scaffold a new React component matching this template's shadcn/ui conventions — cn() class merging, class-variance-authority variants, Radix Slot.Root composition, data-slot attributes, and the @/ aliases. Use when adding a UI component or primitive.
---

# New component

Add a component that looks like it was already here. The canonical reference is
`components/ui/button.tsx`.

## First: is it a shadcn/ui primitive?
If the user wants a standard primitive (dialog, dropdown, input, card, tabs, …), prefer
the registry over hand-writing it:
```bash
pnpm dlx shadcn@latest add <component>
```
It installs into `components/ui/` using the settings in `components.json` (new-york
style, zinc, `@/` aliases, lucide icons). Only hand-author when it's a custom/app-specific
component.

## Hand-authored component conventions
Place UI primitives in `components/ui/`, app components in `components/`. Follow the
`button.tsx` pattern:

- **Client vs server**: default to a Server Component. Add `"use client"` only if it uses
  hooks, event handlers, browser APIs, or Context.
- **React 19 refs**: type intrinsic props with `React.ComponentProps<"element">`; do not add
  `forwardRef` wrappers to new primitives.
- **Class names**: compose with `cn()` from `@/lib/utils` (never bare template strings for
  conditional classes).
- **Variants**: use `class-variance-authority` (`cva`) with a `variants` map,
  `defaultVariants`, and export the `xxxVariants` alongside the component. Type props with
  `VariantProps<typeof xxxVariants>`.
- **Composition**: support `asChild` via `radix-ui`'s `Slot.Root` when the element should be
  able to render as its child.
- **Data attributes**: add `data-slot` to the primitive root and expose variant/size values as
  data attributes when they are part of the public API.
- **Imports**: use the `@/…` aliases (`@/components`, `@/components/ui`, `@/lib`,
  `@/components/hooks`). Type-only imports use `import type`.
- **Styling**: Tailwind v4 tokens from `app/globals.css` (`bg-primary`,
  `text-foreground`, …) — no hardcoded hex, no `tailwind.config`.
- **Icons**: use the `iconLibrary` from `components.json` (`lucide-react` here). Icons inside
  buttons use `data-icon="inline-start"` or `data-icon="inline-end"` and no sizing classes.

## Skeleton
```tsx
import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const fooVariants = cva("base classes here", {
  variants: {
    variant: { default: "…", muted: "…" },
    size: { default: "…", sm: "…" },
  },
  defaultVariants: { variant: "default", size: "default" },
})

type FooProps = React.ComponentProps<"div"> & VariantProps<typeof fooVariants>

function Foo({ className, variant = "default", size = "default", ...props }: FooProps) {
  return (
    <div
      data-slot="foo"
      data-variant={variant}
      data-size={size}
      className={cn(fooVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Foo, fooVariants }
export type { FooProps }
```

## Finish
Run `pnpm check` and `pnpm typecheck` before handing back.
