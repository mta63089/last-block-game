import { FlatCompat } from "@eslint/eslintrc"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import reactPlugin from "eslint-plugin-react"
import { dirname } from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      "@next/next/no-duplicate-head": "off",
    },
  }),
  reactPlugin.configs.flat.recommended,
  eslintPluginPrettierRecommended,
]

export default eslintConfig
