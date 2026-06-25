import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/** Flat config for Next.js 16 + ESLint 9. */
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  // Vendored third-party bundles and build output — not ours to lint.
  { ignores: [".next/**", "node_modules/**", "public/widget.js", "src/dist/**"] },
];

export default eslintConfig;
