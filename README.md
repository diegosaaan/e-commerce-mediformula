# eCommerce Application 🛍️🌐

## Technology Stack 💻

Our eCommerce application is developed using the following key technologies:

#### Frontend:

- React.js
- Redux

#### Type Checking:

- TypeScript

#### Backend:

- Node.js

#### Styling:

- SCSS

#### Testing:

- Jest

#### Code Quality:

- ESLint
- Prettier

#### Version Control:

- Git

#### Continuous Integration/Continuous Delivery:

- GitLab CI/CD

#### Package Bundling:

- Webpack

#### Pre-commit Hooks:

- Husky

#### eCommerce Platform:

- Commercetools

## Getting Started 🚀

Clone this repo to your desktop, go to its root directory and install dependencies using npm:

```
$ cd ../commerce
$ npm install
```

Once the dependencies are installed, you can start the application. You will then be able to access it at localhost:8000

```
$ npm run start
```

### Available Scripts

In the project directory, you can run:

```
$ npm run lint
```

to perform a static analysis of code to quickly find problems. ESLint is configured based on the Airbnb JavaScript Style Guide.

```
$ npm run format
```

to run Prettier. This helps simplify the writing process and ensure consistency in code.

```
$ npm run type
```

to run the TypeScript compiler to check for any errors in TypeScript code.

```
$ npm run test
```

to run Jest to execute all the test cases in the project.

```
$ npm run test:coverage
```

to run Jest with the --coverage flag, which generates a test coverage report. This helps see what proportion of code is covered by tests and what part still needs to be tested.

```
$ npm run precommit
```

This script combines running lint, format, type, and test before each commit, helping ensure code quality and minimize the chances of errors.

```
$ npm run build
```

Builds the app for production to the dist folder.

```
$ npm run prepare
```

to install Git hooks with Husky. Hooks are scripts that run automatically at certain events in Git. In this project, they are used to automatically perform linting and formatting before each commit.
