import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.js"],
        },
      },
    },
  },
  {
    rules: {
      // 1. Turn off redundant JS rules
      "no-unused-vars": "off",
      "no-undef": "off",

      // 2. Enable the high-IQ TS equivalents
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_", // Ignore variables starting with _ (standard practice)
          varsIgnorePattern: "^_",
        },
      ],

      // 3. Your Logic Guardrails
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "no-console": ["warn", { allow: ["info", "error"] }],
    },
  },
);
