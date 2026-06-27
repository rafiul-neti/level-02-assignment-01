# Stop Copy-Pasting Your Interfaces — Use `Pick` and `Omit` Instead

When I first started learning TypeScript, I thought creating a new interface for every situation was just... normal. Need a login form? Write a new interface. Need a profile page? Write another one. It felt fine — until I realized I was writing the same fields over and over again.

That's when I discovered two utility types that changed how I think about interfaces: `Pick` and `Omit`.

---

## What Are Utility Types, Anyway?

TypeScript comes with a set of built-in helper types called **utility types**. They let you transform or derive new types from existing ones — without rewriting everything from scratch. `Pick` and `Omit` are two of the most useful ones for working with interfaces.

---

## The Problem: Copy-Pasting Interfaces

Let's say you have a master `User` interface:

```ts
interface User {
  id: number
  name: string
  email: string
  password: string
  age: number
  address: string
}
```

Now you need a type for a login form — it only needs `email` and `password`. Without utility types, you'd probably do this:

```ts
interface LoginFormData {
  email: string
  password: string
}
```

Looks harmless. But what if you also have a `PasswordReset` type, a `UserVerification` type, and a `ContactInfo` type — all copying fields from `User`? Now you have the same field definitions scattered across your entire codebase.

The moment someone renames `email` to `emailAddress` in the `User` interface, every one of those copied interfaces breaks. Manually. One by one.

This is exactly the kind of problem the **DRY principle** — Don't Repeat Yourself — warns us about.

---

## `Pick`: Choose Only What You Need

`Pick` lets you create a new type by selecting specific fields from an existing interface.

```ts
type LoginFormData = Pick<User, "email" | "password">
```

That's it. `LoginFormData` now has exactly `email` and `password` — pulled directly from `User`. No copy-pasting. If `User` changes, this type updates automatically.

Think of it like ordering from a menu. You have the full menu (`User`), and you just pick the items you want.

---

## `Omit`: Exclude What You Don't Need

`Omit` is the opposite. Instead of choosing what to keep, you choose what to *remove*.

Imagine you're building a public profile page. You want everything from `User` — except `password` and `id` (those should never be exposed publicly).

You *could* use `Pick` and list all the remaining fields:

```ts
type PublicProfile = Pick<User, "name" | "email" | "age" | "address">
```

But if `User` has 20 fields and you need 18 of them, that gets tedious fast. `Omit` makes this much cleaner:

```ts
type PublicProfile = Omit<User, "password" | "id">
```

Same result, much less typing. The rule of thumb I follow: if you need *fewer* fields, use `Pick`. If you need *most* fields, use `Omit`.

---

## One Source of Truth

The real power here isn't just saving keystrokes. It's the idea of having **one master interface** that everything else derives from.

When `User` is your single source of truth, all your `Pick` and `Omit` types stay in sync with it automatically. You change one place, and the rest of your types adapt. No hunting through files, no forgetting to update something.

This is what keeping your code **DRY** actually looks like in practice.

---

## Conclusion

I used to think TypeScript utility types were an "advanced" topic I'd get to eventually. But `Pick` and `Omit` are genuinely beginner-friendly, and once I understood them, I couldn't imagine going back to manually duplicating interfaces.

If you find yourself copy-pasting interface fields across your project, that's a signal — stop, and reach for `Pick` or `Omit` instead. Your future self (dealing with a refactor at 2am) will thank you.
