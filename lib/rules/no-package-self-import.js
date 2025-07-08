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
      description: "Disallow importing from the same package. Optionally, allow partial matching.",
      recommended: true,
      url: "https://github.com/viodotcom/eslint-plugin-no-package-self-import/blob/main/docs/rules/no-package-self-import.md",
    },
    fixable: null,
    schema: [
      {
        type: "object",
        properties: {
          partial: {
            type: "boolean",
            description:
              "If true, any import path that starts with the package name is flagged. If false (default), only exact matches or subpaths are flagged.",
          },
        },
        additionalProperties: false,
      },
    ],
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

    // Read options, defaulting to { partial: false }
    const options = context.options && context.options[0] ? context.options[0] : {};
    const partial = options.partial === true;

    /**
     * If partial is true, flag any import path that starts with the package name.
     * If partial is false (default), only flag exact matches or subpaths (importPath === packageName or importPath.startsWith(packageName + '/')).
     */
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        if (typeof importPath !== "string") return;
        if (
          (partial && importPath.startsWith(packageName)) ||
          (!partial && (importPath === packageName || importPath.startsWith(`${packageName}/`)))
        ) {
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
