Tailwind v4 with Astro (Vite plugin)
- Install: npm i -D tailwindcss @tailwindcss/vite
- Astro config: vite.plugins = [tailwindcss()]
- Global CSS: @import "tailwindcss";
- Customize theme tokens in @theme {} (colors, spacing, fonts).
- Upgrade v3 → v4: npx @tailwindcss/upgrade, then review renamed utilities (e.g., shadow-sm→shadow-xs, outline-none→outline-hidden, ring→ring-3).
- v4 uses the bundler to detect class usage, so no content[] array is needed.

Example theme tokens:
@theme {
  --color-brand: #0ea5e9;
  --font-sans: ui-sans-serif, system-ui, sans-serif;
}

Common fixes after upgrade:
- Replace deprecated opacity utilities with / modifiers (bg-black/50).
- Verify ring defaults; add ring-3 explicitly where needed.
