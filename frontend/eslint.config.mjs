// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { ESLintUtils } from "@typescript-eslint/utils";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic
);

export const strictEnumRule = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    messages: {
      dumb: "You are dumb",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {};
  },
});
