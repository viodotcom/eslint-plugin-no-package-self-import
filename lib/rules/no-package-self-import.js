const path = require("path");
const fs = require("fs");

const findClosestPackageJsonPath = (startPath) => {
  let currentPath = startPath;
  while (currentPath !== "/") {
    const packageJsonPath = path.join(currentPath, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      return packageJsonPath;
    }
    currentPath = path.dirname(currentPath);
  }
  return null;
};

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow importing from the same package",
      recommended: true,
      url: "https://github.com/viodotcom/eslint-plugin-no-package-self-import/blob/main/docs/rules/no-package-self-import.md",
    },
    fixable: null,
    schema: [],
    messages: {
      noPackageSelfImport:
        "Importing from the same package: '{{packageName}}'.",
    },
  },
  create(context) {
    const filename = context.getFilename();
    if (!filename) return {};

    const packageJsonPath = findClosestPackageJsonPath(path.dirname(filename));

    const packageName = require(packageJsonPath).name;

    return {
      ImportDeclaration(node) {
        if (node.source.value?.startsWith(packageName)) {
          context.report({
            node,
            messageId: "noPackageSelfImport",
            data: { packageName },
          });
        }
      },
    };
  },
};
