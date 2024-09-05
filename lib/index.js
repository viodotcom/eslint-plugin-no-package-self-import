/**
 * @fileoverview An ESLint plugin for finding packages that import themselves
 * @author Gerrit Burger
 */
"use strict";

const requireIndex = require("requireindex");

// import all rules in lib/rules
module.exports = {
  meta: {
    name: "eslint-plugin-no-self-package-import",
    version: "0.1.0",
  },
  rules: requireIndex(__dirname + "/rules"),
};
