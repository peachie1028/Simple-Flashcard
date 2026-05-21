# README

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript 5
- **UI:** React 18
- **Styling:** Tailwind CSS 3

No external backend or database — everything runs client-side.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page (edit & study tabs)
│   └── globals.css      # Global styles
└── components/
    ├── CardFlip.tsx      # Flip card component
    └── CardEditor.tsx    # Card creation/editing UI
```

## Prerequisites

- Node.js 18+
- npm

## Getting Started

1. **Clone or unzip the project**

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start dev server with hot reload      |
| `npm run build` | Build for production                  |
| `npm run start` | Start production server (after build) |

## Card File Format

The app accepts `.txt`, `.md`, and `.mdx` files. Cards can be written in two formats:

**Q/A format:**

```
Q: What is the capital of France?
A: Paris
```

**Blank-line separated pairs** (first block = front, second = back):

```
What is the capital of France?

Paris
```
