# Why I Stopped Writing Separate Functions for Every Type — A Beginner's Guide to TypeScript Generics

When I was going through TypeScript basics, I kept running into a quiet frustration. I'd write a function, and then realize I needed the exact same function — but for a different type. So I'd write it again. And again. It felt wrong, but I didn't know why.

Then I learned about Generics. And suddenly it made sense.

---

## The Problem: You Can't Always Predict the Type

Let's say you want a function that takes an array and returns the first item. Simple enough. But what type does the array hold? Strings? Numbers? A custom `User` object?

Without Generics, you might try something like this:

```ts
function getFirst(arr: string[] | number[] | boolean[]): string | number | boolean {
  return arr[0]
}
```

This works — sort of. But there are two real problems here.

First, you're guessing. What if someone passes an array of objects? You'd have to keep adding more types to that union. It never ends.

Second, you lose type information. When you call this function:

```ts
const result = getFirst([1, 2, 3])
```

TypeScript sees `result` as `string | number | boolean` — not `number`. Even though it's obviously a number, TypeScript no longer knows that for certain. You've lost the precision that makes TypeScript useful in the first place.

---

## What Generics Actually Do

Generics let you write a function once, and let the *caller* decide the type at the time of calling — not you at the time of writing.

Here's the same function with Generics:

```ts
function getFirst<T>(arr: T[]): T {
  return arr[0]
}
```

The `<T>` is a **type parameter**. `T` stands for "Type" — it's just a convention, like using `i` in a for loop. You could call it anything, but `T` is what everyone uses.

Now when you call it:

```ts
const result = getFirst([1, 2, 3])              // result is number ✅
const name = getFirst(["Albe", "Rafi"])         // name is string ✅
const user = getFirst([{ id: 1, name: "Albe" }]) // user is { id: number, name: string } ✅
```

TypeScript figures out the type automatically from what you pass in. One function. Any type. Full type safety preserved.

---

## Why This Matters in Real Projects

Without Generics, you'd end up writing something like this:

```ts
function getFirstString(arr: string[]): string { return arr[0] }
function getFirstNumber(arr: number[]): number { return arr[0] }
function getFirstBoolean(arr: boolean[]): boolean { return arr[0] }
```

Same logic, copy-pasted three times. And if there's a bug in that logic, you have to find and fix it in three separate places. Sound familiar? It's the same DRY violation we saw with copy-pasting interfaces.

With Generics, you fix it once — and it's fixed everywhere.

As your project grows, this compounds. Reusable utility functions, API response handlers, data processing logic — all of it can be written once with Generics, and work correctly with any type your project throws at it. The codebase stays smaller, cleaner, and bugs are much easier to track down.

---

## Generics Work with Custom Types Too

One thing I found reassuring — Generics aren't just for primitive types like `string` or `number`. They work with any type, including your own custom interfaces.

```ts
interface Product {
  id: number
  name: string
  price: number
}

const firstProduct = getFirst<Product>([
  { id: 1, name: "Keyboard", price: 45 },
  { id: 2, name: "Mouse", price: 25 },
])

// firstProduct is typed as Product ✅
```

TypeScript knows exactly what `firstProduct` is. You get full autocomplete, full type checking — all from one generic function.

---

## Conclusion

Generics solve a problem that I didn't even fully recognize until I hit it myself: sometimes you genuinely don't know what type will come in. And instead of guessing — or writing duplicate functions for every possibility — Generics let you stay flexible *and* type-safe at the same time.

If Generics felt abstract or confusing at first, that's normal. They clicked for me when I stopped thinking of `T` as something mysterious and started seeing it as just a placeholder — a way of saying "whatever type you give me, I'll work with it correctly."
