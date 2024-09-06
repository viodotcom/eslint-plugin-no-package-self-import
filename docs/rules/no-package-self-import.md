# Disallow importing from the same package (`no-package-self-import/no-package-self-import`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Rule Details

In some cases, like in a mono repo, it is possible to import a module from within the same package using the package name. This is not recommended as it can lead to confusion and affect how packages are resolved. This rule disallows importing from the same package using the package name.

Examples of **correct** code for this rule:

```js
/* packages/my-package/src/file.js */

import {something} from 'another-package';
```

```js
/* packages/my-package/src/file.js */

import {something} from './local-module';
```

Examples of **incorrect** code for this rule:

```js
/* packages/my-package/src/file.js */

import {something} from 'my-package';
```
