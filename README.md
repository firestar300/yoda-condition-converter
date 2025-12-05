# 🐸 Yoda Condition Converter

Transform your code conditions into Yoda conditions, you must.

[![Deploy to GitHub Pages](https://github.com/firestar300/yoda-condition-converter/actions/workflows/deploy.yml/badge.svg)](https://github.com/firestar300/yoda-condition-converter/actions/workflows/deploy.yml)

**[Live Demo →](https://firestar300.github.io/yoda-condition-converter/)**

## What are Yoda Conditions?

**Yoda conditions** (also called Yoda notation) is a programming style where the constant part of a comparison is placed on the left side of the operator. This technique is named after the Star Wars character Yoda, who speaks in an inverted syntax.

```javascript
// Normal condition
if (value === 42) { ... }

// Yoda condition
if (42 === value) { ... }
```

### Benefits

- **Prevents accidental assignments**: Writing `if (42 = value)` throws an error, while `if (value = 42)` silently assigns and evaluates
- **Coding standard compliance**: Required by WordPress, Symfony, and other major frameworks
- **Better code reviews**: Makes the intent clearer when comparing against constants

## Features

- ✨ Real-time conversion as you type
- 📋 One-click copy to clipboard
- 🎯 Supports multiple comparison operators (`===`, `==`, `!==`, `!=`, `>`, `<`, `>=`, `<=`)
- 🔗 Handles compound conditions with `&&` and `||`
- 💡 Example conditions to get started
- 🌙 Beautiful dark theme with Star Wars aesthetics

## Tech Stack

- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS v4](https://tailwindcss.com/) - Styling
- Vanilla JavaScript - No framework needed

## Development

### Prerequisites

- Node.js 20+
- pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/firestar300/yoda-condition-converter.git
cd yoda-condition-converter

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |

## Deployment

The project is automatically deployed to GitHub Pages via GitHub Actions on every push to `main`.

## License

MIT © [Milan Ricoul](https://milanricoul.com)

---

<p align="center">
  <em>Made with the Force by <a href="https://milanricoul.com">@firestar300</a> 🌟</em>
</p>
