# coding task

Project created to solve a specific coding challenge
## Stack

- Typescript
- Eslint
- Prettier
- Express
- Jest + ts-jest
- Supertest
- Turf

## Installation

Node version is controlled using nvm, check .nvmrc file for correct version

`nvm use`

`npm i`

`npm run start`

If you are using vs-code, my .vscode folder is in the repo

### settings.json for reference

```json
{
    "editor.formatOnSave": true,
    "[javascript]": {
      "editor.formatOnSave": false,
    },
    "[javascriptreact]": {
      "editor.formatOnSave": false,
    },
    "[typescript]": {
      "editor.formatOnSave": false,
    },
    "[typescriptreact]": {
      "editor.formatOnSave": false,
    },
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
      "javascript",
      "javascriptreact",
      {"language": "typescript", "autoFix": true },
      {"language": "typescriptreact", "autoFix": true }
    ],
    "debug.node.autoAttach": "on",
}
```

## Scripts

- `npm run test` Run jest tests and prints the coverage report
- `npm run lint` Single run of the linter
- `npm run start` Start the monitored dev build with hot reloading
- `npm run build` Single run of the ts compiler

## Solution

I have chosen to use the express middleware chaining mechanism.
Each piece of middleware is responsible for solving a specific task.

The input from the querystring is processed through a generic interface extension of the express Request object that is specialized in the 'first-contact' middleware by being passed a specific interface to format the Request.

Data is passed between middleware using an extension of the Response object where data types are defined as children of the locals object. 
locals.* objects are for internal data transport between middleware
locals.data.* objects are for data that is to be returned by the endpoint
The Response object extension is not a generic wrapper like the Request extension, but if this system was to be expanded across multiple endpoints, a generic approach would be wise.

The data and geolocation functionality is decoupled through abstraction layers. The primary reason is for easy of unit testing but it also makes tasks like adding a real datastore or changing geolocation lib easier.

I prefer functions over classes and try to keep those functions simple and pure(ish)
