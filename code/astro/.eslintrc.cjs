module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "standard-with-typescript",
    "plugin:astro/recommended",
    "plugin:svelte/recommended",
    "plugin:react-hooks/recommended",
    "@unocss"
  ],
  plugins: [
    "react-hooks"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"]
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      }
    },
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".svelte"]
      }
    }
  ],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/member-delimiter-style": 0,
    "@typescript-eslint/quotes": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/triple-slash-reference": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/space-before-function-paren": 0,
    "@typescript-eslint/consistent-type-definitions": 0,
    "@typescript-eslint/promise-function-async": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "@typescript-eslint/consistent-type-imports": 0,
    "@typescript-eslint/no-confusing-void-expression": 0,
    "@typescript-eslint/no-misused-promises": 0,
    "@typescript-eslint/semi": ['warn', "always"]
  },
  ignorePatterns: [".eslintrc.cjs"]
};
