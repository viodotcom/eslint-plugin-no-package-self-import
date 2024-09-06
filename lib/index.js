/**
 * @fileoverview An ESLint plugin for finding instances of a package importing from itself
 * @author Gerrit Burger
 */
"use strict";

module.exports = {
  meta: {
    name: "eslint-plugin-no-package-self-import",
    version: "0.1.0",
  },
  rules: {
    "no-package-self-import": require("./rules/no-package-self-import"),
  },
  configs: {
    recommended: {
      plugins: ["no-package-self-import"],
      rules: {
        "no-package-self-import/no-package-self-import": "error",
      },
    },
  },
};
