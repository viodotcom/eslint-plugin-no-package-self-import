# eslint-plugin-no-package-self-import

An ESLint plugin for finding instances of a package importing from itself

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-no-package-self-import`:

```sh
npm install eslint-plugin-no-package-self-import --save-dev
```

## Usage

Add `no-package-self-import` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "no-package-self-import"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "no-package-self-import/rule-name": "warn"
    }
}
```

Or use the recommended configuration:

```json
{
    "extends": [
        "plugin:no-package-self-import/recommended"
    ]
}
```

## Configurations

<!-- begin auto-generated configs list -->

|    | Name          |
| :- | :------------ |
| ✅  | `recommended` |

<!-- end auto-generated configs list -->

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
✅ Set in the `recommended` configuration.

| Name                                                           | Description                              | 💼 |
| :------------------------------------------------------------- | :--------------------------------------- | :- |
| [no-package-self-import](docs/rules/no-package-self-import.md) | Disallow importing from the same package | ✅  |

<!-- end auto-generated rules list -->
