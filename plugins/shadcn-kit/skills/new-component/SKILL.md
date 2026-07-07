---
name: new-component
description: Scaffold a new React component matching this template's shadcn/ui conventions — cn() class merging, class-variance-authority variants, Radix Slot asChild, and the @/ aliases. Use when adding a UI component or primitive.
---

# New component

Add a component that looks like it was already here. The canonical reference is
`components/ui/button.tsx`.

## First: is it a shadcn/ui primitive?
If the user wants a standard primitive (dialog, dropdown, input, card, tabs, …), prefer
the registry over hand-writing it:
```bash
npx shadcn@latest add <component>
```
It installs into `components/ui/` using the settings in `components.json` (new-york
style, zinc, `@/` aliases, lucide icons). Only hand-author when it's a custom/app-specific
component.

## Hand-authored component conventions
Place UI primitives in `components/ui/`, app components in `components/`. Follow the
`button.tsx` pattern:

- **Client vs server**: default to a Server Component. Add `"use client"` only if it uses
  hooks, event handlers, browser APIs, or Context.
- **Class names**: compose with `cn()` from `@/lib/utils` (never bare template strings for
  conditional classes).
- **Variants**: use `class-variance-authority` (`cva`) with a `variants` map,
  `defaultVariants`, and export the `xxxVariants` alongside the component. Type props with
  `VariantProps<typeof xxxVariants>`.
- **Composition**: support `asChild` via `@radix-ui/react-slot`'s `Slot` when the element
  should be able to render as its child.
- **Imports**: use the `@/…` aliases (`@/components`, `@/components/ui`, `@/lib`,
  `@/components/hooks`). Type-only imports use `import type`.
- **Styling**: Tailwind v4 tokens from `app/globals.css` (`bg-primary`,
  `text-foreground`, …) — no hardcoded hex, no `tailwind.config`.
- **Icons**: `lucide-react`.

## Skeleton
```tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const fooVariants = cva("base classes here", {
  variants: {
    variant: { default: "…", muted: "…" },
    size: { default: "…", sm: "…" },
  },
  defaultVariants: { variant: "default", size: "default" },
})

export interface FooProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fooVariants> {}

export function Foo({ className, variant, size, ...props }: FooProps) {
  return <div className={cn(fooVariants({ variant, size, className }))} {...props} />
}

export { fooVariants }
```

## Finish
Run `pnpm lint` and `pnpm typecheck` before handing back.
