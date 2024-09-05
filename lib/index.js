/**
 * @fileoverview An ESLint plugin for finding packages that import themselves
 * @author Gerrit Burger
 */
"use strict";

// import all rules in lib/rules
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
