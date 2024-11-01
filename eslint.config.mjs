import pluginJs from "@eslint/js";
import importHelpers from "eslint-plugin-import-helpers";
import prettier from "eslint-plugin-prettier";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  prettierRecommended,
  pluginJs.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      prettier,
      "import-helpers": importHelpers,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "import-helpers/order-imports": [
        "warn",
        {
          newlinesBetween: "always",
          groups: [
            'module',
            '/^@/App/',
            '/^@/assets/',
            '/^@/constants/',
            '/^@/contexts/',
            '/^@/hooks/',
            '/^@/store/',
            '/^@/domain/',
            '/^@/services/',
            '/^@/components/shared/',
            '/^@/components/ui/',
            '/^@/components/fragments/',
            '/^@/views/',
            '/^@/config/',
            '/^@/utils/',
            ['parent', 'sibling', 'index'],
          ],

          alphabetize: {
            order: 'asc',
            ignoreCase: true,
          },
        },
      ],
    },
  },
  {
    ignores: [
      "**/package.json",
      "**/eslint.config.mjs",
      "**/node_modules",
      "**/*.d.ts",
      "**/schemas.ts",
      "**/babel.config.js",
      "**/metro.config.js",
    ],
  },
];
