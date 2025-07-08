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
        }
    ],
    invalid: [
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
    ],
}); 