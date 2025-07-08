# Disallow importing from the same package (`no-package-self-import/no-package-self-import`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Rule Details

In some cases, like in a mono repo, it is possible to import a module from within the same package using the package name. This is not recommended as it can lead to confusion and affect how packages are resolved. This rule disallows importing from the same package using the package name.

### Options

This rule accepts an optional object with the following property:

- `partial` (boolean, default: `false`):
  - If `false` (default), only exact matches or subpaths (e.g., `my-package` or `my-package/utils`) are flagged.
  - If `true`, any import path that starts with the package name is flagged (e.g., `my-package`, `my-package/utils`, and `my-package-something`).

#### Example configuration

```json
{
  "rules": {
    "no-package-self-import/no-package-self-import": [
      "error",
      { "partial": false }
    ]
  }
}
```

## Examples

### With `partial: false` (default)

Examples of **correct** code:

```js
/* packages/my-package/src/file.js */

import { something } from "another-package";
import { something } from "./local-module";
import { something } from "my-package-tokens"; // Not flagged
```

Examples of **incorrect** code:

```js
/* packages/my-package/src/file.js */

import { something } from "my-package"; // flagged
import { something } from "my-package/utils"; // flagged
```

### With `partial: true`

Examples of **incorrect** code:

```js
/* packages/my-package/src/file.js */

import { something } from "my-package"; // flagged
import { something } from "my-package/utils"; // flagged
import { something } from "my-package-tokens"; // flagged (partial match)
```
