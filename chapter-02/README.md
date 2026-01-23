# Chapter 02 — Incremental Migration to TypeScript (Production-Oriented)

## Purpose of This Chapter

Chapter 02 is a **deliberate, incremental migration** of Chapter 01 from JavaScript to TypeScript.

The goal was **not** to:

- blindly adopt templates
- rush through a TypeScript checklist
- or turn this into a generic TS tutorial

Instead, the goal was to:

- understand _why_ each change was required
- evolve the codebase step by step
- adopt tooling only when the need was clearly felt
- move the project closer to **real production standards**

This README documents the journey **exactly as it happened**, including false starts, experiments, and trade-offs.

---

## Starting Point: Copying Chapter 01

Chapter 02 begins by copying the entire Chapter 01 project:

```bash
cp -r chapter-01 chapter-02
cd chapter-02
```

At this point:

- the project is still fully JavaScript
- GraphQL works exactly as before
- there is no TypeScript tooling

This gives us a clean baseline for comparison.

---

## Step 1: Installing TypeScript

```bash
npm install --save-dev typescript
```

TypeScript is added as a **development dependency** because:

- it is a build-time / tooling concern
- it does not run in production

At this point, **nothing breaks** — TypeScript is not yet involved.

---

## Step 2: Renaming `.js` Files to `.ts`

We rename files incrementally:

```bash
mv server.js server.ts
mv schema.js schema.ts
```

This immediately surfaces errors.

This is intentional.

TypeScript forces us to confront:

- implicit `any`
- missing types
- unsafe runtime assumptions

---

## Step 3: Installing Type Definitions (`@types/*`)

### Why `@types` Packages Exist

TypeScript does **not** automatically know the types of JavaScript libraries.

Libraries fall into two categories:

1. **Libraries that ship their own types** (modern TS-first libraries)
2. **Libraries that require community-maintained types** (`@types/*`)

### Installed Packages

```bash
npm install --save-dev @types/node
npm install --save-dev @types/express
npm install --save-dev @types/lodash
```

- `@types/node` → Node.js globals (`process`, `Buffer`, etc.)
- `@types/express` → Express request/response types
- `@types/lodash` → Lodash utility typings

Without these, TypeScript correctly treats imports as `any`.

---

## Step 4: First Compilation Attempts

We intentionally compile **single files first**:

```bash
tsc ./src/server.ts
```

This isolates:

- syntax issues
- missing imports
- module system mismatches

Only after understanding these errors do we move to full-project compilation.

---

## Step 5: Initializing `tsconfig.json`

```bash
tsc --init
```

This creates a `tsconfig.json`, which defines:

- what files belong to the project
- how TypeScript interprets modules
- how strict type-checking should be

### Key Option: `esModuleInterop`

```json
"esModuleInterop": true
```

Why this matters:

- Most Node.js libraries use CommonJS
- TypeScript uses ES module syntax
- This flag smooths interop between the two worlds

Without it, imports like:

```ts
import express from 'express';
```

would behave incorrectly or require verbose syntax.

---

## Step 6: Understanding Generated Files

Running `tsc` initially produced:

- `.js`
- `.js.map`
- `.d.ts`
- `.d.ts.map`

### What These Files Are

- `.js` → compiled JavaScript
- `.map` → source maps (TS → JS debugging)
- `.d.ts` → declaration files (public type contracts)

### Why We Disabled Declarations

This project is:

- an application
- not a published library

So we disabled:

```json
"declaration": false,
"declarationMap": false
```

This keeps the output clean and realistic.

---

## Step 7: Organizing Source Files

We reorganized the project into a `src/` directory:

```text
src/
  server.ts
  schema/
    schema.ts
```

This mirrors production Node.js layouts and avoids mixing source and build output.

---

## Step 8: Introducing `tsx`

### Why `tsx`

Using:

```bash
node dist/server.js
```

is slow during development.

`tsx` provides:

- fast TypeScript execution
- no build step
- instant restarts

### Development Command

```bash
npx tsx watch src/server.ts
```

### Mental Model

- `tsc` → compiler (produces artifacts)
- `tsx` → development-time runner

Both are useful — for different phases.

---

## Step 9: npm Scripts

```json
"scripts": {
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "type-check": "tsc --noEmit"
}
```

This cleanly separates:

- development
- build
- runtime
- type validation

---

## Step 10: Adding ESLint

```bash
npm install --save-dev eslint @eslint/js typescript-eslint
npx eslint --init
```

We use the **new flat config format**.

Goals:

- catch unsafe `any`
- enforce correct async boundaries
- align TypeScript and GraphQL semantics

Formatting concerns are intentionally excluded.

---

## Step 11: Adding Prettier

```bash
npm install --save-dev prettier
```

Prettier is used **only** for formatting.

It is:

- not integrated into ESLint
- run separately
- applied before linting

This keeps responsibilities clean.

---

## Step 12: Pre-Commit Hook (Husky + lint-staged)

```bash
npm install --save-dev husky lint-staged
npx husky init
```

The hook ensures:

- only staged files are checked
- formatting happens automatically
- unsafe code does not enter the repo

Due to the multi-chapter repo layout, `core.hooksPath` is currently managed manually for this chapter.

---

## Step 13: The GraphQL–TypeScript Double Definition Problem

### The Problem

GraphQL defines types at **runtime**.
TypeScript defines types at **compile time**.

This leads to duplication:

```graphql
type User {
  id: ID!
}
```

```ts
interface User {
  id: string;
}
```

### The Chosen Solution (for now)

We **do not solve this with code generation yet**.

Instead, we:

- co-locate GraphQL schema and TS types
- treat the file as the conceptual source of truth
- update both representations together

This preserves understanding of boundaries.

---

## Step 14: Resolving Type + Lint Errors Together

Resolvers cross **runtime trust boundaries**:

- GraphQL args are runtime-validated
- `fetch().json()` returns `unknown` data

We fix this by:

- explicitly typing resolver arguments
- explicitly asserting external data

This eliminates unsafe `any` usage without weakening rules.

---

## What This Chapter Achieved

By the end of Chapter 02, we have:

- A fully TypeScript GraphQL server
- Clean module boundaries
- Realistic production tooling
- Fast development workflow
- Strong type safety without magic

Most importantly:

> Every tool was added **only when its absence became painful**.

---

## What’s Next

Chapter 03 moves away from tooling and back to **GraphQL fundamentals**:

- how GraphQL executes queries
- resolver chains
- runtime vs compile-time guarantees

The foundation is now solid.
