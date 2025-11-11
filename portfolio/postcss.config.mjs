// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},  // ← CHANGED: Use the new package
    autoprefixer: {},
  },
};