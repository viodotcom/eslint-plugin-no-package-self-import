const path = require('path');
const { RuleTester } = require('eslint');
const rule = require('./no-package-self-import');

const ruleTester = new RuleTester({
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
});

// Use the static fixture package.json for all test cases
const filename = path.join(__dirname, 'fixtures/src/file.js');

ruleTester.run('no-package-self-import', rule, {
    valid: [
        // Default: partial: false
        {
            code: "import x from 'another-package';",
            filename,
        },
        {
            code: "import x from './local';",
            filename,
        },
        {
            code: "import x from 'my-package-tokens';",
            filename,
        },
        // Explicit partial: false
        {
            code: "import x from 'my-package-tokens';",
            filename,
            options: [{ partial: false }],
        },
        // partial: true, unrelated
        {
            code: "import x from 'another-package';",
            filename,
            options: [{ partial: true }],
        },
    ],
    invalid: [
        // Default: partial: false
        {
            code: "import x from 'my-package';",
            filename,
            errors: [{ messageId: 'noPackageSelfImport' }],
        },
        {
            code: "import x from 'my-package/utils';",
            filename,
            errors: [{ messageId: 'noPackageSelfImport' }],
        },
        // partial: false
        {
            code: "import x from 'my-package';",
            filename,
            options: [{ partial: false }],
            errors: [{ messageId: 'noPackageSelfImport' }],
        },
        {
            code: "import x from 'my-package/utils';",
            filename,
            options: [{ partial: false }],
            errors: [{ messageId: 'noPackageSelfImport' }],
        },
        // partial: true
        {
            code: "import x from 'my-package';",
            filename,
            options: [{ partial: true }],
            errors: [{ messageId: 'noPackageSelfImport' }],
        },
        {
            code: "import x from 'my-package/utils';",
            filename,
            options: [{ partial: true }],
            errors: [{ messageId: 'noPackageSelfImport' }],
        },
        {
            code: "import x from 'my-package-tokens';",
            filename,
            options: [{ partial: true }],
            errors: [{ messageId: 'noPackageSelfImport' }],
        },
    ],
}); 